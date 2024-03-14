import React from "react";
import { DisputeLettersAndNoticesClient } from "./_components/client";

export default function DisputeLettersAndNotices() {
  const data = [
    {
      id: "#D001",
      createdAt: "03/10/24",
      disputeNumber: "D001",
      disputeType: "Neighbor-to-Neighbor Conflict",
      viewDisputeLetterNotice: "Notice",
    },
    {
      id: "#D001",
      createdAt: "03/01/24",
      disputeNumber: "D002",
      disputeType: "Neighbor-to-Neighbor Conflict",
      viewDisputeLetterNotice: "Letter",
    },
  ];

  return (
    <div>
      <div className="flex-1 space-y-4">
        <DisputeLettersAndNoticesClient data={data} />
      </div>
    </div>
  );
}
