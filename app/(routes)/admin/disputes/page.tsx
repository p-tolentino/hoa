'use client'

import { SimpleGrid } from '@chakra-ui/react'
import ModuleMenuCard from '@/components/system/ModuleMenuCard'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

export default function DisputeResolutionMenu () {
  const disputeManagementMenuCard = [
    {
      category: 'Dispute Management',
      category_users: 'Admin, Association Officers, and Board of Directors',
      category_buttons: [
        {
          text: "Homeowners' Association Dispute Record",
          href: '/admin/disputes/dispute-record',
          description:
            "Manage and view the the dispute record within the Homeowners' Association."
        }
      ]
    }
  ]

  const disputeKnowledgeBaseMenuCard = [
    {
      category: 'Disputes Knowledge Base',
      category_users: 'ALL Homeowners',
      category_buttons: [
        {
          text: 'Dispute Resolution Process',
          href: '/admin/disputes/dispute-resolution-process',
          description: 'Read more about the dispute resolution process.'
        },
        {
          text: "List of Homeowners' Association Disputes",
          href: '/admin/disputes/dispute-list',
          description:
            "View the list of disputes that can be reported with the homeowners' association. Possible fees are included for each dispute type."
        }
      ]
    }
  ]

  const disputeResolutionMenuCard = [
    {
      category: 'Dispute Resolution',
      category_users: 'ALL Homeowners',
      category_buttons: [
        {
          text: 'File a Complaint',
          href: '/admin/disputes/complaint-form',
          description:
            "Fill out the Complaint Form to formally request for a dispute resolution from the Homeowners' Association."
        }
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
      <SimpleGrid spacing={10} columns={3}>
        {/* Dispute Management */}
        {disputeManagementMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
        {/* Dispute Knowledge Base  */}
        {disputeKnowledgeBaseMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Dispute Resolution  */}
        {disputeResolutionMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
      </SimpleGrid>
    </>
  )
}
