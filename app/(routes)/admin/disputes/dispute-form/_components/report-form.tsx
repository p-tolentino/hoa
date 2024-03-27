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
  Select,
  HStack,
  Flex,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { startTransition, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import { Form, FormField } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DisputeType, PersonalInfo, ViolationType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createDispute } from "@/server/actions/dispute";
import BackButton from "@/components/system/BackButton";
import { UploadDropzone } from "@/lib/utils";

const DisputeFormSchema = z.object({
  disputeDate: z.string(),
  type: z.string(),
  description: z.string(),
  personComplained: z.string(),
});

type DisputeFormValues = z.infer<typeof DisputeFormSchema>;

interface ReportFormProps {
  disputeTypes: DisputeType[];
  users: PersonalInfo[];
}

export const ReportForm: React.FC<ReportFormProps> = ({
  disputeTypes,

  users,
}) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const title = "File a Dispute";
  const description =
    "Fill out the Dispute Form to formally request for a dispute resolution from the Homeowners' Association.";

  const [filesUploaded, setFilesUploaded] = useState([""]);

  const removeFileUpload = (index: number) => {
    const updatedFilesUploaded = [...filesUploaded];
    updatedFilesUploaded.splice(index, 1);
    setFilesUploaded(updatedFilesUploaded);
  };

  const handleFileUploadChange = (url: string) => {
    setFilesUploaded([...filesUploaded, url]);
  };

  const form = useForm<DisputeFormValues>({
    resolver: zodResolver(DisputeFormSchema),
    defaultValues: {
      disputeDate: "",
      type: "",
      description: "",
      personComplained: "",
    },
  });

  const onSubmit = async (values: DisputeFormValues) => {
    startTransition(() => {
      const formData = {
        ...values,
        disputeDate: new Date(values.disputeDate),
      };

      createDispute(formData)
        .then((data) => {
          if (data.success) {
            console.log(data.success);
            router.push(
              `/admin/disputes/submitted-disputes/view-progress/${data.dispute.id}`
            );
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
        <BackButton />
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
                        <option key={dispute.id} value={dispute.id}>
                          {dispute.title}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>
                )}
              />
              {/* 
              
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
*/}
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
                </HStack>
                {filesUploaded.map((file, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    className="mb-2"
                  >
                    <a href={file} target="_blank">
                      {file}
                    </a>{" "}
                    {/* Render file URL as a link */}
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
                <UploadDropzone
                  appearance={{
                    button:
                      "ut-uploading:cursor-not-allowed rounded-r-none bg-[#e6c45e] text-black bg-none after:bg-[#dbac1d]",
                    label: { color: "#ffaa00" },
                    uploadIcon: { color: "#355E3B" },
                  }}
                  endpoint="mixedUploader" // Adjust this endpoint as needed
                  onClientUploadComplete={(res) =>
                    handleFileUploadChange(res[0].url)
                  }
                  onUploadError={(error) => console.log(error)}
                />
                <FormHelperText fontSize="xs" mt="-1" pt={2}>
                  This will allow us to gain more information about the dispute
                  that would help us in decision making.
                </FormHelperText>
              </FormControl>

              {/* Person/s Involved */}
              <FormField
                control={form.control}
                name="personComplained"
                render={({ field }) => (
                  <FormControl isRequired>
                    <HStack justifyContent="space-between">
                      <FormLabel fontSize="md" fontFamily="font.body">
                        Person being Complained
                      </FormLabel>
                    </HStack>

                    <Box display="flex" alignItems="center">
                      <Select
                        size="sm"
                        fontFamily="font.body"
                        mb={2}
                        w="full"
                        onChange={field.onChange}
                        value={field.value}
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
                    </Box>

                    <FormHelperText fontSize="xs" mt="-1" pt={2}>
                      This will allow us to contact the individuals involved in
                      the dispute.
                    </FormHelperText>
                  </FormControl>
                )}
              />
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
