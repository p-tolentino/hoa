'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { List, ListItem, ListIcon, Flex, Box } from '@chakra-ui/react'

import { Link, Text } from '@chakra-ui/react'

export function CommunityRules () {
  const rules = [
    {
      title: 'Rule Title',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate veritatis optio corporis voluptatibus velit quas voluptates praesentium, doloribus id vitae.'
    },
    {
      title: 'Rule Title',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate veritatis optio corporis voluptatibus velit quas voluptates praesentium, doloribus id vitae.'
    },
    {
      title: 'Rule Title',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate veritatis optio corporis voluptatibus velit quas voluptates praesentium, doloribus id vitae.'
    },
    {
      title: 'Rule Title',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate veritatis optio corporis voluptatibus velit quas voluptates praesentium, doloribus id vitae.'
    },
    {
      title: 'Rule Title',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate veritatis optio corporis voluptatibus velit quas voluptates praesentium, doloribus id vitae.'
    }
  ]

  const description =
    "To continue, please read the following Community Rules carefully. Understanding and agreeing to these rules will contribute to a healthy community engagement platform within the Homeowners' Association."
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Link fontSize='sm'>Community Rules</Link>
        </AlertDialogTrigger>
        <AlertDialogContent className='lg:min-w-[1000px]'>
          <AlertDialogHeader className='mb-3'>
            <AlertDialogTitle className='text-2xl'>
              Community Rules
            </AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <ScrollArea className='h-80 w-full rounded-md'>
            <List spacing={3} fontSize='md'>
              {rules.map(rule => (
                <ListItem>
                  <Flex>
                    <ListIcon
                      as={ArrowRightIcon}
                      color='yellow.500'
                      boxSize={4}
                    />
                    <Box>
                      <Text fontSize='lg' fontWeight='bold' mb='0.5rem'>
                        {rule.title}
                      </Text>
                      <Text>{rule.description}</Text>
                    </Box>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </ScrollArea>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Text w='full'>
                I have read and agreed to the
                <Text as='span' color='yellow.300'>
                  {' '}
                  Community Rules
                </Text>
              </Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
