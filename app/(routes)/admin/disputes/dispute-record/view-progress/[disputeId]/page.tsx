import { db } from "@/lib/db";
import { getAllInfo } from "@/server/data/user-info";
import ProgressDetails from "./_components/progress-details";
import {
  getAllProgressReports,
  getDisputeOfficerActivitiesById,
} from "@/server/data/dispute";

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
      id: dispute?.type,
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

  const updatedPerson = infos.find(
    (info) => dispute.personComplained === info.userId
  );

  const committeeMembers = infos.filter(
    (info) => info.committee === "Grievance & Adjudication Committee"
  );

  const officerActivities = await getDisputeOfficerActivitiesById(dispute?.id);

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
    dispute: { ...dispute, status: status[dispute.status] },
    disputeType: disputeType,
    officerAssigned: officerAssigned ? officerAssigned : null,
    submittedBy: submittedBy,
    personComplained: updatedPerson,
    committee: committeeMembers,
    officerActivities: officerActivities?.sort(
      (a, b) => new Date(a.deadline).getDate() - new Date(b.deadline).getDate()
    ),
    progressReports: progressReports,
    userInfos: infos,
  };

  return (
    <div>
      <ProgressDetails reportDetails={reportDetails} />
    </div>
  );
};

export default DisputeProgressPage;
