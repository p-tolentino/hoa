import { db } from "@/lib/db";
import { getAllInfo } from "@/server/data/user-info";
import ViewProgress from "./_components/view-progress";

export const ViolationProgressPage = async ({
  params,
}: {
  params: { violationId: string };
}) => {
  const violation = await db.violation.findUnique({
    where: {
      id: params.violationId,
    },
  });

  if (!violation) {
    return null;
  }

  const violationType = await db.violationType.findFirst({
    where: {
      name: violation?.type,
    },
  });

  let officerAssigned;

  if (violation?.officerAssigned) {
    officerAssigned = await db.personalInfo.findFirst({
      where: {
        userId: violation?.officerAssigned,
      },
    });
  }

  const submittedBy = await db.personalInfo.findFirst({
    where: {
      userId: violation?.submittedBy,
    },
  });

  const infos = await getAllInfo();

  if (!infos) {
    return null;
  }

  const updatedPersons = infos.filter((info) =>
    violation.personsInvolved.some((person) => person === info.userId)
  );

  const reportDetails = {
    violation: violation,
    violationType: violationType,
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

export default ViolationProgressPage;
