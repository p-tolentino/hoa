import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisputeOfficerActivity, ReportStatus } from "@prisma/client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import {
  createDisputeProgressReport,
  updateDispute,
  updateDisputeOfficerTask,
} from "@/server/actions/dispute";

export default function ProgressReportForm({
  keyActivities,
}: {
  keyActivities: DisputeOfficerActivity[];
}) {
  const [forActivity, setForActivity] = useState("");
  const [progressTitle, setProgressTitle] = useState("");
  const [progressDescription, setProgressDescription] = useState("");
  const router = useRouter();

  const onSubmit = async (isSubActivity: boolean) => {
    const formData = {
      activity: forActivity,
      title: progressTitle,
      description: progressDescription,
    };

    await createDisputeProgressReport(formData)
      .then((data) => {
        console.log(data.success);
        if (!isSubActivity) {
          updateDisputeOfficerTask(forActivity, true).then((data) => {
            const allDoneExceptLast = keyActivities
              .slice(0, -1)
              .every((activity) => activity.isDone === true);

            if (allDoneExceptLast) {
              const update = {
                step: 6,
                progress: "Step 6: Violation Enforcement with Penalty Fee",
                status: ReportStatus.FOR_FINAL_REVIEW,
              };

              updateDispute(keyActivities[0].disputeId, update).then((data) => {
                console.log(data.success);
                router.refresh();
                router.push(
                  `/admin/disputes/dispute-record/view-progress/${keyActivities[0].disputeId}`
                );
              });
            }

            console.log(data.success);
            router.refresh();
          });
        }
      })
      .then(() => {
        router.refresh();
      });
  };

  return (
    <form>
      <Stack spacing="15px">
        <Box>
          <Text fontWeight="semibold" fontFamily="font.heading" lineHeight={1}>
            Write a progress report
          </Text>
          <Text fontFamily="font.body" fontSize="sm">
            Write a progress report for an activity to demonstrate that it is
            being completed by the due date.
          </Text>
        </Box>
        <Flex justifyContent="space-between" gap={5}>
          <Input
            type="string"
            fontSize="md"
            fontFamily="font.body"
            fontWeight="semibold"
            placeholder="Enter a progress title"
            onChange={(e) => setProgressTitle(e.target.value)}
          />
          <Select onValueChange={setForActivity} defaultValue={forActivity}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {keyActivities.map((activity) => {
                  if (activity.isDone) {
                    return null;
                  }

                  return (
                    <SelectItem key={activity.id} value={activity.id}>
                      {activity.title}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>
        <Textarea
          fontSize="sm"
          fontFamily="font.body"
          placeholder="Write something..."
          height="20vh"
          resize="none"
          overflowY="auto"
          onChange={(e) => setProgressDescription(e.target.value)}
        ></Textarea>
        <ButtonGroup className="justify-end">
          <Button
            type="button"
            colorScheme="yellow"
            size="sm"
            w="min-content"
            onClick={() => onSubmit(true)}
          >
            Submit as Sub-Activity
          </Button>
          <Button
            type="button"
            colorScheme="green"
            size="sm"
            w="min-content"
            onClick={() => onSubmit(false)}
          >
            Submit & Mark Activity as Done
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  );
}
