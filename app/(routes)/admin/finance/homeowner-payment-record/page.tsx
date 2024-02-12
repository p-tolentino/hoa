import { format } from "date-fns";

import { PaymentRecordClient } from "./_components/client";
import { PaymentRecordColumn } from "./_components/columns";
import { currentUser } from "@/lib/auth";
import { getAllUsers } from "@/server/data/user";

const Homeowners = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const users = await getAllUsers();

  if (!users) {
    return null;
  }

  const formattedRecords: PaymentRecordColumn[] = users.map((item) => ({
    id: item.id || "",
    name:
      `${item.info?.firstName || "-"} ${
        item.info?.middleName ? `${`${item.info?.middleName}`[0]}.` : ""
      } ${item.info?.lastName || ""}` || "",
    status: item.status || "",
    amount: item.info?.amount || "",
    dateIssued: item.info?.dateIssued
      ? format(
          new Date(item.info?.dateIssued)?.toISOString().split("T")[0],
          "MMMM dd, yyyy"
        )
      : "",
    datePaid: item.info?.datePaid
      ? format(
          new Date(item.info?.datePaid)?.toISOString().split("T")[0],
          "MMMM dd, yyyy"
        )
      : "",
    purpose: item.info?.purpose || "",
  }));

  return (
    <div className="flex p-10">
      <div className="flex-1 space-y-4">
        <PaymentRecordClient data={formattedRecords} />
      </div>
    </div>
  );
};

export default Homeowners;
