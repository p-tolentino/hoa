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
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

export default function AddDispute() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feesList, setFeesList] = useState([{ name: "", cost: "" }]);

  const handleAddFee = () => {
    setFeesList([...feesList, { name: "", cost: "" }]);
  };

  const handleRemoveFee = (index: number) => {
    const updatedFeesList = [...feesList];
    updatedFeesList.splice(index, 1);
    setFeesList(updatedFeesList);
  };

  const handleFeeNameChange = (index: number, value: string) => {
    const updatedFeesList = [...feesList];
    updatedFeesList[index].name = value;
    setFeesList(updatedFeesList);
  };

  const handleCostChange = (index: number, value: string) => {
    const updatedFeesList = [...feesList];
    updatedFeesList[index].cost = value;
    setFeesList(updatedFeesList);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" colorScheme="yellow">
          <AddIcon boxSize={3} mr="10px" />
          Add Dispute
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Add a Dispute</DialogTitle>
            <DialogDescription>
              Fill up the following fields to add a dispute in the list of
              disputes.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing="15px" my="2rem">
            {/* Dispute Title */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Dispute Title:
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

            {/* Dispute Description */}
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
                  {feesList.map((fee, index) => (
                    <Tr key={index}>
                      <Td>
                        <Input
                          size="sm"
                          placeholder="Enter a Fee Name"
                          value={fee.name}
                          onChange={(e) =>
                            handleFeeNameChange(index, e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        <Input
                          size="sm"
                          placeholder="Enter a Cost"
                          value={fee.cost}
                          onChange={(e) =>
                            handleCostChange(index, e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        {feesList.length > 1 && index !== 0 && (
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
              Add Dispute
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
