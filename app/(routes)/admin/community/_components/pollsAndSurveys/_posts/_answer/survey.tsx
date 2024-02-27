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
import {
  Stack,
  Text,
  Box,
  Divider,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";

function answerSurvey() {
  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" fontFamily="font.body">
          Answer Survey
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Answer Survey</DialogTitle>
          <DialogDescription>
            Enter your answers to the survey.
          </DialogDescription>
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

          {/* Poll Question */}
          <Box p="10px" maxH="300px" overflowY="auto">
            <Stack spacing="15px">
              <Text fontSize="sm" fontWeight="semibold">
                Question 1:
              </Text>
              <Text fontSize="sm" fontFamily="font.body">
                Display Question Here
              </Text>
              <RadioGroup size="sm" fontFamily="font.body">
                <Stack spacing={2}>
                  <Radio value="1">Option 1</Radio>
                  <Radio value="2">Option 2</Radio>
                  <Radio value="3">Option 3</Radio>
                </Stack>
              </RadioGroup>
              <Text fontSize="sm" fontWeight="semibold">
                Question 2:
              </Text>
              <Text fontSize="sm" fontFamily="font.body">
                Display Question Here
              </Text>
              <RadioGroup size="sm" fontFamily="font.body">
                <Stack spacing={2}>
                  <Radio value="1">Option 1</Radio>
                  <Radio value="2">Option 2</Radio>
                  <Radio value="3">Option 3</Radio>
                </Stack>
              </RadioGroup>
              <Text fontSize="sm" fontWeight="semibold">
                Question 3:
              </Text>
              <Text fontSize="sm" fontFamily="font.body">
                Display Question Here
              </Text>
              <RadioGroup size="sm" fontFamily="font.body">
                <Stack spacing={2}>
                  <Radio value="1">Option 1</Radio>
                  <Radio value="2">Option 2</Radio>
                  <Radio value="3">Option 3</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </Box>
        </Stack>

        <DialogFooter>
          <Button
            w="full"
            size="sm"
            colorScheme="yellow"
            type="submit"
            // onClick={() => onSubmit()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default answerSurvey;
