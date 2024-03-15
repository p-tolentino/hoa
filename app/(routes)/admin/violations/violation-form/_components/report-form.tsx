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
import { createViolation } from "@/server/actions/violation";
import { PersonalInfo, ViolationType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

const ViolationFormSchema = z.object({
  violationDate: z.string(),
  type: z.string(),
  description: z.string(),
});

type ViolationFormValues = z.infer<typeof ViolationFormSchema>;

interface ReportFormProps {
  violationTypes: ViolationType[];
  users: PersonalInfo[];
}

export const ReportForm: React.FC<ReportFormProps> = ({
  violationTypes,
  users,
}) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const title = "Report a Violation";
  const description =
    "Fill out the Violation Form to formally request a violation review from the Homeowners' Association.";

  const [allUsers, setUsers] = useState<PersonalInfo[] | []>([]);
  const [personsInvolved, setPersonsInvolved] = useState([""]);
  const [filesUploaded, setFilesUploaded] = useState([""]);

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, []);

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

  const form = useForm<ViolationFormValues>({
    resolver: zodResolver(ViolationFormSchema),
    defaultValues: {
      violationDate: "",
      type: "",
      description: "",
    },
  });

  const onSubmit = async (values: ViolationFormValues) => {
    startTransition(() => {
      const formData = {
        ...values,
        violationDate: new Date(values.violationDate),
        personsInvolved: personsInvolved.filter(
          (item, index) => personsInvolved.indexOf(item) === index
        ),
      };

      createViolation(formData)
        .then((data) => {
          console.log(data.success);
          router.push(`/admin/violations/submitted-violations`);
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
        <Button size="sm" colorScheme="gray" as={Link} href="/admin/violations">
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
              {/* Date of Violation */}
              <FormField
                control={form.control}
                name="violationDate"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="md" fontFamily="font.body">
                      Date of Violation:
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

              {/* Violation Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="md" fontFamily="font.body">
                      Violation Type:
                    </FormLabel>
                    <Select
                      size="sm"
                      fontFamily="font.body"
                      w="max-content"
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

              {/* Violation Description */}
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

              {/* Violation Document Uploading */}
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
                  This will allow us to gain more information about the
                  violation that would help us in decision making.
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
                  violation.
                </FormHelperText>
              </FormControl>
              {/* Submit Button */}
              <Box textAlign="center">
                <Button size="sm" type="submit" colorScheme="yellow" my="20px">
                  Submit Violation Form
                </Button>
              </Box>
            </Stack>
          </form>
        </Form>
      </Box>
    </>
  );
};

export default ReportForm;
