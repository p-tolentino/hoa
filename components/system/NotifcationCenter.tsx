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
  isNew: boolean
  title: string
  description: string
  date: string
  onClick: () => void
}

export default function NotificationCenter () {
  const title = 'Notification Center'

  const initialData = [
    {
      isNew: true,
      title: 'Notification 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quasi.',
      date: '2 days ago',
      href: ''
    },
    {
      isNew: false,
      title: 'Notification 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quasi.',
      date: '3 days ago',
      href: ''
    },
    {
      isNew: false,
      title: 'Notification 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quasi.',
      date: '4 days ago',
      href: ''
    }
  ]

  const [notifications, setNotifications] = useState(initialData)
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(notification => notification.isNew).length
  )
  const [popoverOpened, setPopoverOpened] = useState(false)

  // Set all isNew values to false when the popover is closed after the first time
  // Set popoverOpened to true after the popover has been opened once
  const handlePopoverClose = () => {
    if (popoverOpened) {
      setUnreadCount(0)

      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        isNew: false
      }))
      setNotifications(updatedNotifications)
    }
    setPopoverOpened(true)
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
            onClick={() => {
              handlePopoverClose()
            }}
          />
        </PopoverTrigger>
        <PopoverContent my='10px' bg='#FBFBFD' borderColor='grey'>
          <PopoverArrow />
          <PopoverCloseButton onClick={handlePopoverClose} />
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
                    bg={notification.isNew === true ? 'brand.400' : 'white'}
                    _hover={{ transform: 'scale(1.02)' }}
                    as={Link}
                    href={notification.href}
                    onClick={() => handlePopoverClose()}
                    size='sm'
                    textAlign='left'
                  >
                    <CardHeader p='15px 15px 0px 15px'>
                      <Text fontSize='sm' fontWeight='bold'>
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
