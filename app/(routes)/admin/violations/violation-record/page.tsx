import React from "react";
import { ListOfViolationsClient } from "./_components/client";

export default function Violations() {
  const data = [
    {
      id: "12345",
      status: "Pending",
      dateSubmitted: "02/14/24",
      submittedBy: "Dela Cruz, Juan (Homeowner)",
      viewViolationForm: "Sample Link to Violation Form 1",
    },
    {
      id: "67890",
      status: "In Process",
      dateSubmitted: "02/20/24",
      submittedBy: "Ibarra, Crisostomo (Homeowner)",
      viewViolationForm: "Sample Link to Violation Form 2",
    },
    {
      id: "54321",
      status: "Resolved",
      dateSubmitted: "02/27/24",
      submittedBy: "Dela Cruz, Juanita (Homeowner)",
      viewViolationForm: "Sample Link to Violation Form 3",
    },
  ];

  return (
    <div>
      <div className="flex-1 space-y-4">
        <ListOfViolationsClient data={data} />
      </div>
    </div>
  );
}
