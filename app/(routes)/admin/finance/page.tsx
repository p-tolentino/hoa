'use client'

import { SimpleGrid } from '@chakra-ui/react'
import ModuleMenuCard from '@/components/system/ModuleMenuCard'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

export default function FinanceManagementMenu () {
  const homeownerReportsMenuCard = [
    {
      category: 'Homeowner Reports',
      category_users: 'Admins, Association Officers, and Board of Directors',
      category_buttons: [
        {
          text: 'Homeowners Payment Record',
          href: '/admin/finance/homeowner-payment-record',
          description:
            'View the payment record of each homeowner to determine whether they currently have any outstanding balances.'
        }
      ]
    }
  ]

  const fundManagementMenuCard = [
    {
      category: 'Fund Management',
      category_users: 'the Association Treasurer',
      category_buttons: [
        {
          text: 'Income & Expense Management',
          href: '/admin/finance/income-and-expense',
          description:
            "Enter the organization's revenues and expenditures, and access its reports."
        },
        {
          text: 'Budget Planning',
          href: '/admin/finance/budget-planning',
          description:
            'Enter estimated values for organizational funds and expenses to generate a visual representation of the organizational budget for a specified duration.'
        }
      ]
    }
  ]

  const yourFinancesMenuCard = [
    {
      category: 'Your Finances',
      category_users: 'ALL Homeowners',
      category_buttons: [
        {
          text: 'Statement of Account',
          href: '/admin/finance/statement-of-account',
          description:
            "View your outstanding balance to the Homeowners' Association."
        },
        {
          text: 'Payment History',
          href: '/admin/finance/payment-history',
          description: "View all payments made to the Homeowners' Association."
        }
      ]
    }
  ]

  return (
    <>
      <Heading
        title='Finance Management'
        description='Navigate through the Finance Management module'
      />
      <Separator className='mt-4 mb-6' />
      <SimpleGrid spacing={10} columns={{ md: 1, lg: 3 }}>
        {/* Homeowner Reports */}
        {homeownerReportsMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Fund Management  */}
        {fundManagementMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Your Finances */}
        {yourFinancesMenuCard.map(categoryData => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
      </SimpleGrid>
    </>
  )
}
