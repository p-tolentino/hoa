import { db } from '@/lib/db'
import { getAllInfo } from '@/server/data/user-info'
import ProgressDetails from './_components/progress-details'

export const DisputeProgressPage = async ({
  params
}: {
  params: { disputeId: string }
}) => {
  const dispute = await db.dispute.findUnique({
    where: {
      id: params.disputeId
    }
  })

  if (!dispute) {
    return null
  }

  const disputeType = await db.disputeType.findFirst({
    where: {
      title: dispute?.type
    }
  })

  let officerAssigned

  if (dispute?.officerAssigned) {
    officerAssigned = await db.personalInfo.findFirst({
      where: {
        userId: dispute?.officerAssigned
      }
    })
  }

  const submittedBy = await db.personalInfo.findFirst({
    where: {
      userId: dispute?.submittedBy
    }
  })

  const infos = await getAllInfo()

  if (!infos) {
    return null
  }

  const updatedPersons = infos.filter(info => dispute.personComplained)

  const reportDetails = {
    dispute: dispute,
    disputeType: disputeType,
    officerAssigned: officerAssigned ? officerAssigned : null,
    submittedBy: submittedBy,
    personComplained: updatedPersons
  }

  return (
    <div>
      <ProgressDetails reportDetails={reportDetails} />
    </div>
  )
}

export default DisputeProgressPage
