'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, ListItem, UnorderedList } from '@chakra-ui/react'
import { UpdateBylaws } from './_components/UpdateBylaws'

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
              <Link fontSize='sm' href='/admin/community/post-approvals'>
                Posts for Officer Approval
              </Link>
            </ListItem>
            <ListItem>
              <UpdateBylaws />
            </ListItem>
          </UnorderedList>
        </CardContent>
      </Card>
    </>
  )
}
