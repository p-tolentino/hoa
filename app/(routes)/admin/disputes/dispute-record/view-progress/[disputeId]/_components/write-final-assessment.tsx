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
import { updateDispute } from "@/server/actions/dispute";
import { createNotification } from "@/server/actions/notification";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ReportStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WriteFinalAssessment({
  reportDetails,
}: {
  reportDetails: any;
}) {
  const [isOpen, setIsOpen] = useState(false); // Dialog open state
  const [selectedOption, setSelectedOption] = useState("");
  const [finalReview, setFinalReview] = useState("");

  const router = useRouter();

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  const onSubmit = async () => {
    // const offenseCount =
    //   reportDetails.violationRecord[reportDetails.personsInvolved[0].userId];

    // const feeToIncur =
    //   offenseCount === 0
    //     ? reportDetails.violationType.firstOffenseFee
    //     : offenseCount === 1
    //     ? reportDetails.violationType.secondOffenseFee
    //     : reportDetails.violationType.thirdOffenseFee;

    const formData = {
      status: ReportStatus.CLOSED,
      finalReview: finalReview,
      finalReviewDate: new Date(),
      reasonToClose: `${
        selectedOption === "RESOLVED" ? "Resolved" : "Unresolved"
      }`,
    };

    await updateDispute(reportDetails.dispute.id, formData).then((data) => {
      console.log(data.success);
      setIsOpen(false);
      router.refresh();
      router.push(
        `/admin/disputes/dispute-record/view-progress/${reportDetails.dispute.id}`
      );
    });

    const notifNoticeData = {
      type: "dispute",
      title: `Dispute Concluded: ${selectedOption}`,
      description: "Click here to view dispute details",
      linkToView: `/admin/disputes/dispute-record/view-progress/${reportDetails.dispute.id}`,
    };
    await createNotification({
      ...notifNoticeData,
      recipient: reportDetails.dispute.personComplained,
    }).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });

    await createNotification({
      ...notifNoticeData,
      recipient: reportDetails.dispute.submittedBy,
    }).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          Write Final Assessment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Write Final Assessment</DialogTitle>
            <DialogDescription>
              Fill out the following fields as a guide to write the final
              assessment formulated by the committee for the dispute case.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing="15px" my="1.5rem">
            <Stack>
              <Text fontSize="sm" fontFamily="font.body">
                What is the committee's final verdict for this dispute case?
              </Text>
              <RadioGroup
                defaultValue=""
                size="sm"
                value={selectedOption}
                onChange={handleRadioChange}
              >
                <Stack
                  direction="column"
                  fontFamily="font.body"
                  textAlign="justify"
                >
                  <Box
                    pl="0.5rem"
                    bg={selectedOption === "RESOLVED" ? "yellow.100" : ""}
                  >
                    <Radio value="RESOLVED" colorScheme="yellow">
                      The dispute case has been formally{" "}
                      <span className="font-bold">RESOLVED</span> in accordance
                      with the committee's evaluation.
                    </Radio>
                  </Box>
                  <Box
                    pl="0.5rem"
                    bg={selectedOption === "UNRESOLVED" ? "red.100" : ""}
                  >
                    <Radio value="UNRESOLVED" colorScheme="red">
                      The dispute case has been formally concluded and marked as{" "}
                      <span className="font-bold">UNRESOLVED</span>. Further
                      action regarding the dispute shall be outside of the
                      committee's handling.
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </Stack>
            <Stack>
              <Textarea
                fontSize="sm"
                fontFamily="font.body"
                placeholder={
                  "Provide a brief summary of the committee's final assessment in this dispute case..."
                }
                height="30vh"
                resize="none"
                onChange={(e) => setFinalReview(e.target.value)}
              />
            </Stack>
          </Stack>
          <DialogFooter>
            <Button
              size="sm"
              colorScheme="yellow"
              type="button"
              onClick={() => onSubmit()}
            >
              Finish Assessment and Close Dispute Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
