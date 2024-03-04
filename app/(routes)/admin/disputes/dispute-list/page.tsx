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
import AddDisputeButton from './_components/AddDisputeButton'
import EditDisputeButton from './_components/EditDisputeButton'
import { DeleteIcon } from '@chakra-ui/icons'

export default function ListOfDisputes () {
  const title = 'List of Common Association Disputes'
  const description =
    'View the list of common disputes occurence in a homeowners association.'
  const commonDisputes = [
    {
      title: 'Neighbor-to-Neighbor Conflicts',
      description:
        'Issues that arise between neighbors, such as boundary disputes, property damage, or personal disagreements that escalate to involve the homeowner association.'
    },
    {
      title: 'Lease Restrictions',
      description:
        'Conflicts involving the rental of properties in the HOA, including issues related to short-term rentals, tenant behavior, or restrictions on leasing properties.'
    },
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

  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading title={title} description={description} />
        <AddDisputeButton />
      </Flex>
      <Separator className='mt-4 mb-6' />
      <SimpleGrid columns={3} spacing={5} px={2}>
        {commonDisputes.map(dispute => (
          <Card key={dispute.title} pb={3}>
            <CardHeader pb='0'>
              <HStack justifyContent='space-between' align='end'>
                <Text size='md' fontWeight='bold' fontFamily='font.heading'>
                  {dispute.title}
                </Text>
                <ButtonGroup>
                  <EditDisputeButton
                    key={dispute.title}
                    title={dispute.title}
                    description={dispute.description}
                  />
                  <Button size='sm' mr='10px' colorScheme='red'>
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </HStack>
            </CardHeader>
            <CardBody pt={3}>
              <Text fontSize='sm' fontFamily='font.body'>
                {dispute.description}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  )
}
