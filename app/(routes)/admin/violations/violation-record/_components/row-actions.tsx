"use client";

import { Button, Text, useToast, Box, HStack, Link } from "@chakra-ui/react";
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

import { ListOfViolationsColumn } from "./columns";
import { useEffect, useState } from "react";
import { getViolationTypeByName } from "@/server/data/violation-type";
import { PersonalInfo, ViolationType } from "@prisma/client";
import { updateOfficerAssigned } from "@/server/actions/violation";

interface RowActionProps {
  data: ListOfViolationsColumn;
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  const toast = useToast();
  const [violation, setViolation] = useState<ViolationType | null>();
  const [commMembers, setCommMembers] = useState<PersonalInfo | null>();

  useEffect(() => {
    const fetchViolationType = async () => {
      try {
        await getViolationTypeByName(data.type).then((violation) =>
          setViolation(violation)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchViolationType();
  }, []);

  const setOfficer = async (data: ListOfViolationsColumn) => {
    await updateOfficerAssigned(data.id, data.officerAssigned).then((data) => {
      if (data.success) {
        console.log(data.success);
      }
    });
  };

  return (
    <div>
      {/* Status: PENDING = Button: Take Case */}
      {data.status === "Pending" && (
        <Button
          size="sm"
          as={Link}
          _hover={{ textDecoration: "none" }}
          href={`/admin/violations/violation-record/view-progress/${data.id}`}
          onClick={() => setOfficer(data)}
        >
          Take Case
        </Button>
      )}

      {/* Status: REVIEW or AWAITING PAYMENT = Button: Mark as Resolved */}
      {/* // !! ADD CHECKING FOR PROGRESS BEFORE MARKING AS RESOLVED */}
      {(data.status === "Under Review" ||
        data.status === "Awaiting Payment") && (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" colorScheme="green">
                Mark as Resolved
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Resolve Violation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure that the violation #V00{data.id} has been
                  resolved?
                  <Text mt="1rem">
                    Submitted by:{" "}
                    <span className="font-semibold">{data.submittedBy}</span>{" "}
                    <br />
                    Date received:{" "}
                    <span className="font-semibold">{data.createdAt}</span>
                  </Text>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Box mt={2}>
                <HStack>
                  <Text fontSize="md" fontWeight="semibold">
                    {violation?.title} Penalty:
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    className="text-red-700"
                  >
                    ₱ {violation?.fee}
                  </Text>
                </HStack>
              </Box>
              <AlertDialogFooter>
                <AlertDialogCancel className="mt-0 hover:bg-gray-100">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-700 hover:bg-green-900"
                  onClick={() =>
                    toast({
                      title: `Marked the violation #V000${data.number} as resolved.`,
                      description:
                        "Thank you for offering your services to your homeowners.",
                      status: "success",
                      position: "bottom-right",
                      isClosable: true,
                    })
                  }
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};
