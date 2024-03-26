"use client";

import {
  Box,
  Text,
  Center,
  Stack,
  Flex,
  UnorderedList,
  ListItem,
  OrderedList,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { format, addDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { getLetterById } from "@/server/data/letter-notice";
import {
  Letter,
  Notice,
  PersonalInfo,
  Violation,
  ViolationType,
} from "@prisma/client";
import { getInfoById } from "@/server/data/user-info";
import {
  getViolationTypeById,
  getViolationTypeByTitle,
} from "@/server/data/violation-type";
import { getViolationById } from "@/server/data/violation";
import BackButton from "@/components/system/BackButton";

export default function ViolationLetter() {
  const searchParams = useSearchParams();

  const [letter, setLetter] = useState<Letter | null>();
  const [recipient, setRecipient] = useState<PersonalInfo | null>();
  const [sender, setSender] = useState<PersonalInfo | null>();
  const [violation, setViolation] = useState<Violation | null>();
  const [violationType, setViolationType] = useState<ViolationType | null>();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const fetchData = async () => {
        const letterId = searchParams.get("letterId");
        const violationId = searchParams.get("violationId");
        const violationTypeId = searchParams.get("violationTypeId");

        if (letterId) {
          await getLetterById(letterId).then((data) => {
            if (data) {
              setLetter(data);
              getInfoById(data.recipient).then((data) => {
                setRecipient(data);
              });

              getInfoById(data.sender).then((data) => {
                setSender(data);
              });
            }
          });
        }

        if (violationId) {
          await getViolationById(violationId).then((data) => {
            setViolation(data);
          });
        }

        if (violationTypeId) {
          await getViolationTypeById(violationTypeId).then((data) => {
            setViolationType(data);
          });
        }
      };

      fetchData();
    });
  }, []);

  const withinNumDays = 14; // cam be adjusted by admin
  const deadline = letter?.createdAt
    ? format(
        addDays(new Date(letter?.createdAt), withinNumDays),
        "MMMM dd, yyyy"
      )
    : "";

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
            #V{violation?.number.toString().padStart(4, "0")} Violation Letter:{" "}
            {letter?.title} 📩
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
                  {letter?.createdAt
                    ? format(
                        new Date(letter?.createdAt)
                          ?.toISOString()
                          .split("T")[0],
                        "MMMM dd, yyyy"
                      )
                    : ""}
                </Text>
              </Flex>

              <Text textAlign="justify">
                We are writing to inform you that a{" "}
                <span className="font-bold">violation</span> has been reported
                against you.
              </Text>

              {/* Violation Details */}
              <Box>
                <Text textAlign="justify">
                  Violation Details: <br />
                </Text>
                <UnorderedList>
                  {/* Date of Violation */}
                  <ListItem>
                    Date of Violation:{" "}
                    <span className="font-semibold">
                      {violation?.violationDate
                        ? format(
                            new Date(violation?.violationDate)
                              ?.toISOString()
                              .split("T")[0],
                            "MMMM dd, yyyy"
                          )
                        : ""}
                    </span>
                  </ListItem>
                  {/* Violation Type */}
                  <ListItem>
                    Violation Type:{" "}
                    <span className="font-semibold">
                      {violationType?.title}
                    </span>
                  </ListItem>
                  {/* Penalty Fee */}
                  <ListItem>
                    Penalty Fee:{" "}
                    <span className="font-semibold text-red-500">
                      ₱ {violationType?.firstOffenseFee}
                    </span>
                  </ListItem>
                </UnorderedList>
              </Box>

              <Text textAlign="justify">
                Upon investigation, it has been determined that corrective
                actions are required to address the violation. You have two (2)
                options for resolution:
              </Text>

              <OrderedList spacing={3}>
                <ListItem>
                  <span className="font-bold">Payment of Penalty Fee</span>: You
                  may choose to resolve the violation by paying the associated
                  penalty fee. Payment instructions can be found in the{" "}
                  <Link
                    href="/admin/violations/process-guide#payPenaltyFee"
                    className="text-blue-500 hover:underline"
                  >
                    Violation Process Guide - Pay Penalty Fee{" "}
                  </Link>
                  section.
                </ListItem>
                <ListItem>
                  <span className="font-bold">Appeal the Violation</span>: If
                  you would like to appeal the decision, you have the right to
                  do so. To initiate the appeal process, please follow the
                  instructinons of rectifying a violation report in the{" "}
                  <Link
                    href="/admin/violations/process-guide#rectifyViolations"
                    className="text-blue-500 hover:underline"
                  >
                    Violation Process Guide - Rectify Violations{" "}
                  </Link>
                  section.
                </ListItem>
              </OrderedList>

              <Text textAlign="justify">
                Please take immediate action to rectify the violation within{" "}
                <span className="font-semibold">
                  {withinNumDays.toString()} days
                </span>{" "}
                from the date of this notice{" "}
                <span className="font-bold text-red-500">({deadline})</span>.
              </Text>

              <Text textAlign="justify">
                Your prompt attention to this matter is crucial in maintaining a
                positive relationship with our organization and avoiding any
                potential consequences. We appreciate your cooperation in
                resolving this issue promptly.
              </Text>

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
