"use client";

import { SimpleGrid } from "@chakra-ui/react";
import ModuleMenuCard from "@/components/system/ModuleMenuCard";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function ViolationMonitoringMenu() {
  const violationManagementMenuCard = [
    {
      category: "Violation Management",
      category_users: "Admin, Association Officers, and Board of Directors",
      category_buttons: [
        {
          text: "Homeowners' Association Violation Record",
          href: "/admin/violations/violation-record",
          description:
            "Manage and view the violation record within the Homeowners' Association.",
        },
      ],
    },
  ];

  const knowledgeBaseMenuCard = [
    {
      category: "Violations Knowledge Base",
      category_users: "ALL Homeowners",
      category_buttons: [
        {
          text: "Violation Review Process Guide",
          href: "/admin/violations/process-guide",
          description: "Read more about the violation review process.",
        },
        {
          text: "List of Homeowners' Association Violations",
          href: "/admin/violations/violation-list",
          description:
            "View the list of violations that can be reported within the Homeowners' Association. Corresponding penalties for each violation type is included.",
        },
      ],
    },
  ];

  const violationReportingMenuCard = [
    {
      category: "Report Violation",
      category_users: "ALL Homeowners",
      category_buttons: [
        {
          text: "Report a Violation",
          href: "/admin/violations/violation-form",
          description:
            "Fill out the Violation Form to formally request a violation review from the Homeowners' Association.",
        },
        {
          text: "Submitted Violation Forms",
          href: "/admin/violations/submitted-violations",
          description:
            "View your submitted violation forms to the Homeowners' Association and monitor its progress.",
        },
        {
          text: "Violation Letters and Notices",
          href: "/admin/violations/letters-and-notices",
          description:
            "View received violation letters and notices from the Homeowners' Association.",
        },
      ],
    },
  ];

  return (
    <>
      <Heading
        title="Violation Monitoring"
        description="Navigate through the Violation Monitoring module"
      />
      <Separator className="mt-4 mb-6" />
      <SimpleGrid spacing={10} columns={3}>
        {/* Violation Management */}
        {violationManagementMenuCard.map((categoryData) => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Violation Knowledge Base */}
        {knowledgeBaseMenuCard.map((categoryData) => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Violation Reporting  */}
        {violationReportingMenuCard.map((categoryData) => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
      </SimpleGrid>
    </>
  );
}
