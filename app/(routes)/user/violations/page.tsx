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
      category_buttons: ['List of Violations'],
      category_hrefs: ['/admin/violations/list-of-reports'],
      category_descriptions: [
        'Manage and view the list of violations filed by the Homeowners.'
      ]
    }
  ]

  const knowledgeBaseMenuCard = [
    {
      category: 'Knowledge Base for Violations',
      category_users: 'ALL Homeowners',
      category_buttons: ['List of Common Association Violations'],
      category_hrefs: ['/admin/violations/list-of-violations'],
      category_descriptions: [
        'View the list of common violations in a homeowners association.'
      ]
    }
  ]

  const violationReportingMenuCard = [
    {
      category: 'Report Violation',
      category_users: 'ALL Homeowners',
      category_buttons: ['Report a Violation'],
      category_hrefs: ['/admin/violations/report-violations'],
      category_descriptions: ['Fill up the Violation Form.']
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
        {violationManagementMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
        {/* Knowledge Base Button */}
        {knowledgeBaseMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
        {/* Dispute Reporting Button */}
        {violationReportingMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
      </Flex>
    </>
  )
}
