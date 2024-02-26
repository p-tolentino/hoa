import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Stack, Text, Box, Divider } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function answerPoll() {
  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" fontFamily="font.body">
          Answer Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Answer Poll</DialogTitle>
          <DialogDescription>Enter your answers to the poll.</DialogDescription>
        </DialogHeader>

        {/* Form Content */}
        <Stack spacing="15px">
          <Text fontSize="sm" fontWeight="semibold">
            Poll Title:
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
          <Box p="10px">
            <Stack spacing="15px">
              <Text fontSize="sm" fontWeight="semibold">
                Poll Question:
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
export default answerPoll;
