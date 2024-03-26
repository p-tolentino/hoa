"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createViolationLetter } from "@/server/actions/letter-notice";
import { updateLetterSent, updateViolation } from "@/server/actions/violation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { LetterNoticeType, PersonalInfo, ReportStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { report } from "process";
import { useState } from "react";

export default function WriteViolationLetter({
  reportDetails,
}: {
  reportDetails: any;
}) {
  const letterSubjectPlaceholder = `#V${reportDetails.violation.number
    .toString()
    .padStart(4, "0")} Violation Letter: ${reportDetails.violationType.title}`;
  const [letterSubject, setLetterSubject] = useState(letterSubjectPlaceholder);
  const [letterBody, setLetterBody] = useState("");

  const [isOpen, setIsOpen] = useState(false); // Dialog open state

  const router = useRouter();

  const onSubmit = async () => {
    const initialValues = {
      type: LetterNoticeType.VIOLATION,
      title: letterSubject,
      description: letterBody,
      sender: reportDetails.violation.officerAssigned,
      idToLink: reportDetails.violation.id,
    };

    reportDetails.personsInvolved.map(async (person: PersonalInfo) => {
      const formData = {
        ...initialValues,
        recipient: person.userId,
      };

      await createViolationLetter(formData).then((data) => {
        console.log(data);

        updateLetterSent(reportDetails.violation.id, true).then((data) => {
          console.log(data.success);
          const update = {
            step: 5,
            progress: "Step 5: Negotiations to Appeal Violation Case",
            status: ReportStatus.NEGOTIATING,
          };

          updateViolation(reportDetails.violation.id, update).then((data) => {
            console.log(data.success);
            setIsOpen(false);
            router.refresh();
            router.push(
              `/admin/violations/violation-record/view-progress/${reportDetails.violation.id}`
            );
          });
        });
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          Write Violation Letter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Write Violation Letter</DialogTitle>
            <DialogDescription>
              Write a letter to the alleged violator(s) informing them that a
              violation case has been filed against them.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing="15px" my="1.5rem" fontFamily="font.body">
            <FormControl isReadOnly as={Flex} alignItems="center">
              <FormLabel>To:</FormLabel>
              <Input
                type="string"
                value={
                  reportDetails.personsInvolved
                    ? reportDetails.personsInvolved
                        .map(
                          (person: PersonalInfo) =>
                            `${person.firstName} ${person.lastName}`
                        )
                        .join(", ")
                    : ""
                }
                disabled
              />
            </FormControl>
            <FormControl isRequired as={Flex} alignItems="center">
              <FormLabel>Subject:</FormLabel>
              <Input
                type="string"
                placeholder={letterSubjectPlaceholder}
                defaultValue={letterSubjectPlaceholder}
                onChange={(e) => setLetterSubject(e.target.value)}
              />
            </FormControl>
            <Textarea
              fontSize="sm"
              fontFamily="font.body"
              placeholder={"Write something..."}
              height="30vh"
              resize="none"
              onChange={(e) => setLetterBody(e.target.value)}
            />
          </Stack>
          <DialogFooter>
            <Button
              size="sm"
              colorScheme="yellow"
              type="button"
              onClick={() => onSubmit()}
            >
              Send Violation Letter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
