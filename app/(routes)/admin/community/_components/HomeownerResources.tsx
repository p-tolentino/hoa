'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, ListItem, UnorderedList } from '@chakra-ui/react'
<<<<<<<< HEAD:app/(routes)/admin/community/_components/sideCards/homeownerResources/HomeownerResources.tsx
import { CommunityRules } from './_components/CommunityRules'
========
import { CommunityRules } from './sideCards/CommunityRules'
>>>>>>>> c4dfc7a47c13a824734cc69c8213dbe25e1c937d:app/(routes)/admin/community/_components/HomeownerResources.tsx

export default function HomeownerResources () {
  return (
    <>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg'>Homeowner Resources</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <UnorderedList fontFamily={'font.body'}>
            <ListItem>
              <CommunityRules />
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
