'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, ListItem, UnorderedList } from '@chakra-ui/react'

export default function HomeownerLinks () {
  return (
    <>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg'>Homeowner Resources</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <UnorderedList fontFamily={'font.body'}>
            <ListItem>
              <Link isExternal fontSize='sm'>
                Community Rules
              </Link>
            </ListItem>
            <ListItem>
              <Link isExternal fontSize='sm'>
                LGU Hotlines
              </Link>
            </ListItem>
            <ListItem>
              <Link isExternal fontSize='sm'>
                Disaster & Preparedness Guidelines
              </Link>
            </ListItem>
            <ListItem>
              <Link isExternal fontSize='sm'>
                Other Resources
              </Link>
            </ListItem>
          </UnorderedList>
        </CardContent>
      </Card>
    </>
  )
}
