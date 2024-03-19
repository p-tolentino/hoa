"use client";

import { Button, Text, useToast, Box, Input, Flex } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ListOfDisputesColumn } from "./columns";
import SetFeesTable from "./set-fees";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import {
  updateLastStep,
  updateLetterSent,
  updateOfficerAssigned,
  updateResolved,
  updateStatus,
} from "@/server/actions/dispute";
import { createNotice } from "@/server/actions/letter-notice";
import { createNotification } from "@/server/actions/notification";
import { useEffect, useState } from "react";
import { PersonalInfo, ReportStatus, ViolationType } from "@prisma/client";
import { getAllInfo } from "@/server/data/user-info";
import { newUserTransaction } from "@/server/actions/user-transactions";
import { getViolationTypeByTitle } from "@/server/data/violation-type";
import { getDisputeById } from "@/server/data/dispute";

interface RowActionProps {
  data: ListOfDisputesColumn;
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  const user = useCurrentUser();
  const toast = useToast();
  const router = useRouter();

  const [meetDate, setMeetDate] = useState<string>();
  const [meetTime, setMeetTime] = useState<string>();
  const [violation, setViolation] = useState<ViolationType | null>();
  const [commMembers, setCommMembers] = useState<PersonalInfo | null>();
  const [userInfos, setUserInfos] = useState<PersonalInfo[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data.violationInvolved) {
          await getViolationTypeByTitle(data.violationInvolved?.title).then(
            (violation) => setViolation(violation)
          );
        }

