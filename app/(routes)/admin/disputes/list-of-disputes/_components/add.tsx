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
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function AddDispute() {
  let [description, setDescription] = useState("");

  let handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputDescription = e.target.value;
    setDescription(inputDescription);
  };

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          <AddIcon boxSize={3} mr="10px" />
          Add a Common Dispute
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Add a Common Dispute</DialogTitle>
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
              <FormHelperText fontFamily="font.body">
                Input a title for the common dispute.
              </FormHelperText>
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
              <FormHelperText fontFamily="font.body">
                Input a description for the common dispute.
              </FormHelperText>
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
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
