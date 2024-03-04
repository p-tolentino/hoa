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
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface EditDisputeButtonProps {
  title: string;
  description: string;
  fees: { name: string; cost: string }[];
}

const EditDisputeButton: React.FC<EditDisputeButtonProps> = ({
  title: initialTitle,
  description: initialDescription,
  fees: initialFees,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [fees, setFees] = useState(initialFees);

  const handleFeeChange = (
    index: number,
    field: "name" | "cost",
    value: string
  ) => {
    const updatedFees = [...fees];
    updatedFees[index] = { ...updatedFees[index], [field]: value };
    setFees(updatedFees);
  };

  const handleAddFee = () => {
    setFees([...fees, { name: "", cost: "" }]);
  };

  const handleRemoveFee = (index: number) => {
    const updatedFees = [...fees];
    updatedFees.splice(index, 1);
    setFees(updatedFees);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" mr="5px">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Update a Dispute </DialogTitle>
            <DialogDescription>
              You may update the description of your selected dispute.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing="15px" my="2rem">
            {/* Dispute Title */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Title:
              </FormLabel>
              <Input
                size="md"
                fontWeight="semibold"
                type="string"
                value={title}
                disabled
              />
            </FormControl>

            {/* Dispute Description */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Description:
              </FormLabel>
              <Textarea
                placeholder="Write something..."
                fontSize="sm"
                fontFamily="font.body"
                maxH="300px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                resize="none"
              />
            </FormControl>

            {/* Set Possible Fees and Costs*/}
            <TableContainer>
              <Table size="xs" w="80%" fontFamily="font.body">
                <Thead>
                  <Tr>
                    <Th fontSize="xs" fontFamily="font.body">
                      Fees
                    </Th>
                    <Th fontSize="xs" fontFamily="font.body">
                      Costs
                    </Th>
                    <Th>
                      <Button size="xs" onClick={handleAddFee}>
                        <AddIcon />
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody fontSize="sm" fontFamily="font.body">
                  {fees.map((fee, index) => (
                    <Tr key={index}>
                      <Td>
                        <Input
                          size="sm"
                          value={fee.name}
                          onChange={(e) =>
                            handleFeeChange(index, "name", e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        <Input
                          size="sm"
                          value={fee.cost}
                          onChange={(e) =>
                            handleFeeChange(index, "cost", e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        {fees.length > 1 && index !== 0 && (
                          <Button
                            size="xs"
                            colorScheme="red"
                            onClick={() => handleRemoveFee(index)}
                          >
                            <DeleteIcon />
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>

          <DialogFooter>
            <Button size="sm" colorScheme="yellow" type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditDisputeButton;
