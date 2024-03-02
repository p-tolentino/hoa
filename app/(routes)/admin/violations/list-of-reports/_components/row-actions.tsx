"use client";

import { Button, Flex } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function RowActions() {
  return (
    <Flex gap={2}>
      {/* Resolve Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" colorScheme="green">
            Resolve
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resolve Violation</AlertDialogTitle>
            <AlertDialogDescription>
              This action resolves the violation report submitted by the
              homeowner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[green]">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Decline Button
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button colorScheme="red">Decline</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Request to Post</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete this post from the list of pending posts
              and will not appear in the Community Engagement module.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[red]">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </Flex>
  );
}
