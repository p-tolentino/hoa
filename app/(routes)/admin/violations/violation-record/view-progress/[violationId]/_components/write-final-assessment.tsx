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
import { updateViolation } from "@/server/actions/violation";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ReportStatus, Violation } from "@prisma/client";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WriteFinalAssessment({
  violation,
}: {
  violation: Violation;
}) {
  const [isOpen, setIsOpen] = useState(false); // Dialog open state
  const [selectedOption, setSelectedOption] = useState("");
  const [finalReview, setFinalReview] = useState("");

  const router = useRouter();

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  const onSubmit = async () => {
    const formData = {
      finalReview: finalReview,
      status: ReportStatus.CLOSED,
      reasonToClose: `${
        selectedOption === "APPEALED"
          ? "Appealed"
          : "Penalty Fee Charged to SOA"
      }`,
      finalReviewDate: new Date(),
    };

    await updateViolation(violation.id, formData).then((data) => {
      console.log(data.success);
      setIsOpen(false);
      router.refresh();
      router.push(
        `/admin/violations/violation-record/view-progress/${violation.id}`
      );
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
              assessment formulated by the committee for the violation case.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing="15px" my="1.5rem">
            <Stack>
              <Text fontSize="sm" fontFamily="font.body">
                What is the committee's final verdict for this violation case?
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
                    bg={selectedOption === "APPEALED" ? "yellow.100" : ""}
                  >
                    <Radio value="APPEALED" colorScheme="yellow">
                      The violation case has been formally{" "}
                      <span className="font-bold">APPEALED</span>. There will be
                      no imposition of penalty fees.
                    </Radio>
                  </Box>
                  <Box
                    pl="0.5rem"
                    bg={selectedOption === "CONCLUDED" ? "red.100" : ""}
                  >
                    <Radio value="CONCLUDED" colorScheme="red">
                      The violation case has been formally{" "}
                      <span className="font-bold">CONCLUDED</span>. A{" "}
                      <span className="font-semibold text-red-500">
                        penalty fee
                      </span>{" "}
                      shall be imposed in accordance with the committee's
                      evaluation.
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
                  "Provide a brief summary of the committee's final assessment in this violation case..."
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
              Finish Assessment and Close Violation Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
