import React from "react";
import { ListOfViolationsClient } from "./_components/client";
import { currentUser } from "@/lib/auth";
import { getAllUsers } from "@/server/data/user";
import { getAllViolations } from "@/server/data/violation";
import { ListOfViolationsColumn } from "./_components/columns";
import { format } from "date-fns";

export default async function Violations() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const users = await getAllUsers();

  if (!users) {
    return null;
  }

  const violations = await getAllViolations();

  if (!violations) {
    return null;
  }

  const formattedViolations: ListOfViolationsColumn[] = violations.map(
    (item) => {
      const officer = users.find((user) => user.id === item.officerAssigned);
      const submittedBy = users.find((user) => user.id === item.submittedBy);

      return {
        id: item.id || "",
        number: item.number || 0,
        status: item.status || "",
        type: item.type || "",
        createdAt: item.createdAt
          ? format(
              new Date(item.createdAt)?.toISOString().split("T")[0],
              "MMMM dd, yyyy"
            )
          : "",
        violationDate: item.violationDate
          ? format(
              new Date(item.violationDate)?.toISOString().split("T")[0],
              "MMMM dd, yyyy"
            )
          : "",
        personsInvolved: item.personsInvolved || [],
        officerAssigned: officer
          ? `${officer.info?.firstName} ${officer.info?.lastName}`
          : "Unassigned",
        description: item.description || "",
        submittedBy: submittedBy
          ? `${submittedBy.info?.firstName} ${submittedBy.info?.lastName}`
          : "",
        progress: item.progress || "",
      };
    }
  );

  return (
    <div>
      <div className="flex-1 space-y-4">
        <ListOfViolationsClient data={formattedViolations} />
      </div>
    </div>
  );
}
