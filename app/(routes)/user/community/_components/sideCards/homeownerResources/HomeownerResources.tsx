'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ListItem, UnorderedList } from '@chakra-ui/react'
import { CommunityRules } from './_components/CommunityRules'
import LGUHotlines from './_components/LGUHotlines'
import DisasterPreparedness from './_components/DisasterPreparedness'
import CovidGuidelines from './_components/CovidGuidelines'
import Bylaws from './_components/Bylaws'

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
              <Bylaws />
            </ListItem>
            <ListItem>
              <LGUHotlines />
            </ListItem>
            <ListItem>
              <DisasterPreparedness />
            </ListItem>
            <ListItem>
              <CovidGuidelines />
            </ListItem>
          </UnorderedList>
        </CardContent>
      </Card>
    </>
  )
}
