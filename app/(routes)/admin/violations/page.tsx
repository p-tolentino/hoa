'use client'

import { Flex } from '@chakra-ui/react'
import ModuleMenuCard from '@/components/system/ModuleMenuCard'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

export default function ViolationMonitoringMenu () {
  const violationManagementMenuCard = [
    {
      category: 'Violation Management',
      category_users: 'Admin, Association Officers, and Board of Directors',
      category_buttons: ["Homeowners' Association Violation Record"],
      category_hrefs: ['/admin/violations/list-of-reports'],
      category_descriptions: [
        "Manage and view the the violation record within the Homeowners' Association."
      ]
    }
  ]

  const knowledgeBaseMenuCard = [
    {
      category: 'Violations Knowledge Base',
      category_users: 'ALL Homeowners',
      category_buttons: [
        'Violation Review Process',
        "List of Homeowners' Association Violations"
      ],
      category_hrefs: ['', '/admin/violations/list-of-violations'],
      category_descriptions: [
        'Read more about the violation review process.',
        "View the list of violations that can be reported within the Homeowners' Association."
      ]
    }
  ]

  const violationReportingMenuCard = [
    {
      category: 'Report Violation',
      category_users: 'ALL Homeowners',
      category_buttons: ['Report a Violation'],
      category_hrefs: ['/admin/violations/report-violations'],
      category_descriptions: [
        "Fill out the Violation Form to formally request a violation review from the Homeowners' Association."
      ]
    }
  ]

  return (
    <>
      <Heading
        title='Violation Monitoring'
        description='Navigate through the Violation Monitoring module'
      />
      <Separator className='mt-4 mb-6' />
      <Flex className='gap-10'>
        {/* Dispute Management Button */}
        {violationManagementMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Knowledge Base Button */}
        {knowledgeBaseMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Dispute Reporting Button */}
        {violationReportingMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
      </Flex>
    </>
  )
}
