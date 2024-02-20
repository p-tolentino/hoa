import { format } from "date-fns";

import { PaymentRecordClient } from "./_components/client";
import { PaymentRecordColumn } from "./_components/columns";
import { currentUser } from "@/lib/auth";
import { getAllTransactions } from "@/server/data/user-transactions";
import { getAllProperties } from "@/server/data/property";

const HomeownersPaymentRecord = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const transactions = await getAllTransactions();

  if (!transactions) {
    return null;
  }

  const properties = await getAllProperties();

  if (!properties) {
    return null;
  }

  const formattedRecords: PaymentRecordColumn[] = transactions.map((item) => {
    const address = properties.find((property) => {
      return property.id === item.addressId;
    });

    return {
      id: item.id || "",
      address: address?.address || "",
      purpose: item.id || "",
      description: item.id || "",
      amount: item.id || "",
      status: item.id || "",
      dateIssued: item.createdAt
        ? format(
            new Date(item.createdAt)?.toISOString().split("T")[0],
            "MMMM dd, yyyy"
          )
        : "",
      datePaid: item.datePaid
        ? format(
            new Date(item.datePaid)?.toISOString().split("T")[0],
            "MMMM dd, yyyy"
          )
        : "",
      paidBy: item.id || "",
    };
  });

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        <PaymentRecordClient data={formattedRecords} />
      </div>
    </div>
  );
};

export default HomeownersPaymentRecord;
