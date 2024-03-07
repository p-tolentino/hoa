'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import {
  Stack,
  Text,
  SimpleGrid,
  Flex,
  Box,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast
} from '@chakra-ui/react'
import AddViolationButton from './_components/AddViolationButton'
import EditViolationButton from './_components/EditViolationButton'
import DeleteViolationButton from './_components/DeleteViolationButton'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

export default function ListOfViolations () {
  const title = "List of Homeowners' Association Violations"
  const description =
    "View the list of violations that can be reported within the Homeowners' Association. Corresponding penalties for each violation type is included."
  const violationTypes = [
    {
      title: 'Delinquent Payments',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Breach of Construction',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Unauthorized Commercial Establishment',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Parking Violations',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Speed Limit',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Raising of Animals/Fowls',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Noise Complaints',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Open Fires',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Defective Water Meters',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Littering',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    },
    {
      title: 'Stray Pets',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae',
      penaltyFee: '500'
    }
  ]

  const [violations, setViolations] = useState([...violationTypes])

  const removeViolation = (titleToRemove: string) => {
    const updatedViolations = violations.filter(
      violation => violation.title !== titleToRemove
    )
    setViolations(updatedViolations)
  }

  const toast = useToast()

  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading title={title} description={description} />
        <Stack direction='row' spacing='3'>
          <AddViolationButton />
          <Button
            size='sm'
            colorScheme='gray'
            as={Link}
            href='/admin/violations'
          >
            Go Back
          </Button>
        </Stack>
      </Flex>
      <Separator className='mt-4 mb-6' />
      <Flex gap={10} mr={5}>
        <Flex flexGrow={3}>
          <ScrollArea className='h-[75vh] pr-5'>
            <SimpleGrid columns={3} spacing={5} px={2}>
              {violations.map(violation => (
                <Card key={violation.title} pb={3}>
                  <Stack>
                    <CardHeader pb='0'>
                      <HStack justifyContent='space-between' align='end'>
                        {/* Violation Title */}
                        <Text
                          size='md'
                          fontWeight='bold'
                          fontFamily='font.heading'
                        >
                          {violation.title}
                        </Text>
                        <ButtonGroup>
                          {/* Edit Violation Button */}
                          <EditViolationButton
                            key={violation.title}
                            title={violation.title}
                            description={violation.description}
                          />
                          {/* Delete Violation Button */}
                          <DeleteViolationButton
                            violation={violation}
                            continueDeletion={confirmed => {
                              if (confirmed) {
                                removeViolation(violation.title)
                              }
                            }}
                          />
                        </ButtonGroup>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={3} minH='100px'>
                      {/* Violation Description */}
                      <Text
                        fontSize='sm'
                        fontFamily='font.body'
                        textAlign='justify'
                      >
                        {violation.description}
                      </Text>
                      {/* Penalty Fee */}
                      <Text fontSize='xl' fontWeight='bold' mt='1rem'>
                        ₱ {violation.penaltyFee}
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Flex>
      </Flex>
    </>
  )
}
