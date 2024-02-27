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
  Input,
  Stack,
  Box,
  HStack,
  Divider,
  Checkbox,
  CheckboxGroup,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

function createPoll() {
  let [pollDescription, setPollDescription] = useState("");
  let [options, setOptions] = useState([""]);

  let handlePollDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let inputPollDescription = e.target.value;
    setPollDescription(inputPollDescription);
  };

  let [isNewCategorySelected, setIsNewCategorySelected] = useState(false);
  let [newCategory, setNewCategory] = useState("");

  let handleCheckboxChange = () => {
    setIsNewCategorySelected(!isNewCategorySelected);
    setNewCategory(""); // Clear the input field when toggling the checkbox
  };

  let addOption = () => {
    setOptions([...options, ""]);
  };

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          <AddIcon boxSize={3} mr="10px" />
          Create Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Create a Poll</DialogTitle>
            <DialogDescription>
              Fill up the following fields to create a poll.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing="15px" my="2rem">
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Poll Title:
              </FormLabel>
              <Input
                size="md"
                fontWeight="semibold"
                type="string"
                placeholder="Enter a Poll Title"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Description:
              </FormLabel>
              <Textarea
                placeholder="Write something..."
                id="pollDescription"
                fontSize="xs"
                maxH="300px"
                value={pollDescription}
                onChange={handlePollDescriptionChange}
              />
            </FormControl>

            {/* Select Category */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Category:
              </FormLabel>
              <CheckboxGroup size="sm" colorScheme="yellow">
                <Stack spacing={5} direction="row" fontFamily="font.body">
                  <Checkbox>Meeting</Checkbox>
                  <Checkbox>Election</Checkbox>
                  <Checkbox>Inquiry</Checkbox>
                  <Checkbox>Event</Checkbox>
                  <Checkbox onChange={handleCheckboxChange}>
                    New Category
                  </Checkbox>
                </Stack>
                {/* New Category selected */}
                {isNewCategorySelected && (
                  <Input
                    size="xs"
                    type="string"
                    placeholder="Enter New Category"
                    p="1rem"
                    mt="0.5rem"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                )}
              </CheckboxGroup>
              <FormHelperText fontSize="xs" m="1">
                Select the categories that apply to your post for members to
                easily find it.
              </FormHelperText>
            </FormControl>
            <Divider />

            {/* Poll Question */}
            <Box p="10px">
              <Stack spacing="15px">
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    Poll Question:
                  </FormLabel>
                  <Input
                    size="sm"
                    type="string"
                    placeholder="Enter a Poll Question"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    Options:
                  </FormLabel>
                  {options.map((option, index) => (
                    <HStack key={index} mt="0.5rem">
                      <Input
                        size="sm"
                        type="string"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...options];
                          newOptions[index] = e.target.value;
                          setOptions(newOptions);
                        }}
                      />
                      {index === options.length - 1 && (
                        <Box alignSelf="center" ml="2%">
                          <Button size="xs" w="20px" onClick={addOption}>
                            <AddIcon />
                          </Button>
                        </Box>
                      )}
                    </HStack>
                  ))}
                </FormControl>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default createPoll;
