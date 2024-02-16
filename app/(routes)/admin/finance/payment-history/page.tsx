import { format } from "date-fns";

import { PaymentHistoryClient } from "./_components/client";
import { PaymentHistoryColumn } from "./_components/columns";
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

  const formattedRecords: PaymentHistoryColumn[] = users.map((item) => ({
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
    <div className="flex">
      <div className="flex-1 space-y-4">
        <PaymentHistoryClient data={formattedRecords} />
      </div>
    </div>
  );
};

export default Homeowners;
