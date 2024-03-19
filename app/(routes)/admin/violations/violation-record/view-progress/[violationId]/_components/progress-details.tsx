"use client";

import BackButton from "@/components/system/BackButton";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flex } from "@chakra-ui/react";
import StepCard from "./step-card";

interface ViewProgressProps {
  reportDetails: any;
}

export const ProgressDetails: React.FC<ViewProgressProps> = ({
  reportDetails,
}) => {
  const processSteps = [
    {
      value: "step1",
      title: " Violation Form Submission",
      description:
        "Homeowners submit violation reports through the Violation Enforcement module in the MIS.",
      details: [
        "Homeowners provide details about the type of violation, date, and a detailed description of the violation.",
        "Supporting evidence such as photos or documents may be attached to the violation report.",
      ],
    },
    {
      value: "step2",
      title: "Review by Environment & Security Committee",
      description:
        "The Environment and Security Committee receives and reviews the violation report.",
      details: [
        "The Environment and Security Committee assesses the validity of the reported violation based on the community rules and regulations.",
        "The result of the assessment will provide the list of key activities to be followed by the officer assigned to oversee the violation case, including the expected accomplishment date of each activity.",
      ],
    },
    {
      value: "step3",
      title: "Assign Officer to Oversee Violation Case",
      description:
        "An officer is designated to oversee the enforcement of the violation case.",
      details: [
        "The designated officer of the violation case will be a member of the Environment and Security Committee.",
        "The officer reviews the timeline of the violation enforcement key activities provided by the committee and makes necessary preparations.",
      ],
    },
    {
      value: "step4",
      title: "Send out Violation Letters",
      description:
        "The violator(s) are informed of the violation through official violation letters.",
      details: [
        "The designated officer sends violation letters to the alleged violator(s) via the MIS.",
        "The violation letter outlines the nature of the violation, required corrective actions, and the corresponding penalty fee.",
        "The violator(s) are given a deadline before the penalty fee is applied on their statement of account.",
      ],
    },
    {
      value: "step5",
      title: "Negotiations to Appeal Violation Case",
      description:
        "The violator has the opportunity to negotiate or appeal the violation case before the specified deadline to pay the penalty fee.",
      details: [
        "The designated officer communicates with the alleged violator(s) to discuss the violation and potential resolutions.",
        "Negotiations may involve addressing misunderstandings, providing explanations, or reaching a settlement agreement.",
        "The designated officer submits progress reports outlining the activities performed until the violation case reaches its resolution and/or enforcement.",
      ],
    },
    {
      value: "step6",
      title: "Violation Enforcement with Penalty Fee",
      description:
        "The designated officer initiates enforcement measures according to HOA guidelines, such as issuing fines or penalties.",
      details: [
        "If the violation is not resolved or appealed successfully, enforcement actions are taken, potentially including penalty fees.",
        "The violator(s) are informed that the penalty fee is added to their statement of account, which can be accessed via the Finance Management module.",
      ],
    },
  ];

  const tempViolation = {
    step: 6,
    number: 1,
    status: "Closed; Penalty Fee in SOA",
    submittedBy: "Submitter",
    personsInvolved: ["person1", "person2"],
    officerAssigned: "Officer",
    violationType: "Parking",
    violationFee: "P 100",
    createdAt: "Date created",
    violationDate: "Violation Date",
    violationDescription: "Violation Description",
  };

  return (
    <div>
      <Flex justifyContent="space-between">
        <Flex gap={5}>
          <Heading
            title={`#V${tempViolation.number
              .toString()
              .padStart(4, "0")} - Violation Enforcement Progress`}
            description="View the progress of a selected violation case within the Homeowners' Association."
          />
          {/* Status */}
          <Badge
            className={cn(
              "w-[max-content] h-[min-content] px-3 py-2 text-center justify-center text-sm"
              // reportDetails.violation.status === "For Review"
              //   ? "bg-yellow-700"
              //   : reportDetails.violation.status === "Invalid"
              //   ? "bg-red-800"
              //   : reportDetails.violation.status === "For Assignment"
              //   ? "bg-yellow-800"
              //   : reportDetails.violation.status === "Pending Violation Letter"
              //   ? "bg-orange-800"
              //   : reportDetails.violation.status === "Negotiating (Letter Sent)"
              //   ? "bg-blue-900"
              //   : reportDetails.violation.status === "Closed" &&
              //     reportDetails.violation.reasonToClose ===
              //       "Penalty Fee Charged to SOA"
              //   ? ""
              //   : reportDetails.violation.status === "Closed" &&
              //     reportDetails.violation.reasonToClose === "Appealed"
              //   ? "bg-green-700"
              //   : "display-none"
            )}
          >
            {tempViolation.status}
          </Badge>
        </Flex>
        <BackButton />
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Tabs defaultValue={"step" + tempViolation.step} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {processSteps.map((step, index) => (
            <TabsTrigger
              key={step.value}
              value={step.value}
              disabled={index >= tempViolation.step} // to make uncompleted steps unclickable
            >
              Step {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        {processSteps.map((step, index) => (
          <TabsContent key={step.value} value={step.value}>
            <StepCard
              key={step.value}
              stepIndex={index}
              processSteps={processSteps}
              tempViolation={tempViolation}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProgressDetails;
