import { Button, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function DisputeLettersAndNotices () {
  return (
    <div>
      <Button as={Link} href='/admin/disputes/letters-and-notices/sample'>
        Go to Sample Notice
      </Button>
      <Text mt={5}>
        Data table for all received dispute letters and notices here
      </Text>
    </div>
  )
}
