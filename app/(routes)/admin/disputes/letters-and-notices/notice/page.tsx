"use client";

import {
  Box,
  Text,
  Button,
  Center,
  Stack,
  Flex,
  UnorderedList,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { format, addDays, subDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { getNoticeById } from "@/server/data/letter-notice";
import {
  Dispute,
  DisputeType,
  Notice,
  PersonalInfo,
  Violation,
  ViolationType,
} from "@prisma/client";
import { getAllInfo, getInfoById } from "@/server/data/user-info";
import { getViolationTypeByName } from "@/server/data/violation-type";
import { getViolationById } from "@/server/data/violation";
import { getDisputeById } from "@/server/data/dispute";
import { getDisputeTypeByName } from "@/server/data/dispute-type";
import BackButton from "@/components/system/BackButton";

export default function DisputeMeetingNotice() {
  const meetingDetails = {
    date: format(addDays(new Date(2023, 2, 1), 10), "MMMM dd, yyyy"),
    time: "3:00PM",
    venue: "HOA Admin Office",
  };

  const searchParams = useSearchParams();
  const [notice, setNotice] = useState<Notice | null>();
  const [recipient, setRecipient] = useState<PersonalInfo | null>();
  const [sender, setSender] = useState<PersonalInfo | null>();
  const [dispute, setDispute] = useState<Dispute | null>();
  const [disputeType, setDisputeType] = useState<DisputeType | null>();
  const [violationType, setViolationType] = useState<ViolationType | null>();
  const [usersInvolved, setUsersInvolved] = useState<PersonalInfo[] | null>();

  const [isPending, startTransition] = useTransition();

  function formatTime(time: any) {
    if (time) {
      const [hours, minutes] = time.split(":").map(Number);

      const dummyDate = new Date(2000, 0, 1, hours, minutes);

      const formattedTime = format(dummyDate, "h:mm aa");

      return formattedTime;
    }
  }

  useEffect(() => {
    startTransition(() => {
      const fetchData = async () => {
        const noticeId = searchParams.get("noticeId");
        const disputeId = searchParams.get("disputeId");

        if (noticeId) {
          await getNoticeById(noticeId).then((data) => {
            if (data) {
              setNotice(data);
              getInfoById(data.recipient).then((data) => {
                setRecipient(data);
              });

              getInfoById(data.sender).then((data) => {
                setSender(data);
              });
            }
          });
        }

        if (disputeId) {
          await getDisputeById(disputeId).then((data) => {
            if (data) {
              setDispute(data);
              getDisputeTypeByName(data.type).then((data) => {
                setDisputeType(data);
              });

              getAllInfo().then((res) => {
                if (res) {
                  setUsersInvolved(
                    res.filter((info) =>
                      data?.personsInvolved.some(
                        (person) => person === info.userId
                      )
                    )
                  );
                }
              });

              if (data.violationInvolved) {
                getViolationTypeByName(data.violationInvolved).then((data) => {
                  setViolationType(data);
                });
              }
            }
          });
        }
      };

      fetchData();
    });
  }, []);

  return isPending ? (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Spinner />
    </Flex>
  ) : (
    <div>
      <Box textAlign="right">
        <BackButton />
      </Box>
      <Center flexDir="column">
        <>
          <Text
            my="10px"
            fontSize="xl"
            fontWeight="bold"
            fontFamily="font.heading"
          >
            {`#D${dispute?.number.toString().padStart(4, "0")}`} Dispute
            Resolution Meeting Notice 📅
          </Text>
          <Box borderWidth="1px" p={10} borderRadius="md" w="60vw">
            <Stack spacing={5} fontFamily="font.body" fontSize="md">
              <Flex justifyContent="space-between">
                {/* Recipient */}
                <Text>
                  Dear{" "}
                  <span className="font-bold">
                    {recipient?.firstName} {recipient?.lastName}
                  </span>
                  ,
                </Text>
                {/* Date Received */}
                <Text fontWeight="bold">
                  {notice?.createdAt
                    ? format(
                        new Date(notice?.createdAt)
                          ?.toISOString()
                          .split("T")[0],
                        "MMMM dd, yyyy"
                      )
                    : ""}
                </Text>
              </Flex>

              <Text textAlign="justify">
                We are writing to inform you that you are hereby summoned to
                attend a meeting scheduled to address and deliberate on the
                resolution of an ongoing{" "}
                <span className="font-bold">dispute</span>.
              </Text>

              {/* Dispute Details */}
              <Box>
                <Text>Dispute Details:</Text>
                <Flex gap="50px">
                  <UnorderedList ml={7}>
                    {/* Date of Dispute */}
                    <ListItem>
                      Date of Dispute:{" "}
                      <span className="font-semibold">
                        {dispute?.disputeDate
                          ? format(
                              new Date(dispute?.disputeDate)
                                ?.toISOString()
                                .split("T")[0],
                              "MMMM dd, yyyy"
                            )
                          : ""}
                      </span>
                    </ListItem>
                    {/* Dispute Type */}
                    <ListItem>
                      Dispute Type:{" "}
                      <span className="font-semibold">
                        {disputeType?.title}
                      </span>
                    </ListItem>
                    {/* Involved Person/s */}
                    <ListItem>
                      <>
                        Person/s Involved:{" "}
                        <UnorderedList ml={7}>
                          {usersInvolved &&
                            usersInvolved.map((person) => (
                              <ListItem key={person.id} fontWeight="semibold">
                                {person.firstName} {person.lastName}
                              </ListItem>
                            ))}
                        </UnorderedList>
                      </>
                    </ListItem>
                  </UnorderedList>
                  {/* Violation */}
                  <UnorderedList>
                    <ListItem>
                      <>
                        Violation:{" "}
                        {violationType ? (
                          <UnorderedList>
                            <ListItem>
                              Type:{" "}
                              <span className="font-semibold">
                                {violationType.title}
                              </span>
                            </ListItem>
                            <ListItem>
                              Penalty Fee:{" "}
                              <span className="font-semibold text-red-500">
                                {violationType.fee}
                              </span>
                            </ListItem>
                          </UnorderedList>
                        ) : (
                          <span className="font-semibold">N/A</span>
                        )}
                      </>
                    </ListItem>
                  </UnorderedList>
                </Flex>
              </Box>

              {/* Meeting Details */}
              <Box>
                <Text textAlign="justify">
                  The meeting has been scheduled for {/* Meeting Time */}
                  <span className="font-bold text-red-500">
                    {notice &&
                      format(new Date(`${notice?.meetDate}`), "MMMM dd, yyyy")}
                    , {formatTime(notice?.meetTime)}
                  </span>{" "}
                  at the {/* Meeting Venue */}
                  <span className="font-bold text-red-500">
                    {notice?.venue}
                    {". "}
                  </span>{" "}
                  Please inform us if you are available on the said date{". "}
                  <span className="text-gray-500">
                    (You may check the{" "}
                    <Link
                      href="/admin/membership/admin-directory"
                      className="text-blue-500 hover:underline"
                    >
                      Admin & Officers Directory
                    </Link>{" "}
                    in the Membership module for your reference)
                  </span>
                  .
                </Text>
              </Box>

              <Text textAlign="justify">
                Your presence is crucial for resolving this matter and
                maintaining a positive relationship with our organization.
                Details of the dispute and proposed resolutions will be
                discussed. Please come prepared to express your perspective and
                work towards a resolution.
              </Text>

              <Text textAlign="justify">
                Please refer to the{" "}
                <Link
                  href="/admin/disputes/process-guide"
                  className="text-blue-500 hover:underline"
                >
                  Dispute Resolution Process Guide
                </Link>{" "}
                for further information on the overall process of resolving this
                dispute.
              </Text>

              <Text>Thank you for your cooperation.</Text>

              <Text textAlign="justify" mt={5}>
                Sincerely,
              </Text>
              {/* Sender's Name and Position */}
              <Box>
                <Text>
                  {sender?.firstName} {sender?.lastName}
                </Text>
                <Text color="grey">{sender?.committee}</Text>
              </Box>
            </Stack>
          </Box>
        </>
      </Center>
    </div>
  );
}
