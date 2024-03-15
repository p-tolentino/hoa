import React from "react";
import { DisputeLettersAndNoticesClient } from "./_components/client";
import { currentUser } from "@/lib/auth";
import { getAllLettersAndNotices } from "@/server/data/letter-notice";
import { getAllDisputeTypes } from "@/server/data/dispute-type";
import { getAllDisputes } from "@/server/data/dispute";
import { getAllViolations } from "@/server/data/violation";
import { getAllViolationTypes } from "@/server/data/violation-type";
import { format } from "date-fns";
import { DisputeLettersAndNoticesColumn } from "./_components/columns";

export default async function DisputeLettersAndNotices() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const lettersNotices = await getAllLettersAndNotices();

  if (!lettersNotices) {
    return null;
  }

  const orderedLettersNotices = lettersNotices
    .filter(
      (item) => item.type === "disputeLetter" || item.type === "disputeNotice"
    )
    .sort((a: any, b: any) => b.createdAt - a.createdAt);

  const violationTypes = await getAllViolationTypes();

  if (!violationTypes) {
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

  const formattedData: DisputeLettersAndNoticesColumn[] =
    orderedLettersNotices.map((item) => {
      const dispute = disputes.find((dispute) => dispute.id === item.idToLink);
      const disputeType = disputeTypes.find(
        (type) => type.name === dispute?.type
      );
      const violationType = violationTypes.find(
        (type) => type.name === dispute?.violationInvolved
      );

      return {
        id: item.id || "",
        type: item.type || "",
        recipient: item.recipient || "",
        meetDate: item.meetDate ? item.meetDate : "",
        meetTime: item.meetTime ? item.meetTime : "",
        venue: item.venue ? item.venue : "",
        sender: item.sender || "",
        createdAt: item.createdAt
          ? format(
              new Date(item.createdAt)?.toISOString().split("T")[0],
              "MMMM dd, yyyy"
            )
          : "",
        dispute: dispute!!,
        disputeType: disputeType!!,
        violationType: violationType!!,
      };
    });

  return (
    <div>
      <div className="flex-1 space-y-4">
        <DisputeLettersAndNoticesClient data={formattedData} />
      </div>
    </div>
  );
}
