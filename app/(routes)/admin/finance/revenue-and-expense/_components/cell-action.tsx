"use client";

import {
  //Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NewTransactionForm from "./NewTransactionForm";
import { AddIcon } from "@chakra-ui/icons";
import {
  LuFileEdit as Edit,
  LuCopy as Copy,
  LuTrash as Trash,
  LuMoreHorizontal as MoreHorizontal,
} from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { TransactionColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useSession } from "next-auth/react";
import { deleteProperty } from "@/server/actions/property";

import {
  createTransaction,
  updateFunds,
} from "@/server/actions/hoa-transaction";

interface CellActionProps {
  data: TransactionColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    console.log("Property ID copied to the clipboard.");
  };

  const onDelete = async (id: string) => {
    startTransition(() => {
      deleteProperty(id)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          }

          if (data.success) {
            update();
            setOpen(false);
            router.refresh();
            console.log(data.success);
          }
        })
        .catch(() => {
          console.log("Something went wrong.");
        });
    });
  };

  const formTitle = "Edit Transaction";
  const formInstructions =
    "Please edit out the following fields to submit a new transaction.";

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSuccess = () => {
    onClose(); // This uses the onClose function from useDisclosure to close the modal
  };

  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={onClose} motionPreset='scale'>
        <ModalOverlay />
        <ModalContent pt={'10px'} pb={'1.5rem'}>
          <ModalHeader>
            <ModalCloseButton />
            <Heading size='md' fontFamily={'font.heading'}>
              {formTitle}
            </Heading>
            <Text fontSize='sm' fontFamily={'font.body'}>
              {formInstructions}
            </Text>
          </ModalHeader>
          <ModalBody>
            <NewTransactionForm onSuccess={handleSuccess} currentFunds={currentFunds}/>
          </ModalBody>
        </ModalContent>
      </Modal> */}

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="w-4 h-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              //router.push(`/${params.storeId}/products/${data.id}`)
              console.log("TRIGGER GO TO EDIT")
            }
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='w-4 h-4 mr-2' />
            Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
