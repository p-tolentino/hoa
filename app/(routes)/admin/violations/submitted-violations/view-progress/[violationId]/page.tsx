import { db } from "@/lib/db";
import { getAllInfo } from "@/server/data/user-info";
import ViewProgress from "./_components/view-progress";
import {
  getAllProgressReports,
  getViolationOfficerActivitiesById,
} from "@/server/data/violation";

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
      id: violation?.type,
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

  const officerActivities = await getViolationOfficerActivitiesById(
    violation?.id
  );

  const progressReports = await getAllProgressReports();

  const status = {
    FOR_REVIEW: "For Review",
    FOR_ASSIGNMENT: "For Officer Assignment",
    PENDING_LETTER_TO_BE_SENT: "Pending Letter To Be Sent",
    NEGOTIATING: "Negotiating (Letter Sent)",
    FOR_FINAL_REVIEW: "For Final Review",
    CLOSED: "Closed",
  };

  const reportDetails = {
    violation: { ...violation, status: status[violation.status] },
    violationType: violationType,
    officerAssigned: officerAssigned ? officerAssigned : null,
    submittedBy: submittedBy,
    personsInvolved: updatedPersons,
    officerActivities: officerActivities?.sort(
      (a, b) => new Date(b.deadline).getDate() - new Date(a.deadline).getDate()
    ),
    progressReports: progressReports,
  };

  return (
    <div>
      <ViewProgress reportDetails={reportDetails} />
    </div>
  );
};

export default ViolationProgressPage;
