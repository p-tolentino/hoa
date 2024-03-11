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
import { EditIcon } from "@chakra-ui/icons";
import { ViolationType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  ViolationTypeFormSchema,
  ViolationTypeFormValues,
} from "./AddViolationButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { getViolationTypeByName } from "@/server/data/violation-type";
import { updateViolationType } from "@/server/actions/violation-type";
import { Form, FormField } from "@/components/ui/form";

interface EditViolationButtonProps {
  violation: ViolationType;
}

const EditViolationButton: React.FC<EditViolationButtonProps> = ({
  violation,
}) => {
  const router = useRouter();

  const form = useForm<ViolationTypeFormValues>({
    resolver: zodResolver(ViolationTypeFormSchema),
    defaultValues: {
      name: violation.name,
      title: violation.title,
      description: violation.description,
      fee: violation.fee.toString(),
      deadline: violation.deadline.toString(),
    },
  });

  const onSubmit = async (values: ViolationTypeFormValues) => {
    const existingViolationName = await getViolationTypeByName(values.name);

    if (existingViolationName && existingViolationName.id !== violation.id) {
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
      await updateViolationType(values, violation.id)
        .then((data) => {
          if (data.success) {
            toast({
              title: `Successfully edited violation type "${form.watch(
                "title"
              )}" to the list of HOA disputes.`,
              status: "info",
              position: "bottom-right",
              isClosable: true,
            });
          }
        })
        .then(() => {
          form.reset();
          router.refresh();
        });
    }
  };

  const toast = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" mr="5px">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit a Violation </DialogTitle>
              <DialogDescription>
                You may edit the description of your selected violation.
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
                      Title:
                    </FormLabel>
                    <Input
                      size="md"
                      fontWeight="semibold"
                      type="string"
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
                      placeholder="Write something..."
                      fontSize="sm"
                      fontFamily="font.body"
                      maxH="300px"
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

            <DialogFooter>
              <Button size="sm" colorScheme="yellow" type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditViolationButton;
