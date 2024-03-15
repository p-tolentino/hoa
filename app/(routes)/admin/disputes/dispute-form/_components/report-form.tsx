"use client";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Box,
  Stack,
  HStack,
  Select,
  Flex,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AddIcon } from "@chakra-ui/icons";
import { Form, FormField } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DisputeType, PersonalInfo, ViolationType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createDispute } from "@/server/actions/dispute";
import { createNotification } from "@/server/actions/notification";

const DisputeFormSchema = z.object({
  disputeDate: z.string(),
  type: z.string(),
  description: z.string(),
  violationInvolved: z.string(),
});

type DisputeFormValues = z.infer<typeof DisputeFormSchema>;

interface ReportFormProps {
  disputeTypes: DisputeType[];
  violationTypes: ViolationType[];
  users: PersonalInfo[];
}

export const ReportForm: React.FC<ReportFormProps> = ({
  disputeTypes,
  violationTypes,
  users,
}) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const title = "File a Dispute";
  const description =
    "Fill out the Dispute Form to formally request for a dispute resolution from the Homeowners' Association.";

  const [isViolationInvolved, setIsViolationInvolved] = useState(false);
  const [personsInvolved, setPersonsInvolved] = useState([""]);
  const [filesUploaded, setFilesUploaded] = useState([""]);

  const addPersonInput = () => {
    setPersonsInvolved([...personsInvolved, ""]);
  };

  const removePersonInput = (index: number) => {
    const updatedPersonsInvolved = [...personsInvolved];
    updatedPersonsInvolved.splice(index, 1);
    setPersonsInvolved(updatedPersonsInvolved);
  };

  const handlePersonInputChange = (index: number, value: string) => {
    const updatedPersonsInvolved = [...personsInvolved];
    updatedPersonsInvolved[index] = value;
    setPersonsInvolved(updatedPersonsInvolved);
  };

  const addFileUpload = () => {
    setFilesUploaded([...filesUploaded, ""]);
  };

  const removeFileUpload = (index: number) => {
    const updatedFilesUploaded = [...filesUploaded];
    updatedFilesUploaded.splice(index, 1);
    setFilesUploaded(updatedFilesUploaded);
  };

  const handleFileUploadChange = (index: number, value: string) => {
    const updatedFilesUploaded = [...filesUploaded];
    updatedFilesUploaded[index] = value;
    setFilesUploaded(updatedFilesUploaded);
  };

  const form = useForm<DisputeFormValues>({
    resolver: zodResolver(DisputeFormSchema),
    defaultValues: {
      disputeDate: "",
      type: "",
      description: "",
      violationInvolved: "",
    },
  });

  const onSubmit = async (values: DisputeFormValues) => {
    startTransition(() => {
      const formData = {
        ...values,
        disputeDate: new Date(values.disputeDate),
        violationInvolved:
          isViolationInvolved === true ? form.watch("violationInvolved") : null,
        personsInvolved: personsInvolved.filter(
          (item, index) => personsInvolved.indexOf(item) === index
        ),
      };

      createDispute(formData)
        .then((data) => {
          if (data.success) {
            console.log(data.success);
            router.push(`/admin/disputes/submitted-disputes`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
        <Button size="sm" as={Link} href="/admin/disputes">
          Go Back
        </Button>
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Box
        w="80%"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        mt="2%"
        p="20px"
        overflowY="auto"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack spacing={5}>
              {/* Date of Dispute */}
              <FormField
                control={form.control}
                name="disputeDate"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="md" fontFamily="font.body">
                      Date of Dispute:
                    </FormLabel>
                    <Input
                      type="date"
                      fontSize="sm"
                      fontFamily="font.body"
                      w="max-content"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              {/* Dispute Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="md"
                      fontFamily="font.body"
                      w="max-content"
                    >
                      Dispute Type
                    </FormLabel>
                    <Select
                      // placeholder='Select Dispute Type'
                      size="sm"
                      fontFamily="font.body"
                      onChange={field.onChange}
                      value={field.value}
                    >
                      <option value="" disabled>
                        Select a dispute type
                      </option>
                      {disputeTypes.map((dispute) => (
                        <option key={dispute.id} value={dispute.name}>
                          {dispute.title}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>
                )}
              />

              {/* Is Violation Involved? */}
              <FormControl isRequired>
                <Stack direction="row">
                  <FormLabel fontSize="md" fontFamily="font.body">
                    Does the dispute involve any violations based on the HOA
                    Bylaws?
                  </FormLabel>
                  <RadioGroup
                    colorScheme="yellow"
                    fontFamily="font.body"
                    onChange={(e) =>
                      e === "true"
                        ? setIsViolationInvolved(true)
                        : setIsViolationInvolved(false)
                    }
                  >
                    <Stack direction="row">
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
              </FormControl>

              {/* Violation IS involved */}
              {isViolationInvolved && (
                <FormField
                  control={form.control}
                  name="violationInvolved"
                  render={({ field }) => (
                    <FormControl>
                      <Select
                        mt={-5}
                        size="sm"
                        fontFamily="font.body"
                        onChange={field.onChange}
                        value={field.value}
                      >
                        <option value="" disabled>
                          Select a violation type
                        </option>
                        {violationTypes.map((violation) => (
                          <option key={violation.id} value={violation.name}>
                            {violation.title}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                  )}
                />
              )}

              {/* Dispute Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="md" fontFamily="font.body">
                      Description:
                    </FormLabel>
                    <Textarea
                      size="sm"
                      placeholder="Tell us what happened..."
                      h="160px"
                      fontFamily="font.body"
                      resize={"none"}
                      {...field}
                    />
                  </FormControl>
                )}
              />

              {/* Dispute Document Uploading */}
              <FormControl isRequired>
                <HStack justifyContent="space-between">
                  <FormLabel fontSize="md" fontFamily="font.body">
                    Upload your supporting documents:
                  </FormLabel>
                  <Button
                    size="xs"
                    mt="-1"
                    leftIcon={<AddIcon />}
                    onClick={addFileUpload}
                  >
                    Add File
                  </Button>
                </HStack>
                {filesUploaded.map((file, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <Input
                      type="file"
                      size="sm"
                      fontFamily="font.body"
                      mb={2}
                      value={file}
                      onChange={(e) =>
                        handleFileUploadChange(index, e.target.value)
                      }
                    />
                    {filesUploaded.length > 1 && index !== 0 && (
                      <Button
                        size="xs"
                        colorScheme="red"
                        ml={2}
                        onClick={() => removeFileUpload(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                ))}
                <FormHelperText fontSize="xs" mt="-1" pt={2}>
                  This will allow us to gain more information about the dispute
                  that would help us in decision making.
                </FormHelperText>
              </FormControl>

              {/* Person/s Involved */}
              <FormControl isRequired>
                <HStack justifyContent="space-between">
                  <FormLabel fontSize="md" fontFamily="font.body">
                    Person/s Involved
                  </FormLabel>
                  <Button
                    size="xs"
                    mt="-1"
                    leftIcon={<AddIcon />}
                    onClick={addPersonInput}
                  >
                    Add Person
                  </Button>
                </HStack>
                {personsInvolved.map((person, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <Select
                      key={index}
                      size="sm"
                      fontFamily="font.body"
                      mb={2}
                      w="full"
                      onChange={(e) =>
                        handlePersonInputChange(index, e.target.value)
                      }
                      value={person}
                    >
                      <option value="" disabled>
                        Select from users...
                      </option>
                      {users.map((user) => {
                        if (user.userId !== currentUser?.id) {
                          return (
                            <option key={user.userId} value={user.userId}>
                              {user.firstName} {user.lastName}
                            </option>
                          );
                        }
                      })}
                    </Select>

                    {personsInvolved.length > 1 && index !== 0 && (
                      <Button
                        size="xs"
                        colorScheme="red"
                        ml={2}
                        onClick={() => removePersonInput(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                ))}

                <FormHelperText fontSize="xs" mt="-1" pt={2}>
                  This will allow us to contact the individuals involved in the
                  dispute.
                </FormHelperText>
              </FormControl>
              {/* Submit Button */}
              <Box textAlign="center">
                <FormControl>
                  <Button
                    size="sm"
                    type="submit"
                    colorScheme="yellow"
                    my="20px"
                  >
                    Submit Dispute Form
                  </Button>
                </FormControl>
              </Box>
            </Stack>
          </form>
        </Form>
      </Box>
    </>
  );
};

export default ReportForm;
