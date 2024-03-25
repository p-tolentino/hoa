import { SubmittedDisputesClient } from "./_components/client";
import { format } from "date-fns";
import { SubmittedDisputesColumn } from "./_components/columns";
import { getAllDisputeTypes } from "@/server/data/dispute-type";
import { getAllUsers } from "@/server/data/user";
import { currentUser } from "@/lib/auth";
import { getAllDisputes } from "@/server/data/dispute";
import { getAllViolationTypes } from "@/server/data/violation-type";

export default async function SubmittedDisputes() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const users = await getAllUsers();

  if (!users) {
    return null;
  }

  const disputes = await getAllDisputes();

  if (!disputes) {
    return null;
  }

  const disputeTypes = await getAllDisputeTypes();

  if (!disputeTypes) {
    return null;
  }

  const violationTypes = await getAllViolationTypes();

  if (!violationTypes) {
    return null;
  }

  const formattedDisputes: SubmittedDisputesColumn[] = disputes.map((item) => {
    const officer = users.find((user) => user.id === item.officerAssigned);
    const submittedBy = users.find((user) => user.id === item.submittedBy);
    const dispute = disputeTypes.find((type) => type.id === item.type);
    // const violationType = violationTypes.find(
    //   (type) => type.name === item.violationInvolved
    // );

    return {
      id: item.id || "",
      number: item.number || 0,
      status: item.status || "",
      type: dispute?.title || "",
      createdAt: item.createdAt
        ? format(
            new Date(item.createdAt)?.toISOString().split("T")[0],
            "MMMM dd, yyyy"
          )
        : "",
      disputeDate: item.disputeDate
        ? format(
            new Date(item.disputeDate)?.toISOString().split("T")[0],
            "MMMM dd, yyyy"
          )
        : "",
      personsInvolved: item.personComplained || "",
      officerAssigned: officer
        ? `${officer.info?.firstName} ${officer.info?.lastName}`
        : "",
      description: item.description || "",
      submittedBy: submittedBy
        ? `${submittedBy.info?.firstName} ${submittedBy.info?.lastName}`
        : "",
      step: item.step || 1,
      progress: item.progress || "Step 0",
      letterSent: item.letterSent,
      //violationInvolved: item.violationInvolved ? violationType : null,
    };
  });

  return (
    <div>
      <div className="flex-1 space-y-4">
        <SubmittedDisputesClient data={formattedDisputes} />
      </div>
    </div>
  );
}
