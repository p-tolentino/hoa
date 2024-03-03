'use client'
import { Button, Text } from '@chakra-ui/react'

const temp = 'https://www.hoamanagement.com/hoa-disputes/'

export default function DisputeResolutionProcess () {
  const handleButtonClick = () => {
    window.open(temp, '_blank') // Open in a new tab
  }

  return (
    <div>
      <Text fontWeight='bold'>Temporary page</Text>
      <Button
        variant='link'
        fontFamily='font.body'
        fontWeight='light'
        onClick={handleButtonClick} // Call the function on click
        size='sm'
      >
        Dispute Resolution Process (Link to External)
      </Button>
    </div>
  )
}
