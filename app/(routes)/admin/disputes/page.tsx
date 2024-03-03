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
      category_buttons: ["Homeowners' Association Dispute Record"],
      category_hrefs: ['/admin/disputes/dispute-record'],
      category_descriptions: [
        "Manage and view the the dispute record within the Homeowners' Association."
      ]
    }
  ]

  const disputeKnowledgeBaseMenuCard = [
    {
      category: 'Disputes Knowledge Base',
      category_users: 'ALL Homeowners',
      category_buttons: [
        'Dispute Resolution Process',
        "List of Homeowners' Association Disputes"
      ],
      category_hrefs: [
        '/admin/disputes/dispute-resolution-process',
        '/admin/disputes/dispute-list'
      ],
      category_descriptions: [
        'Read more about the dispute resolution process.',
        "View the list of disputes that can be reported within the Homeowners' Association."
      ]
    }
  ]

  const disputeResolutionMenuCard = [
    {
      category: 'Dispute Resolution',
      category_users: 'ALL Homeowners',
      category_buttons: ['File a Complaint'],
      category_hrefs: ['/admin/disputes/complaint-form'],
      category_descriptions: [
        "Fill out the Complaint Form to formally request for a dispute resolution from the Homeowners' Association."
      ]
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
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Dispute Knowledge Base Button */}
        {disputeKnowledgeBaseMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Dispute Resolution Button/s */}
        {disputeResolutionMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
      </Flex>
    </>
  )
}