        await getAllInfo().then((infos) => {
          setUserInfos(infos);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const setOfficer = async (data: ListOfDisputesColumn) => {
    await updateOfficerAssigned(data.id, user!!.id)
      .then((data) => {
        if (data.success) {
          console.log(data.success);
        }
      })
      .then(() => {
        router.replace(
          `/admin/disputes/dispute-record/view-progress/${data.id}`
        );
      });
  };

  const sendLetter = async (data: ListOfDisputesColumn) => {
    const noticeValues = {
      type: "disputeNotice",
      idToLink: data.id,
      sender: user?.id,
      meetDate: meetDate,
      meetTime: meetTime,
      venue: "HOA Admin Office",
    };

    const notifData = {
      type: "dispute",
      userId: data.personsInvolved,
      title: "New dispute report against you",
      description:
        "A dispute report has been submitted against you. Click here to view details.",
      link: data.id,
    };

    data.personsInvolved.map(async (person) => {
      const noticeData = {
        ...noticeValues,
        recipient: person,
      };

      await createNotice(noticeData).then(async (res) => {
        if (res.success) {
          console.log(res.success);
          await updateLetterSent(data.id, true).then((data) => {
            if (data.success) {
              console.log(data.success);
            }
          });
        }
      });
    });

    await createNotification(notifData).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });

    await updateLastStep(data.id).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });
  };

  const markResolved = async (data: ListOfDisputesColumn) => {
    {
      /**&& applyViolationFee === true */
    }
    if (data.violationInvolved) {
      data.personsInvolved.map(async (person) => {
        // !! Send Notice
        // const noticeValues = {
        //   type: "NOTICE",
        //   idToLink: data.id,
        //   sender: user?.id,
        // };

        // const noticeData = {
        //   ...noticeValues,
        //   recipient: person,
        // };

        // await createNotice(noticeData).then(async (res) => {
        //   if (res.success) {
        //     console.log(res.success);
        //   }
        // });

        // !! Bill to Address of Person Involved + Notification
        // !! EDIT FEE BASED ON VIOLATION RECORD
        const feeData = {
          addressId: userInfos?.find((info) => info.userId === person)?.address,
          purpose: "violation",
          description: violation?.title,
          amount: violation?.firstOffenseFee,
        };

        await newUserTransaction(feeData).then((data) => {
          if (data.success) {
            console.log(data.success);
          }
        });
      });

      const notifPaymentData = {
        type: "finance",
        userId: data.personsInvolved,
        title: "Urgent: Payment Required (Violation Fee)",
        description: "Click here to proceed to payment",
        link: data.id,
      };

      await createNotification(notifPaymentData).then((data) => {
        if (data.success) {
          console.log(data.success);
        }
      });
    }

    // Update Progress and Mark Closed
    await updateResolved(data.id).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });

    // Send Notifications
    const notifResolvedData = {
      type: "dispute",
      userId: data.personsInvolved,
      title: "Dispute marked as Resolved",
      description: "Click here to view dispute details.",
      link: data.id,
    };

    await createNotification(notifResolvedData).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });

    const submittedBy = await getDisputeById(data.id).then(
      (data) => data?.submittedBy
    );

    await createNotification({
      ...notifResolvedData,
      userId: [submittedBy],
    }).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });
  };

  return (
    <div>
      {/* Status: PENDING = Button: Take Case */}
      {data.status === "Pending" &&
        user?.info?.committee === "Grievance and Adjudication Committee" &&
        !data.personsInvolved.includes(user.id) &&
        data.submittedBy !==
          `${user?.info.firstName} ${user?.info.lastName}` && (
          <Button
            size="sm"
            _hover={{ textDecoration: "none" }}
            onClick={() => setOfficer(data)}
          >
            Take Case
          </Button>
        )}

      {/* Status: UNDERREVIEW = Button: Send Letter */}
      {data.status === "Under Review" &&
        data.step === 2 &&
        !data.letterSent &&
        data.officerAssigned ===
          `${user?.info.firstName} ${user?.info.lastName}` && (
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" colorScheme="orange" fontFamily="font.body">
                  Send Meeting Letter
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Send Meeting Letter</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please set the dispute resolution meeting date and time to
                    inform all parties involved.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Meeting Date and Time Input */}
                <Flex gap="1rem" my="1rem">
                  <Input
                    type="date"
                    fontSize="sm"
                    onChange={(e) => {
                      setMeetDate(e.target.value);
                    }}
                  />
                  <Input
                    type="time"
                    fontSize="sm"
                    onChange={(e) => {
                      setMeetTime(e.target.value);
                    }}
                  />
                </Flex>

                <AlertDialogFooter>
                  <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      sendLetter(data).then(() => {
                        toast({
                          title: `Successfully sent out dispute resolution meeting letter to all parties involved.`,
                          status: "info",
                          position: "bottom-right",
                          isClosable: true,
                        });
                        router.refresh();
                      });
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

      {/* Status: UNDERREVIEW = Button: Mark as Resolved */}
      {data.status === "Under Review" &&
        data.step === 3 &&
        data.officerAssigned ===
          `${user?.info.firstName} ${user?.info.lastName}` && (
          <div className="flex gap-x-4">
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" colorScheme="green" fontFamily="font.body">
                    Mark as Resolved
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Resolve Dispute</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure that the dispute below has been resolved?
                      <Text mt="1rem">
                        Submitted by:{" "}
                        <span className="font-semibold">
                          {data.submittedBy}
                        </span>{" "}
                        <br />
                        Submitted on:{" "}
                        <span className="font-semibold">{data.createdAt}</span>
                      </Text>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Box mt={2}>
                    <SetFeesTable />
                  </Box>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() =>
                        markResolved(data).then(() => {
                          toast({
                            title: `Marked the dispute #D${data.number
                              .toString()
                              .padStart(4, "0")} as resolved.`,
                            description:
                              "Thank you for offering your services to your homeowners.",
                            status: "success",
                            position: "bottom-right",
                            isClosable: true,
                          });
                          router.refresh();
                        })
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" colorScheme="orange" fontFamily="font.body">
                    Mark as Unresolved
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Mark Violation as Unresolved
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to mark violation #D
                      {data.number.toString().padStart(4, "0")} as Unresolved.
                      Are you sure?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-green-700 hover:bg-green-900"
                      onClick={() => {
                        //!! EDIT BASED ON PROCESS
                        updateStatus(data.id, ReportStatus.CLOSED).then(
                          (res) => {
                            if (res.success) {
                              toast({
                                title: `Marked the violation #D${data.number
                                  .toString()
                                  .padStart(4, "0")} as Unresolved.`,
                                status: "success",
                                position: "bottom-right",
                                isClosable: true,
                              });
                              router.refresh();
                            }
                          }
                        );
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
    </div>
  );
};
