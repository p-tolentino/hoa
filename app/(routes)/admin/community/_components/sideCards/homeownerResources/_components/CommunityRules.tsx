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
      title: 'Respectful Communication',
      description:
        'Always communicate with respect towards others, regardless of differing opinions. Personal attacks, hate speech, or discriminatory language will not be tolerated.'
    },
    {
      title: 'Relevant Content',
      description:
        'Keep discussions relevant to the specific forum topic. For instance, business-related content should be posted in the Business Forum, and event-related discussions should go in the Events section.'
    },
    {
      title: 'No Spam or Advertising',
      description:
        'Avoid posting unsolicited advertisements or spam. The community platform is for discussion and information sharing, not commercial promotion unless explicitly allowed in certain sections.'
    },
    {
      title: 'Privacy and Confidentiality',
      description:
        'Respect the privacy of others. Do not share personal information without consent, and always be mindful of the confidentiality of discussions when required.'
    },
    {
      title: 'Constructive Polls and Surveys',
      description:
        'When creating polls and surveys, ensure they are constructed in a manner that is respectful, inclusive, and beneficial for community insights. Avoid leading questions or biased options.'
    },
    {
      title: 'Event Participation Etiquette',
      description:
        'For community events, whether online or in-person, participants are expected to be courteous, arrive on time, and contribute positively to the event’s objectives.'
    }
  ];
  const title = 'Community Rules'
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
            <AlertDialogTitle className='text-2xl'>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <ScrollArea className='h-80 w-full rounded-md'>
            <List spacing={3} fontSize='md'>
              {rules.map((rule, index) => (
                <ListItem key={index}>
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
