import { ViolationLettersAndNoticesClient } from "./_components/client";
import { getAllLettersAndNotices } from "@/server/data/letter-notice";
import { ViolationLettersAndNoticesColumn } from "./_components/columns";
import { getAllViolations } from "@/server/data/violation";
import { getAllViolationTypes } from "@/server/data/violation-type";
import { format } from "date-fns";
import { currentUser } from "@/lib/auth";

export default async function ViolationLettersAndNotices() {
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
      (item) =>
        item.type === "violationLetter" || item.type === "violationNotice"
    )
    .sort((a: any, b: any) => b.createdAt - a.createdAt);

  const violations = await getAllViolations();

  if (!violations) {
    return null;
  }

  const violationTypes = await getAllViolationTypes();

  if (!violationTypes) {
    return null;
  }

  const formattedData: ViolationLettersAndNoticesColumn[] =
    orderedLettersNotices.map((item) => {
      const violation = violations.find(
        (violation) => violation.id === item.idToLink
      );
      const violationType = violationTypes.find(
        (type) => type.name === violation?.type
      );

      return {
        id: item.id || "",
        type: item.type || "",
        recipient: item.recipient || "",
        meetDate: item.meetDate ? item.meetDate : "",
        venue: item.venue ? item.venue : "",
        sender: item.sender || "",
        createdAt: item.createdAt
          ? format(
              new Date(item.createdAt)?.toISOString().split("T")[0],
              "MMMM dd, yyyy"
            )
          : "",
        violation: violation!!,
        violationType: violationType!!,
      };
    });

  return (
    <div>
      <div className="flex-1 space-y-4">
        <ViolationLettersAndNoticesClient
          data={formattedData.filter((data) => {
            return user.id === data.recipient;
          })}
        />
      </div>
    </div>
  );
}
