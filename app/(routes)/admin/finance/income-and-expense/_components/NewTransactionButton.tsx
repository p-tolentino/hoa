'use client'

import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import NewTransactionForm from './NewTransactionForm'
import { AddIcon } from '@chakra-ui/icons'

export default function NewTransactionFormButton () {
  // Form Title and instructions
  const formTitle = 'New Transaction'
  const formInstructions =
    'Please fill out the following fields to submit a new transaction.'

  // Modal functions
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      {/* Button */}
      <Button colorScheme='yellow' mb='10px' onClick={() => onOpen()}>
        <AddIcon mr='10px' />
        <Text fontSize={'lg'} fontFamily={'font.body'}>
          {formTitle}
        </Text>
      </Button>

      {/* Modal when button is clicked */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='scale'>
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
            <NewTransactionForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
