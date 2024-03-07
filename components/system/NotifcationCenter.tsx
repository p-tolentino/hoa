import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Text
} from '@chakra-ui/react'

import { useState } from 'react'
import { PiBellFill, PiBellRingingFill } from 'react-icons/pi'
import { ScrollArea } from '../ui/scroll-area'
import Link from 'next/link'

interface NotificationCenter {
  isRead: boolean
  title: string
  description: string
  date: string
  onClick: () => void
}

export default function NotificationCenter () {
  const title = 'Notification Center'

  const initialData = [
    {
      isRead: false,
      title: 'Urgent: Dispute Resolution Meeting Notice 📅',
      description:
        'The meeting is scheduled for 1 March 2024, 3:00PM at the HOA Admin Office. Your presence is crucial for resolving this matter.',
      date: '1 day ago',
      href: '/admin/disputes/letters-and-notices/sample'
    },
    {
      isRead: false,
      title: 'Notification 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quasi.',
      date: '2 days ago',
      href: ''
    },
    {
      isRead: true,
      title: 'Notification 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quasi.',
      date: '3 days ago',
      href: ''
    },
    {
      isRead: true,
      title: 'Notification 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quasi.',
      date: '4 days ago',
      href: ''
    }
  ]

  const [notifications, setNotifications] = useState(initialData)
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(notification => notification.isRead).length
  )

  // Function to handle closing the popover and updating isRead value
  const handlePopoverClose = (clickedIndex: number) => {
    setUnreadCount(unreadCount - 1)

    const updatedNotifications = notifications.map((notification, index) => ({
      ...notification,
      isRead: index === clickedIndex ? true : notification.isRead
    }))

    setNotifications(updatedNotifications)
  }

  return (
    <div>
      <Popover placement='right'>
        <PopoverTrigger>
          {/* Notification Center Icon */}
          <IconButton
            icon={
              <>
                {unreadCount != 0 ? (
                  <PiBellRingingFill color='white' size={20} />
                ) : (
                  <PiBellFill color='white' size={20} />
                )}

                {unreadCount !== 0 && (
                  <Badge
                    as='span'
                    position='absolute'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='50%'
                    top='-3px'
                    right='-3px'
                    height='25px'
                    boxSize={5}
                    bg='red'
                    color='white'
                    textAlign='center'
                    fontSize='10px'
                  >
                    {unreadCount}
                  </Badge>
                )}
              </>
            }
            aria-label={'Notifications'}
            background='none'
            _hover={{ background: 'none', transform: 'scale(1.2)' }}
          />
        </PopoverTrigger>
        <PopoverContent my='10px' bg='#FBFBFD' borderColor='grey'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader
            color='black'
            fontFamily='font.heading'
            fontWeight='bold'
            p='15px 15px 5px 15px'
          >
            {title}
          </PopoverHeader>
          <PopoverBody h='330px' p='20px'>
            <ScrollArea className='h-[300px]'>
              <Stack spacing='3' alignItems='center' pb='15px'>
                {notifications.map((notification, index) => (
                  <Card
                    key={index}
                    variant='elevated'
                    _hover={{ transform: 'scale(1.02)' }}
                    as={Link}
                    href={notification.href}
                    onClick={() => {
                      handlePopoverClose(index)
                    }}
                    size='sm'
                    textAlign='left'
                  >
                    <CardHeader p='15px 15px 0px 15px'>
                      <Text
                        as='span'
                        fontSize='sm'
                        fontWeight='bold'
                        display='flex'
                        alignItems='top'
                      >
                        {notification.isRead === false && (
                          <span
                            className='flex h-2 w-2 translate-y-1 rounded-full bg-red-500 mr-1'
                            style={{ minWidth: '8px' }}
                          />
                        )}
                        {notification.title}
                      </Text>
                    </CardHeader>
                    <CardBody
                      p='5px 15px 20px 15px'
                      fontSize='xs'
                      textAlign='left'
                    >
                      <Stack spacing={2}>
                        <Text>{notification.description}</Text>
                        <Text color='grey'>{notification.date}</Text>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </ScrollArea>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}
