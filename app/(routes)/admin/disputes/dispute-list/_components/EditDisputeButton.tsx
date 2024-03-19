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
import { DisputeType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  DisputeTypeFormSchema,
  DisputeTypeFormValues,
} from "./AddDisputeButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDisputeTypeByName } from "@/server/data/dispute-type";
import { updateDisputeType } from "@/server/actions/dispute-type";
import { Form, FormField } from "@/components/ui/form";

interface EditDisputeButtonProps {
  dispute: DisputeType;
}

const EditDisputeButton: React.FC<EditDisputeButtonProps> = ({ dispute }) => {
  const router = useRouter();

  const form = useForm<DisputeTypeFormValues>({
    resolver: zodResolver(DisputeTypeFormSchema),
    defaultValues: {
      title: dispute.title,
      description: dispute.description,
    },
  });

  const onSubmit = async (values: DisputeTypeFormValues) => {
    await updateDisputeType(values, dispute.id)
      .then((data) => {
        if (data.success) {
          toast({
            title: `Successfully edited dispute type "${form.watch(
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
              <DialogTitle>Edit a Dispute Type</DialogTitle>
              <DialogDescription>
                You may edit the description of your selected dispute.
              </DialogDescription>
            </DialogHeader>

            {/* Form Content */}
            <Stack spacing="15px" my="2rem">
              {/* Dispute Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Dispute Title:
                    </FormLabel>
                    <Input
                      size="md"
                      fontWeight="semibold"
                      type="string"
                      placeholder="Enter a Title"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              {/* Dispute Description */}
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
                      resize="none"
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
export default EditDisputeButton;
