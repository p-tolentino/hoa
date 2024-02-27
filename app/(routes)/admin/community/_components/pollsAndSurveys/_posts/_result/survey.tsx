"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Stack,
  Text,
  Box,
  Divider,
  Progress,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

function surveyResult() {
  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" fontFamily="font.body" colorScheme="green">
          Survey Result
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Survey Result</DialogTitle>
          <DialogDescription>View the results of the survey.</DialogDescription>
        </DialogHeader>

        {/* Form Content */}
        <Stack spacing="15px">
          <Text fontSize="sm" fontWeight="semibold">
            Survey Title:
          </Text>
          <Text fontSize="sm" fontFamily="font.body">
            Display Title Here
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            Description:
          </Text>
          <Text fontSize="sm" fontFamily="font.body">
            Display Description Here
          </Text>
          <Divider />

          {/* Poll Result */}
          <Box p="10px" maxH="300px" overflowY="auto">
            <Stack spacing="15px">
              <Text fontSize="sm" fontWeight="semibold">
                Question 1:
              </Text>
              <Text fontSize="sm" fontFamily="font.body">
                Display Question Here
              </Text>
              <Stack spacing={2}>
                <Text fontSize="sm" fontFamily="font.body">
                  Option 1
                </Text>
                <Progress colorScheme="yellow" size="sm" value={20} />
                <Text fontSize="sm" fontFamily="font.body">
                  Option 2
                </Text>
                <Progress colorScheme="yellow" size="sm" value={80} />
                <Text fontSize="sm" fontFamily="font.body">
                  Option 3
                </Text>
                <Progress colorScheme="yellow" size="sm" value={60} />
              </Stack>
              <Text fontSize="sm" fontWeight="semibold">
                Question 2:
              </Text>
              <Text fontSize="sm" fontFamily="font.body">
                Display Question Here
              </Text>
              <Stack spacing={2}>
                <Text fontSize="sm" fontFamily="font.body">
                  Option 1
                </Text>
                <Progress colorScheme="yellow" size="sm" value={20} />
                <Text fontSize="sm" fontFamily="font.body">
                  Option 2
                </Text>
                <Progress colorScheme="yellow" size="sm" value={80} />
                <Text fontSize="sm" fontFamily="font.body">
                  Option 3
                </Text>
                <Progress colorScheme="yellow" size="sm" value={60} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
export default surveyResult;
