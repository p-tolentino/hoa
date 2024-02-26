"use client";

import { Box, Flex } from "@chakra-ui/react";
import ModuleMenuCard from "@/components/system/ModuleMenuCard";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function FinanceManagementMenu() {
  const homeownerReportsMenuCard = [
    {
      category: "Homeowner Reports",
      category_users: "Admins, Association Officers, and Board of Directors",
      category_buttons: ["Homeowners Payment Record"],
      category_hrefs: ["/admin/finance/homeowner-payment-record"],
      category_descriptions: [
        "View the payment record of each homeowner to determine whether they currently have any outstanding balances.",
      ],
    },
  ];

  const fundManagementMenuCard = [
    {
      category: "Fund Management",
      category_users: "the Association Treasurer",
      category_buttons: ["Revenue & Expense Management", "Budget Planning"],
      category_hrefs: [
        "/admin/finance/income-and-expense",
        "/admin/finance/budget-planning",
      ],
      category_descriptions: [
        "Enter the organization's revenues and expenditures, and access its reports.",
        "Enter estimated values for organizational funds and expenses to generate a visual representation of the organizational budget for a specified duration.",
      ],
    },
  ];

  const yourFinancesMenuCard = [
    {
      category: "Your Finances",
      category_users: "ALL Homeowners",
      category_buttons: ["Statement of Account", "Payment History"],
      category_hrefs: [
        "/admin/finance/statement-of-account",
        "/admin/finance/payment-history",
      ],
      category_descriptions: [
        "View your outstanding balance to the Homeowners' Association.",
        "View all payments made to the Homeowners' Association.",
      ],
    },
  ];

  return (
    <>
      <Heading
        title="Finance Management"
        description="Navigate through the Finance Management module"
      />
      <Separator className="mt-4 mb-6" />
      <Flex className="gap-10">
        {/* Homeowner Reports Buttons */}
        {homeownerReportsMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
        {/* Fund Management Buttons */}
        {fundManagementMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
        {/* Your Finances Buttons */}
        {yourFinancesMenuCard.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
      </Flex>
    </>
  );
}
