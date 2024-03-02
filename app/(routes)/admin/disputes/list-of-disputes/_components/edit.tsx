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
  FormHelperText,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function EditDispute() {
  let [description, setDescription] = useState("");

  let handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputDescription = e.target.value;
    setDescription(inputDescription);
  };
  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" mr="5px">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Edit (Display Dispute Name) </DialogTitle>
            <DialogDescription>Fill up the following fields.</DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing="15px" my="2rem">
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Title:
              </FormLabel>
              <Input
                size="md"
                fontWeight="semibold"
                type="string"
                placeholder="Enter a Title"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Description:
              </FormLabel>
              <Textarea
                placeholder="Write something..."
                id="description"
                fontSize="xs"
                maxH="300px"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
          </Stack>

          <DialogFooter>
            <Button
              w="full"
              size="sm"
              colorScheme="yellow"
              type="submit"
              // onClick={() => onSubmit()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
