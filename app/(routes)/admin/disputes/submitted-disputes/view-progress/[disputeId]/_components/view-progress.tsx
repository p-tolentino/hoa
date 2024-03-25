'use client'

import BackButton from '@/components/system/BackButton'
import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Flex } from '@chakra-ui/react'
import StepCard from './step-card'

interface ViewProgressProps {
  reportDetails: any
}

export const ProgressDetails: React.FC<ViewProgressProps> = ({
  reportDetails
}) => {
  const processSteps = [
    {
      value: 'step1',
      title: ' Dispute Form Submission',
      description:
        'Homeowners submit dispute reports through the Dispute Resolution module in the MIS.',
      details: [
        'Homeowners provide details about the type of dispute, date, and a detailed description of the dispute.',
        'Supporting evidence such as photos or documents may be attached to the dispute report.'
      ]
    },
    {
      value: 'step2',
      title: 'Review by Grievance and Adjudication Committee',
      description:
        'The Grievance and Adjudication Committee receives and reviews the dispute report.',
      details: [
        'The Grievance and Adjudication Committee assesses the report and conducts an assessment to determine corrective actions.',
        'The result of the assessment will provide the list of key activities to be followed by the officer assigned to oversee the dispute case, including the expected accomplishment date of each activity.'
      ]
    },
    {
      value: 'step3',
      title: 'Assign Officer to Oversee Dispute Case',
      description:
        'An officer is designated to oversee the resolution of the dispute case.',
      details: [
        'The designated officer of the dispute case will be a member of the Grievance and Adjudication Committee.',
        'The officer reviews the timeline of the dispute resolution key activities provided by the committee and makes necessary preparations.'
      ]
    },
    {
      value: 'step4',
      title: 'Send out Dispute Letters',
      description:
        'The complainee(s) are informed of the dispute through official dispute letters.',
      details: [
        'The designated officer sends dispute letters to the complainee(s) via the MIS.',
        'The dispute letter outlines the nature of the dispute and the scheduled meeting details to deliberate on the most effective course of action for its resolution.'
      ]
    },
    {
      value: 'step5',
      title: 'Discussions and Activities for Resolution',
      description:
        'The complainee(s) and the assigned officer engage in discussions and activities aimed at resolving the dispute.',
      details: [
        'The designated officer communicates with the complainee(s) to discuss the dispute and potential resolutions.',
        'Activities may include mediation sessions, arbitration, or other conflict resolution methods as deemed appropriate.',
        'The designated officer submits progress reports outlining the activities performed until the dispute case reaches its resolution.'
      ]
    },
    {
      value: 'step6',
      title: 'Dispute Resolution with Corrective Actions',
      description:
        'The designated officer ensures that the agreed-upon resolution is carried out.',
      details: [
        'Upon reaching a resolution, the dispute is officially resolved, and corrective actions are implemented if necessary.',
        'If the dispute is not resolved successfully, the dispute case is elevated to the barangay.'
      ]
    }
  ]

  const tempDispute = {
    step: 6,
    number: 1,
    status: 'Closed',
    submittedBy: 'Submitter',
    personComplained: 'Complainee',
    officerAssigned: 'Officer',
    disputeType: 'Parking',
    createdAt: 'Date created',
    disputeDate: 'Dispute Date',
    disputeDescription: 'Dispute Description',
    reasonToClose: 'Resolved'
  }

  return (
    <div>
      <Flex justifyContent='space-between'>
        <Flex gap={5}>
          <Heading
            title={`#V${reportDetails.dispute.number
              .toString()
              .padStart(4, '0')} - Dispute Resolution Progress`}
            description="View the progress of a selected dispute case within the Homeowners' Association."
          />
          {/* Status */}
          <Badge
            className={cn(
              'w-[max-content] h-[min-content] px-3 py-2 text-center justify-center text-sm',
              reportDetails.dispute.status === 'For Review'
                ? 'bg-yellow-700'
                : reportDetails.dispute.status === 'Invalid'
                ? 'bg-red-800'
                : reportDetails.dispute.status === 'For Assignment'
                ? 'bg-yellow-800'
                : reportDetails.dispute.status === 'Pending Dispute Letter'
                ? 'bg-orange-800'
                : reportDetails.dispute.status === 'Negotiating (Letter Sent)'
                ? 'bg-blue-900'
                : reportDetails.dispute.status === 'Closed' &&
                  reportDetails.dispute.reasonToClose ===
                    'Penalty Fee Charged to SOA'
                ? ''
                : reportDetails.dispute.status === 'Closed' &&
                  reportDetails.dispute.reasonToClose === 'Appealed'
                ? 'bg-green-700'
                : 'display-none'
            )}
          >
            {reportDetails.dispute.status}
            {reportDetails.dispute.reasonToClose &&
              ` - ${reportDetails.dispute.reasonToClose}`}
          </Badge>
        </Flex>
        <BackButton />
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Tabs
        defaultValue={'step' + reportDetails.dispute.step}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-6'>
          {processSteps.map((step, index) => (
            <TabsTrigger
              key={step.value}
              value={step.value}
              disabled={index >= tempDispute.step} // to make uncompleted steps unclickable
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
              tempDispute={tempDispute}
              reportDetails={reportDetails}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default ProgressDetails
