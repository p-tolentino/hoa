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
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

export default function AddViolation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        <form action="">
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
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Violation Title:
              </FormLabel>
              <Input
                size="md"
                fontWeight="semibold"
                type="string"
                placeholder="Enter a Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            {/* Violation Description */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Description:
              </FormLabel>
              <Textarea
                fontFamily="font.body"
                placeholder="Write something..."
                fontSize="sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                resize="none"
              />
            </FormControl>
          </Stack>

          <DialogFooter className="text-right">
            <FormControl>
              <Button
                size="sm"
                colorScheme="yellow"
                type="submit"
                onClick={() =>
                  toast({
                    title: `Successfully added a violation type to the list of HOA disputes.`,
                    description: `${title}`,
                    status: "success",
                    position: "bottom-right",
                    isClosable: true,
                  })
                }
              >
                Add Violation
              </Button>
            </FormControl>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
