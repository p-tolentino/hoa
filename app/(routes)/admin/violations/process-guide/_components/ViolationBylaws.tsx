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
  Text,
  Link
} from '@chakra-ui/react'

export default function ViolationBylaws () {
  const title = "Homeowners' Association Bylaws (Violation Section)"
  const description =
    "View the violation section of the Homeowners' Association Bylaws."

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Link
        fontFamily='font.body'
        onClick={() => onOpen()}
        color='blue.500'
        size='sm'
        textDecoration='underline'
      >
        Homeowners' Association Bylaws
      </Link>

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
    </>
  )
}
