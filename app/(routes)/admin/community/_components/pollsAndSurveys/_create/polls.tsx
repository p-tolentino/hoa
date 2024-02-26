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
  Input,
  Stack,
  Text,
  Box,
  HStack,
  Divider,
  Checkbox,
  CheckboxGroup,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function createPoll() {
  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          <AddIcon mr="10px" />
          Create Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create a Poll</DialogTitle>
          <DialogDescription>
            Fill up the following poll details.
          </DialogDescription>
        </DialogHeader>

        {/* Form Content */}
        <Stack spacing="15px">
          <Text fontSize="sm" fontWeight="semibold">
            Poll Title:
          </Text>
          <Input size="sm" type="string" placeholder="Enter a Poll Title" />
          <Text fontSize="sm" fontWeight="semibold">
            Description:
          </Text>
          <Input size="sm" type="string" placeholder="Enter a Description" />

          {/* Select Category */}
          <Text fontSize="sm" fontWeight="semibold">
            Category:
          </Text>
          <CheckboxGroup size="sm" colorScheme="yellow">
            <Stack spacing={5} direction="row" fontFamily="font.body">
              <Checkbox>Meeting</Checkbox>
              <Checkbox>Election</Checkbox>
              <Checkbox>Inquiry</Checkbox>
              <Checkbox>Event</Checkbox>
            </Stack>
          </CheckboxGroup>
          <Text fontSize="sm" fontWeight="semibold">
            Add Category:
          </Text>
          <Input size="sm" type="string" placeholder="Enter a new category" />
          <Divider />

          {/* Poll Question */}
          <Box p="10px">
            <Stack spacing="15px">
              <Text fontSize="sm" fontWeight="semibold">
                Poll Question:
              </Text>
              <Input
                size="sm"
                type="string"
                placeholder="Enter a Poll Question"
              />
              <Text fontSize="sm" fontWeight="semibold">
                Options:
              </Text>
              <HStack>
                <Input size="sm" type="string" placeholder="Option 1" />
                <Box alignSelf="center" ml="2%">
                  <Button size="xs" w="20px">
                    <AddIcon />
                  </Button>
                </Box>
              </HStack>
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
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default createPoll;
