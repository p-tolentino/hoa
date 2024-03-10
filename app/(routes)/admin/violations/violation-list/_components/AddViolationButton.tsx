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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { getViolationTypeByName } from "@/server/data/violation-type";
import { createViolationType } from "@/server/actions/violation-type";

export const ViolationTypeFormSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  fee: z.string(),
  deadline: z.string(),
});

export type ViolationTypeFormValues = z.infer<typeof ViolationTypeFormSchema>;

export default function AddViolation() {
  const form = useForm<ViolationTypeFormValues>({
    resolver: zodResolver(ViolationTypeFormSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      fee: "",
      deadline: "",
    },
  });

  const onSubmit = async (values: ViolationTypeFormValues) => {
    const existingViolationName = await getViolationTypeByName(values.name);

    if (existingViolationName) {
      console.log("Existing violation name, try a different one");
      toast({
        title: `Violation Type with identifier "${form.watch(
          "name"
        )}" already exists.`,
        description: `Existing violation name (identifier), try a different one`,
        status: "warning",
        position: "bottom-right",
        isClosable: true,
      });
    } else {
      await createViolationType(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: `Successfully added violation type "${form.watch(
                "title"
              )}" to the list of HOA disputes.`,
              status: "success",
              position: "bottom-right",
              isClosable: true,
            });
          }
        })
        .then(() => form.reset());
    }

    // const formData = {
    //   ...values,
    //   violationDate: new Date(values.violationDate),
    //   personsInvolved: personsInvolved,
    // };
    // createViolationType(formData)
    //   .then((data) => {
    //     console.log(data.success);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const toast = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          <AddIcon boxSize={3} mr="10px" />
          Add Violation
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add a Violation</DialogTitle>
              <DialogDescription>
                Fill up the following fields to add a violation in the list of
                violations.
              </DialogDescription>
            </DialogHeader>

            {/* Form Content */}
            <Stack spacing="15px" my="2rem">
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
                      size="md"
                      fontWeight="semibold"
                      type="string"
                      placeholder="ex. Unauthorized Commercial or Business Activities"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Database Name (Identifier):
                    </FormLabel>
                    <Input
                      size="md"
                      fontWeight="semibold"
                      type="string"
                      placeholder="ex. commercial"
                      {...field}
                    />
                    <FormHelperText>
                      A simpler version of the title for easier identification
                      in the system's database
                    </FormHelperText>
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

              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Penalty Fee:
                    </FormLabel>
                    <Input
                      size="md"
                      fontWeight="semibold"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Deadline of Payment
                    </FormLabel>
                    <Input
                      size="md"
                      fontWeight="semibold"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </Stack>

            <DialogFooter className="text-right">
              <FormControl>
                <Button size="sm" colorScheme="yellow" type="submit">
                  Add Violation
                </Button>
              </FormControl>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
