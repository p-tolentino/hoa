import React from "react";
import { ListOfReportsClient } from "./_components/client";

export default function Complaints() {
  const data = [
    {
      id: "12345",
      dateSubmitted: "02/14/24",
      submittedBy: "Dela Cruz, Juan (Homeowner)",
      title: "ABCD",
      viewViolationReport: "Sample Link to Violation 1",
    },
    {
      id: "54321",
      dateSubmitted: "02/27/24",
      submittedBy: "Dela Cruz, Juanita (Homeowner)",
      title: "WSYZ",
      viewViolationReport: "Sample Link to Violation 2",
    },
  ];

  return (
    <div>
      <div className="flex-1 space-y-4">
        <ListOfReportsClient data={data} />
      </div>
    </div>
  );
}
