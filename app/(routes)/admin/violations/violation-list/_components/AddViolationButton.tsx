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
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  FormHelperText,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { createViolationType } from "@/server/actions/violation-type";
import { useRouter } from "next/navigation";

export const ViolationTypeFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  firstOffense: z.string(),
  secondOffense: z.string(),
  thirdOffense: z.string(),
});

export type ViolationTypeFormValues = z.infer<typeof ViolationTypeFormSchema>;

export default function AddViolation() {
  const router = useRouter();

  const form = useForm<ViolationTypeFormValues>({
    resolver: zodResolver(ViolationTypeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      firstOffense: "",
      secondOffense: "",
      thirdOffense: "",
    },
  });

  const onSubmit = async (values: ViolationTypeFormValues) => {
    await createViolationType(values)
      .then((data) => {
        if (data.success) {
          toast({
            title: `Successfully added violation type "${form.watch(
              "title"
            )}" to the list of HOA violations.`,
            status: "success",
            position: "bottom-right",
            isClosable: true,
          });
        }
      })
      .then(() => {
        form.reset();
        router.refresh();
      });
  };

  const toast = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          <AddIcon boxSize={3} mr="10px" />
          Add Violation Type
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add a Violation Type</DialogTitle>
              <DialogDescription>
                Fill up the following fields to add a violation in the list of
                violations.
              </DialogDescription>
            </DialogHeader>

            <Stack spacing="20px" my="1.5rem">
              {/* Violation Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Violation Title:
                    </FormLabel>
                    <Input
                      size="sm"
                      fontWeight="semibold"
                      type="string"
                      placeholder="ex. Unauthorized Commercial or Business Activities"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              {/* Violation Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Description:
                    </FormLabel>
                    <Textarea
                      fontFamily="font.body"
                      placeholder="Write something..."
                      fontSize="sm"
                      {...field}
                      resize="none"
                    />
                  </FormControl>
                )}
              />

              {/* Violation Penalty Fee */}
              {/* <FormField
                  control={form.control}
                  name='fee'
                  render={({ field }) => (
                    <FormControl isRequired>
                      <FormLabel fontSize='sm' fontWeight='semibold'>
                        Penalty Fee:
                      </FormLabel>
                      <Flex
                        fontFamily='font.body'
                        fontSize='md'
                        alignItems='center'
                        gap='5px'
                      >
                        <Text>₱</Text>
                        <Input
                          size='md'
                          fontWeight='semibold'
                          placeholder='XXX'
                          type='number'
                          textAlign='right'
                          w='min-content'
                          {...field}
                        />
                      </Flex>
                    </FormControl>
                  )}
                /> */}

              {/* Violation Levels and Penalty Fees*/}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="semibold">
                  Violation Levels and Penalty Fees
                </FormLabel>
                <TableContainer mx="1rem">
                  <Table size="xs" variant="simple" fontFamily="font.body">
                    <Thead>
                      <Tr>
                        <Th fontSize="xs" fontFamily="font.body">
                          Violation Level
                        </Th>
                        <Th
                          fontSize="xs"
                          fontFamily="font.body"
                          textAlign="center"
                        >
                          Penalty Fee
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody fontSize="sm" fontFamily="font.body">
                      <FormField
                        control={form.control}
                        name="firstOffense"
                        render={({ field }) => (
                          <Tr>
                            {/* Violation Level */}
                            <Td pl="0.5rem">First Offense:</Td>
                            {/* Penalty Fee */}
                            <Td textAlign="center">
                              ₱{" "}
                              <Input
                                type="number"
                                textAlign="right"
                                w="8rem"
                                size="sm"
                                placeholder="XXX"
                                {...field}
                              />
                            </Td>
                          </Tr>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="secondOffense"
                        render={({ field }) => (
                          <Tr>
                            {/* Violation Level */}
                            <Td pl="0.5rem">Second Offense:</Td>
                            {/* Penalty Fee */}
                            <Td textAlign="center">
                              ₱{" "}
                              <Input
                                type="number"
                                textAlign="right"
                                w="8rem"
                                size="sm"
                                placeholder="XXX"
                                {...field}
                              />
                            </Td>
                          </Tr>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="thirdOffense"
                        render={({ field }) => (
                          <Tr>
                            {/* Violation Level */}
                            <Td pl="0.5rem">Third Offense:</Td>
                            {/* Penalty Fee */}
                            <Td textAlign="center">
                              ₱{" "}
                              <Input
                                type="number"
                                textAlign="right"
                                w="8rem"
                                size="sm"
                                placeholder="XXX"
                                {...field}
                              />
                            </Td>
                          </Tr>
                        )}
                      />
                    </Tbody>
                  </Table>
                </TableContainer>
                <FormHelperText
                  fontFamily="font.body"
                  fontSize="xs"
                  textAlign="justify"
                >
                  Please enter the corresponding penalty fees for each level of
                  offense for this violation.
                </FormHelperText>
              </FormControl>
            </Stack>

            <DialogFooter className="text-right">
              <FormControl>
                {/* Submit Button */}
                <Button size="sm" colorScheme="yellow" type="submit">
                  Add Violation Type
                </Button>
              </FormControl>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
