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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  AccordionIcon,
  useToast
} from '@chakra-ui/react'
import AddDisputeButton from './_components/AddDisputeButton'
import EditDisputeButton from './_components/EditDisputeButton'
import { DeleteIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Link from 'next/link'

export default function ListOfDisputes () {
  const title = "List of Homeowners' Association Disputes"
  const description =
    "View the list of disputes that can be reported with the homeowners' association. Possible fees are included for each dispute type."
  const disputeTypes = [
    {
      title: 'Neighbor-to-Neighbor Conflicts',
      description:
        'Issues that arise between neighbors, such as boundary disputes, property damage, or personal disagreements that escalate to involve the homeowner association.',
      fees: [
        {
          name: 'Mediation or Arbitration Fees',
          cost: '₱ 500'
        },
        {
          name: 'Administrative Fees',
          cost: '₱ 200'
        },
        {
          name: 'Legal Fees',
          cost: '₱ 800'
        },
        {
          name: 'Violation Fees',
          cost: 'Cost may vary'
        }
      ]
    },
    {
      title: 'Lease Restrictions',
      description:
        'Conflicts involving the rental of properties in the HOA, including issues related to short-term rentals, tenant behavior, or restrictions on leasing properties.',
      fees: [
        {
          name: 'Mediation or Arbitration Fees',
          cost: '₱ 500'
        },
        {
          name: 'Administrative Fees',
          cost: '₱ 200'
        },
        {
          name: 'Legal Fees',
          cost: '₱ 800'
        },
        {
          name: 'Violation Fees',
          cost: 'Cost may vary'
        }
      ]
    },
    {
      title: 'Common Area Maintenance Issues',
      description:
        'Disputes over the upkeep, repair, or use of common areas within the community. Homeowners may disagree with how these areas are maintained or how funds are allocated for their maintenance.',
      fees: [
        {
          name: 'Mediation or Arbitration Fees',
          cost: '₱ 500'
        },
        {
          name: 'Administrative Fees',
          cost: '₱ 200'
        },
        {
          name: 'Legal Fees',
          cost: '₱ 800'
        },
        {
          name: 'Violation Fees',
          cost: 'Cost may vary'
        }
      ]
    },
    {
      title: 'Rule Enforcement and Fines',
      description:
        'Disagreements over the enforcement of HOA rules and the imposition of fines. Homeowners might contest the fairness or consistency of rule enforcement.',
      fees: [
        {
          name: 'Mediation or Arbitration Fees',
          cost: '₱ 500'
        },
        {
          name: 'Administrative Fees',
          cost: '₱ 200'
        },
        {
          name: 'Legal Fees',
          cost: '₱ 800'
        },
        {
          name: 'Violation Fees',
          cost: 'Cost may vary'
        }
      ]
    },
    {
      title: 'Board Decisions and Elections',
      description:
        'Disputes related to the actions or decisions of the HOA board, including disagreements over election processes or the behavior of board members.',
      fees: [
        {
          name: 'Mediation or Arbitration Fees',
          cost: '₱ 500'
        },
        {
          name: 'Administrative Fees',
          cost: '₱ 200'
        },
        {
          name: 'Legal Fees',
          cost: '₱ 800'
        },
        {
          name: 'Violation Fees',
          cost: 'Cost may vary'
        }
      ]
    }
  ]

  const [disputes, setDisputes] = useState([...disputeTypes])

  const removeDispute = (titleToRemove: string) => {
    const updatedDisputes = disputes.filter(
      dispute => dispute.title !== titleToRemove
    )
    setDisputes(updatedDisputes)
  }

  const toast = useToast()

  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading title={title} description={description} />
        <Stack direction='row' spacing='3'>
          <AddDisputeButton />
          <Button size='sm' colorScheme='gray' as={Link} href='/admin/disputes'>
            Go Back
          </Button>
        </Stack>
      </Flex>
      <Separator className='mt-4 mb-6' />
      <Box w='100%' h='75vh' overflowY='auto'>
        <SimpleGrid columns={3} spacing={5} px={2}>
          {disputes.map(dispute => (
            <Card key={dispute.title} pb={3}>
              <Stack>
                <CardHeader pb='0'>
                  <HStack justifyContent='space-between' align='end'>
                    {/* Dispute Title */}
                    <Text size='md' fontWeight='bold' fontFamily='font.heading'>
                      {dispute.title}
                    </Text>
                    <ButtonGroup>
                      {/* Edit Dispute Button */}
                      <EditDisputeButton
                        key={dispute.title}
                        title={dispute.title}
                        description={dispute.description}
                        fees={dispute.fees}
                      />
                      {/* Delete Dispute Button */}
                      <Button
                        key={dispute.title}
                        size='sm'
                        mr='10px'
                        colorScheme='red'
                        onClick={() => {
                          removeDispute(dispute.title)
                          toast({
                            title: `Successfully deleted dispute type`,
                            description: ` ${dispute.title}`,
                            status: 'success',
                            position: 'bottom-right',
                            isClosable: true,
                            colorScheme: 'red'
                          })
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
                  </HStack>
                </CardHeader>
                <CardBody pt={3} minH='100px'>
                  {/* Dispute Description */}
                  <Text
                    fontSize='sm'
                    fontFamily='font.body'
                    textAlign='justify'
                  >
                    {dispute.description}
                  </Text>
                </CardBody>
              </Stack>

              {/* View Possible Fees */}
              <Accordion key={dispute.title} allowToggle>
                <AccordionItem key={dispute.title} border='0' m='0' p='0'>
                  <AccordionButton
                    key={dispute.title}
                    justifyContent='space-between'
                  >
                    <Text fontSize='sm' fontFamily='font.body' as='u'>
                      View possible fees
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    key={dispute.title}
                    mx={4}
                    px={4}
                    pt={2}
                    pb={5}
                    borderRadius={5}
                  >
                    {/* Fees Table */}
                    {dispute.fees ? (
                      <TableContainer>
                        <Table
                          size='xs'
                          w='300px'
                          key={dispute.title}
                          fontFamily='font.body'
                        >
                          <Thead>
                            <Tr>
                              <Th fontSize='xs' fontFamily='font.body'>
                                Fees
                              </Th>
                              <Th />
                            </Tr>
                          </Thead>
                          <Tbody fontSize='sm' fontFamily='font.body'>
                            {dispute.fees.map((fee, index) => (
                              <Tr key={index}>
                                <Td>{fee.name}</Td>
                                <Td
                                  isNumeric
                                  color={
                                    fee.cost !== 'Cost may vary'
                                      ? 'black'
                                      : 'lightgrey'
                                  }
                                >
                                  {fee.cost}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Text fontSize='sm' fontFamily='font.body' color='grey'>
                        No fees available for this dispute.
                      </Text>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  )
}
