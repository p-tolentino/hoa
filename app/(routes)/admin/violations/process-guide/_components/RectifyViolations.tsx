'use client'
import { Box, Link, Text } from '@chakra-ui/react'

export default function RectifyViolations () {
  return (
    <div>
      <Box mb='1rem'>
        {/* Section Title */}
        <Text fontSize='xl' fontFamily='font.heading' fontWeight='bold'>
          Rectify Violations
        </Text>
      </Box>
      <Text textAlign='justify' fontFamily='font.body' fontSize='sm'>
        To rectify a violation, the alleged violator should first access the{' '}
        <Link
          href='/admin/membership/admin-directory'
          color='blue.500'
          textDecor='underline'
        >
          Admin and Officer Directory
        </Link>{' '}
        in the Membership module of the MIS. There, they can find the contact
        information of the Officer assigned to oversee their case. Once the
        contact details are obtained, the alleged violator should reach out to
        the Officer to discuss the nature of the violation, understand the
        corrective actions required, and seek guidance on the resolution
        process. Open communication and cooperation with the Officer are crucial
        for addressing the violation promptly and ensuring compliance with HOA
        rules and regulations.
      </Text>
    </div>
  )
}
