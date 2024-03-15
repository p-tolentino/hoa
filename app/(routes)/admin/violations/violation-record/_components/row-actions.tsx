"use client";

import { Button, Text, useToast, Box, HStack, Link } from "@chakra-ui/react";
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

import { ListOfViolationsColumn } from "./columns";
import { useEffect, useState } from "react";
import {
  getViolationTypeByName,
  getViolationTypeByTitle,
} from "@/server/data/violation-type";
import { PersonalInfo, ViolationType } from "@prisma/client";
import {
  updateClosed,
  updateLetterSent,
  updateOfficerAssigned,
  updateStatus,
} from "@/server/actions/violation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { createNotice } from "@/server/actions/letter-notice";
import { createNotification } from "@/server/actions/notification";
import { getAllInfo } from "@/server/data/user-info";
import { newUserTransaction } from "@/server/actions/user-transactions";

interface RowActionProps {
  data: ListOfViolationsColumn;
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  const user = useCurrentUser();
  const toast = useToast();
  const router = useRouter();
  const [violation, setViolation] = useState<ViolationType | null>();
  const [commMembers, setCommMembers] = useState<PersonalInfo | null>();
  const [userInfos, setUserInfos] = useState<PersonalInfo[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getViolationTypeByTitle(data.type).then((violation) =>
          setViolation(violation)
        );

        await getAllInfo().then((infos) => {
          setUserInfos(infos);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const setOfficer = async (data: ListOfViolationsColumn) => {
    await updateOfficerAssigned(data.id, user!!.id)
      .then((data) => {
        if (data.success) {
          console.log(data.success);
        }
      })
      .then(() => {
        router.replace(
          `/admin/violations/violation-record/view-progress/${data.id}`
        );
      });
  };

  const sendLetter = async (data: ListOfViolationsColumn) => {
    const noticeValues = {
      type: "LETTER",
      idToLink: data.id,
      sender: user?.id,
    };

    const notifData = {
      type: "violation",
      userId: data.personsInvolved,
      title: "A violation report has been submitted against you.",
      description:
        "Click here to view report details and contact the committee, should you make an appeal.",
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
  };

  const invalidateReport = async (id: string) => {
    await updateStatus(id, "Invalid").then((data) => {
      if (data.success) {
        console.log(data.success);
        router.refresh();
      }
    });
  };

  const appealedReport = async (id: string) => {
    await updateStatus(id, "Appealed").then((data) => {
      if (data.success) {
        console.log(data.success);
        router.refresh();
      }
    });
  };

  const markResolved = async (data: ListOfViolationsColumn) => {
    data.personsInvolved.map(async (person) => {
      // Send Notice
      const noticeValues = {
        type: "NOTICE",
        idToLink: data.id,
        sender: user?.id,
      };

      const noticeData = {
        ...noticeValues,
        recipient: person,
      };

      await createNotice(noticeData).then(async (res) => {
        if (res.success) {
          console.log(res.success);
        }
      });

      // Bill to Address of Person Involved + Notification

      const feeData = {
        addressId: userInfos?.find((info) => info.userId === person)?.address,
        purpose: "violation",
        description: violation?.title,
        amount: violation?.fee,
      };

      await newUserTransaction(feeData).then((data) => {
        if (data.success) {
          console.log(data.success);
        }
      });
    });

    // Send Notifications
    const notifNoticeData = {
      type: "violation",
      userId: data.personsInvolved,
      title: "Violation Notice",
      description:
        "Click here to view violation details and how to proceed with settling penalty fees.",
      link: data.id,
    };

    await createNotification(notifNoticeData).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
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

    // Update Progress and Mark Closed
    await updateClosed(data.id).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });
  };

  return (
    <div>
      {/* Status: PENDING = Button: Take Case */}
      {data.status === "Pending" &&
        user?.info?.committee === "Environment and Security Committee" &&
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

      {/* Status: REVIEW or AWAITING PAYMENT = Button: Mark as Resolved */}
      {data.status === "Under Review" &&
      data.letterSent &&
      data.officerAssigned ===
        `${user?.info.firstName} ${user?.info.lastName}` ? (
        <div className="flex gap-x-4">
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" colorScheme="facebook" fontFamily="font.body">
                  Mark as Settled
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Close Violation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure that the violation #V
                    {data.number.toString().padStart(4, "0")} has been reviewed
                    thoroughly and proceed with fining persons involved with the
                    penalty fee?
                    <Text mt="1rem">
                      Submitted by:{" "}
                      <span className="font-semibold">{data.submittedBy}</span>{" "}
                      <br />
                      Date received:{" "}
                      <span className="font-semibold">{data.createdAt}</span>
                    </Text>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Box mt={2}>
                  <HStack>
                    <Text fontSize="md" fontWeight="semibold">
                      {violation?.title} Penalty:
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      className="text-red-700"
                    >
                      ₱ {violation?.fee}
                    </Text>
                  </HStack>
                </Box>
                <AlertDialogFooter>
                  <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-green-700 hover:bg-green-900"
                    onClick={() =>
                      markResolved(data).then(() => {
                        toast({
                          title: `Marked the violation #V${data.number
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
                <Button size="sm" colorScheme="green" fontFamily="font.body">
                  Mark as Appealed
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Mark Violation as Appealed
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to mark violation #V
                    {data.number.toString().padStart(4, "0")} as appealed. Are
                    you sure?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-green-700 hover:bg-green-900"
                    onClick={() =>
                      appealedReport(data.id).then(() => {
                        toast({
                          title: `Marked the violation #V${data.number
                            .toString()
                            .padStart(4, "0")} as appealed.`,
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
        </div>
      ) : (
        data.status === "Under Review" &&
        !data.letterSent &&
        data.officerAssigned ===
          `${user?.info.firstName} ${user?.info.lastName}` && (
          <div className="flex gap-x-4">
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" colorScheme="green" fontFamily="font.body">
                    Send Letter
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Send Letter to Persons Involved
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Proceeding will inform persons involved in #V
                      {data.number.toString().padStart(4, "0")} that a report
                      has been made against them.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-green-700 hover:bg-green-900"
                      onClick={() => {
                        sendLetter(data).then(() => {
                          toast({
                            title: `Persons involved in #V${data.number
                              .toString()
                              .padStart(4, "0")} have been informed.`,
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

            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" colorScheme="red" fontFamily="font.body">
                    Mark as Invalid
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mark Report as Invalid</AlertDialogTitle>
                    <AlertDialogDescription>
                      Upon reviewing report details of #V
                      {data.number.toString().padStart(4, "0")}, by proceeding,
                      you will now mark this report as invalid due to
                      insufficient evidence.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-700 hover:bg-red-900"
                      onClick={() =>
                        invalidateReport(data.id).then(() => {
                          toast({
                            title: `Marked report #V${data.number
                              .toString()
                              .padStart(4, "0")} as invalid.`,
                            status: "warning",
                            position: "bottom-right",
                            isClosable: true,
                          });
                        })
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )
      )}
    </div>
  );
};
