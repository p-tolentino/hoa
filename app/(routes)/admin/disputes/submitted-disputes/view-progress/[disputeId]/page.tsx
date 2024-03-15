import { db } from "@/lib/db";
import { getAllInfo } from "@/server/data/user-info";
import ViewProgress from "./_components/view-progress";

export const DisputeProgressPage = async ({
  params,
}: {
  params: { disputeId: string };
}) => {
  const dispute = await db.dispute.findUnique({
    where: {
      id: params.disputeId,
    },
  });

  if (!dispute) {
    return null;
  }

  const disputeType = await db.disputeType.findFirst({
    where: {
      name: dispute?.type,
    },
  });

  let officerAssigned;

  if (dispute?.officerAssigned) {
    officerAssigned = await db.personalInfo.findFirst({
      where: {
        userId: dispute?.officerAssigned,
      },
    });
  }

  const submittedBy = await db.personalInfo.findFirst({
    where: {
      userId: dispute?.submittedBy,
    },
  });

  const infos = await getAllInfo();

  if (!infos) {
    return null;
  }

  const updatedPersons = infos.filter((info) =>
    dispute.personsInvolved.some((person) => person === info.userId)
  );

  let violationType;

  if (dispute.violationInvolved) {
    violationType = await db.violationType.findFirst({
      where: {
        name: dispute?.violationInvolved,
      },
    });
  }

  const reportDetails = {
    dispute: dispute,
    disputeType: disputeType,
    violationType: violationType || null,
    officerAssigned: officerAssigned ? officerAssigned : null,
    submittedBy: submittedBy,
    personsInvolved: updatedPersons,
  };

  return (
    <div>
      <ViewProgress reportDetails={reportDetails} />
    </div>
  );
};

export default DisputeProgressPage;
