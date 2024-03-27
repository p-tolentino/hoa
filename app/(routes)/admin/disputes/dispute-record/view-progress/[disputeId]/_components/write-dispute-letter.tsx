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
import { updateDispute, updateLetterSent } from "@/server/actions/dispute";
import { createDisputeLetter } from "@/server/actions/letter-notice";
import { createNotification } from "@/server/actions/notification";
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
import { LetterNoticeType, ReportStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WriteDisputeLetter({
  reportDetails,
}: {
  reportDetails: any;
}) {
  const letterSubjectPlaceholder = `#D${reportDetails.dispute.number
    .toString()
    .padStart(4, "0")} Dispute Letter: ${reportDetails.disputeType.title}`;
  const [letterSubject, setLetterSubject] = useState(letterSubjectPlaceholder);
  const [letterBody, setLetterBody] = useState("");

  const [isOpen, setIsOpen] = useState(false); // Dialog open state

  const router = useRouter();

  const onSubmit = async () => {
    const formData = {
      type: LetterNoticeType.DISPUTE,
      title: letterSubject,
      description: letterBody,
      sender: reportDetails.dispute.officerAssigned,
      idToLink: reportDetails.dispute.id,
      recipient: reportDetails.dispute.personComplained,
    };

    await createDisputeLetter(formData).then((data) => {
      console.log(data);

      const notifLetterData = {
        type: "disputeLetter",
        recipient: reportDetails.dispute.personComplained,
        title: "Urgent: A complaint has been filed against you.",
        description: "Click here to view letter",
        linkToView: `/admin/disputes/letters-and-notices/letter?letterId=${data.res?.id}&disputeId=${reportDetails.dispute.id}&disputeTypeId=${reportDetails.disputeType.id}`,
      };

      createNotification(notifLetterData).then((data) => {
        if (data.success) {
          console.log(data.success);
        }
      });

      updateLetterSent(reportDetails.dispute.id, true).then((data) => {
        console.log(data.success);

        const update = {
          step: 5,
          progress: "Step 5: Negotiations to Resolve Dispute",
          status: ReportStatus.NEGOTIATING,
        };

        updateDispute(reportDetails.dispute.id, update).then((data) => {
          console.log(data.success);
          setIsOpen(false);
          router.refresh();
          router.push(
            `/admin/disputes/dispute-record/view-progress/${reportDetails.dispute.id}`
          );
        });
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          Write Dispute Letter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Write Dispute Letter</DialogTitle>
            <DialogDescription>
              Write a letter to the alleged violator(s) informing them that a
              dispute case has been filed against them.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing="15px" my="1.5rem" fontFamily="font.body">
            <FormControl isReadOnly as={Flex} alignItems="center">
              <FormLabel>To:</FormLabel>
              <Input
                type="string"
                value={`${reportDetails.personComplained.firstName} ${reportDetails.personComplained.lastName}`}
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
              Send Dispute Letter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
