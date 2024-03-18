'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import {
  Stack,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup
} from '@chakra-ui/react'

import AddDisputeButton from './AddDisputeButton'
import EditDisputeButton from './EditDisputeButton'
import DeleteDisputeButton from './DeleteDisputeButton'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { DisputeType } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface DisputeListProps {
  disputes: DisputeType[]
}

export const DisputeList: React.FC<DisputeListProps> = ({ disputes }) => {
  const title = "List of Homeowners' Association Disputes"
  const description =
    "View the list of disputes that can be reported with the homeowners' association. A list of the HOA services available to you is included."
  const disputeTypes = [
    {
      title: 'Common Area Maintenance Issues',
      description:
        'Disputes over the upkeep, repair, or use of common areas within the community. Homeowners may disagree with how these areas are maintained or how funds are allocated for their maintenance.'
    },
    {
      title: 'Rule Enforcement and Fines',
      description:
        'Disagreements over the enforcement of HOA rules and the imposition of fines. Homeowners might contest the fairness or consistency of rule enforcement.'
    },
    {
      title: 'Board Decisions and Elections',
      description:
        'Disputes related to the actions or decisions of the HOA board, including disagreements over election processes or the behavior of board members.'
    }
  ]

  const router = useRouter()

  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading title={title} description={description} />
        <Stack direction={{ md: 'column', lg: 'row' }} spacing='3'>
          <AddDisputeButton />
          <Button size='sm' as={Link} href='/admin/disputes'>
            Go Back
          </Button>
        </Stack>
      </Flex>
      <Separator className='mt-4 mb-6' />
      <Flex flexGrow={3}>
        <ScrollArea className='h-[75vh] pr-5'>
          <SimpleGrid columns={{ md: 1, lg: 3 }} spacing={5} px={2}>
            {disputes.map(dispute => (
              <Card key={dispute.id} pb={3}>
                <Stack>
                  <CardHeader pb='0'>
                    <HStack justifyContent='space-between' align='end'>
                      {/* Dispute Title */}
                      <Text
                        size='md'
                        fontWeight='bold'
                        fontFamily='font.heading'
                      >
                        {dispute.title}
                      </Text>
                      <ButtonGroup>
                        {/* Edit Dispute Button */}
                        <EditDisputeButton dispute={dispute} />
                        {/* Delete Dispute Button */}
                        <DeleteDisputeButton
                          dispute={dispute}
                          continueDeletion={confirmed => {
                            if (confirmed) {
                              router.refresh()
                            }
                          }}
                        />
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
              </Card>
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Flex>
    </>
  )
}

export default DisputeList
