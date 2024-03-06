'use client'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
  Text
} from '@chakra-ui/react'

export default function DisputeBylaws () {
  const title = "Homeowners' Association Bylaws (Dispute Section)"
  const description =
    "View the dispute section of the Homeowners' Association Bylaws."

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Button
        variant='link'
        fontFamily='font.body'
        fontWeight='light'
        onClick={() => onOpen()}
        key='Bylaws'
        color='black'
        size='sm'
        textDecoration='underline'
      >
        View {title}
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} placement='right' size='xl'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt='10px'>
            <Heading size='md' fontFamily='font.heading'>
              {title}
            </Heading>
            <Text fontSize='xs'>{description}</Text>
          </DrawerHeader>
          <DrawerBody>
            <object
              data='/documents/HOA-Bylaws-2023.pdf'
              type='application/pdf'
              width='100%'
              height='900px'
            ></object>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
