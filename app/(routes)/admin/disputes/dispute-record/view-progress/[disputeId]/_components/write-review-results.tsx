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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createOfficerTasks, updateDispute } from "@/server/actions/dispute";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Box,
} from "@chakra-ui/react";
import { Dispute, PersonalInfo, ReportStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WriteReviewResults({
  dispute,
  committee,
}: {
  dispute: Dispute;
  committee: PersonalInfo[];
}) {
  const [isOpen, setIsOpen] = useState(false); // Dialog open state
  const [selectedMember, setSelectedMember] = useState("");
  const [review, setReview] = useState("");

  const router = useRouter();

  const [keyActivities, setKeyActivities] = useState([
    { activity: "", dueDate: "" },
  ]);

  const handleAddRow = () => {
    setKeyActivities([...keyActivities, { activity: "", dueDate: "" }]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedActivities = [...keyActivities];
    updatedActivities.splice(index, 1);
    setKeyActivities(updatedActivities);
  };

  const onSubmit = async () => {
    const formData = {
      committeeReview: review,
      status: ReportStatus.PENDING_LETTER_TO_BE_SENT,
      officerAssigned: selectedMember,
      commReviewDate: new Date(),
      progress: "Step 4: Send out Dispute Letter",
      step: 4,
    };

    await updateDispute(dispute.id, formData).then((data) =>
      console.log(data.success)
    );
    await keyActivities.map((activity) => {
      const data = {
        disputeId: dispute.id,
        title: activity.activity,
        deadline: new Date(activity.dueDate),
      };
      createOfficerTasks(data).then((data) => {
        console.log(data.success);
        setIsOpen(false);
      });
    });
    router.refresh();
    router.push(`/admin/disputes/dispute-record/view-progress/${dispute.id}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          Write Case Review Results
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Write Case Review Results</DialogTitle>
            <DialogDescription>
              Fill out the following fields as a guide to write the case review
              results formulated by the committee.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing={5} mt="0.5rem">
            <FormControl isRequired>
              <Stack spacing={2}>
                <Textarea
                  fontSize="sm"
                  fontFamily="font.body"
                  placeholder="Provide a brief review of the report..."
                  resize="none"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack spacing={2}>
                <Box>
                  <FormLabel fontSize="sm" fontWeight="semibold" mb="0">
                    Assign Officer
                  </FormLabel>
                  <Text fontSize="sm" fontFamily="font.body">
                    Please select a Grievance and Adjudication Officer to
                    oversee the resolution of this violation case.
                  </Text>
                </Box>
                <Select
                  value={selectedMember}
                  onValueChange={setSelectedMember}
                >
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Select committee member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {committee.map((member) => (
                        <SelectItem key={member.userId} value={member.userId}>
                          {member.firstName} {member.lastName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack spacing={2}>
                <Box>
                  <FormLabel fontSize="sm" fontWeight="semibold" mb="0">
                    Key Activities and Due Dates
                  </FormLabel>
                  <Text fontSize="sm" fontFamily="font.body">
                    Please enter the key activities and its corresponding due
                    dates to enforce immediate actions for this violation case.
                  </Text>
                </Box>
                <TableContainer
                  mx="1rem"
                  mt="0.5rem"
                  overflowY="auto"
                  h="120px"
                >
                  <Table size="xs" variant="simple" fontFamily="font.body">
                    <Thead>
                      <Tr>
                        <Th fontSize="xs" fontFamily="font.body" w="full">
                          Activity
                        </Th>
                        <Th fontSize="xs" fontFamily="font.body">
                          Due Date
                        </Th>
                        <Th px="10px">
                          {/* Add Row Button */}
                          <Button size="xs" onClick={handleAddRow}>
                            <AddIcon />
                          </Button>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody fontSize="sm" fontFamily="font.body">
                      {keyActivities.map((activity, index) => (
                        <Tr key={index}>
                          {/* Activity Input */}
                          <Td>
                            <Input
                              type="text"
                              fontSize="sm"
                              w="95%"
                              value={activity.activity}
                              onChange={(e) => {
                                const updatedActivities = [...keyActivities];
                                updatedActivities[index].activity =
                                  e.target.value;
                                setKeyActivities(updatedActivities);
                              }}
                            />
                          </Td>
                          {/* Due Date Input */}
                          <Td>
                            <Input
                              type="date"
                              fontSize="sm"
                              value={activity.dueDate}
                              onChange={(e) => {
                                const updatedActivities = [...keyActivities];
                                updatedActivities[index].dueDate =
                                  e.target.value;
                                setKeyActivities(updatedActivities);
                              }}
                            />
                          </Td>
                          {/* Delete Button */}
                          {index > 0 && (
                            <Td textAlign="center">
                              <Button
                                size="xs"
                                colorScheme="red"
                                onClick={() => handleRemoveRow(index)}
                              >
                                <DeleteIcon />
                              </Button>
                            </Td>
                          )}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Stack>
            </FormControl>
          </Stack>
          <DialogFooter>
            <Button
              size="sm"
              colorScheme="yellow"
              type="button"
              onClick={() => onSubmit()}
            >
              Finish Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
