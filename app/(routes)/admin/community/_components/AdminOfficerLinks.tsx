'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, ListItem, UnorderedList } from '@chakra-ui/react'

export default function AdminOfficerLinks () {
  return (
    <>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg'>For Admin & Officers</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <UnorderedList fontFamily={'font.body'}>
            <ListItem>
              <Link isExternal fontSize='sm'>
                Posts for Officer Approval
              </Link>
            </ListItem>
            <ListItem>
              <Link isExternal fontSize='sm'>
                Community Engagement Configurations
              </Link>
            </ListItem>
          </UnorderedList>
        </CardContent>
      </Card>
    </>
  )
}