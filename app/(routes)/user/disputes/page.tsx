'use client'

import { Flex } from '@chakra-ui/react'
import ModuleMenuCard from '@/components/system/ModuleMenuCard'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

export default function DisputeResolutionMenu () {
  const disputeManagementMenuCard = [
    {
      category: 'Dispute Management',
      category_users: 'Admin, Association Officers, and Board of Directors',
      category_buttons: ['List of Complaints'],
      category_hrefs: ['/admin/disputes/list-of-complaints'],
      category_descriptions: [
        'Manage and view the list of complaints filed by the Homeowners.'
      ]
    }
  ]

  const knowledgeBaseMenuCard = [
    {
      category: 'Knowledge Base for Disputes',
      category_users: 'ALL Homeowners',
      category_buttons: ['List of Common Association Disputes'],
      category_hrefs: ['/admin/disputes/list-of-disputes'],
      category_descriptions: [
        'View the list of common disputes occurence in a homeowners association.'
      ]
    }
  ]

  const disputeReportingMenuCard = [
    {
      category: 'Report Dispute',
      category_users: 'ALL Homeowners',
      category_buttons: ['File a Complaint'],
      category_hrefs: ['/admin/disputes/file-complaints'],
      category_descriptions: ['Fill up the Complaint Form to report a dispute.']
    }
  ]

  return (
    <>
      <Heading
        title='Dispute Resolution'
        description='Navigate through the Dispute Resolution module'
      />
      <Separator className='mt-4 mb-6' />
      <Flex className='gap-10'>
        {/* Dispute Management Button */}
        {disputeManagementMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
        {/* Knowledge Base Button */}
        {knowledgeBaseMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
        {/* Dispute Reporting Button */}
        {disputeReportingMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
      </Flex>
    </>
  )
}
