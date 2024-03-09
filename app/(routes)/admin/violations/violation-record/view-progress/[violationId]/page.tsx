import { db } from "@/lib/db";
import ProgressDetails from "./_components/progress-details";

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

  const reportDetails = {
    violation: violation,
    violationType: violationType,
    officerAssigned: officerAssigned ? officerAssigned : null,
  };

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProgressDetails reportDetails={reportDetails} />
      </div>
    </div>
  );
};

export default ViolationProgressPage;
