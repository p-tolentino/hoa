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
  Spacer,
  Divider,
  CheckboxGroup,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

function createSurveys() {
  let [surveyDescription, setSurveyDescription] = useState("");
  let [options, setOptions] = useState([""]);
  let [questions, setQuestions] = useState([{ question: "", options: [""] }]);

  let handleSurveyDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let inputSurveyDescription = e.target.value;
    setSurveyDescription(inputSurveyDescription);
  };

  let [isNewCategorySelected, setIsNewCategorySelected] = useState(false);
  let [newCategory, setNewCategory] = useState("");

  let handleCheckboxChange = () => {
    setIsNewCategorySelected(!isNewCategorySelected);
    setNewCategory(""); // Clear the input field when toggling the checkbox
  };

  let addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  let addQuestion = () => {
    setQuestions([...questions, { question: "", options: [""] }]);
  };

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          <AddIcon boxSize={3} mr="10px" />
          Create Survey
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Create a Survey</DialogTitle>
            <DialogDescription>
              Fill up the following fields to create a survey.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing="15px" my="2rem">
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Survey Title:
              </FormLabel>
              <Input
                size="md"
                fontWeight="semibold"
                type="string"
                placeholder="Enter a Survey Title"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Description:
              </FormLabel>
              <Textarea
                placeholder="Write something..."
                id="surveyDescription"
                fontSize="xs"
                maxH="300px"
                value={surveyDescription}
                onChange={handleSurveyDescriptionChange}
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

            {/* Survey Question */}
            <Box p="10px" maxH="300px" overflowY="auto">
              <Stack spacing="15px">
                {questions.map((question, index) => (
                  <FormControl key={index} isRequired mb="3%">
                    <HStack>
                      <FormLabel fontSize="sm" fontWeight="semibold">
                        Survey Question:
                      </FormLabel>
                      <Spacer />
                      <Box alignSelf="center" ml="2%">
                        <Button
                          size="xs"
                          colorScheme="yellow"
                          onClick={addQuestion}
                        >
                          Add Question
                        </Button>
                      </Box>
                    </HStack>
                    <Input
                      size="sm"
                      type="string"
                      placeholder="Enter a Survey Question"
                      value={question.question}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].question = e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="semibold">
                        Options:
                      </FormLabel>
                      {question.options.map((option, optionIndex) => (
                        <HStack key={optionIndex} mt="0.5rem">
                          <Input
                            size="sm"
                            type="string"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].options[optionIndex] =
                                e.target.value;
                              setQuestions(newQuestions);
                            }}
                          />
                          {optionIndex === question.options.length - 1 && (
                            <Box alignSelf="center" ml="2%">
                              <Button
                                size="xs"
                                w="20px"
                                onClick={() => addOption(index)}
                              >
                                <AddIcon />
                              </Button>
                            </Box>
                          )}
                        </HStack>
                      ))}
                    </FormControl>
                  </FormControl>
                ))}
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
export default createSurveys;
