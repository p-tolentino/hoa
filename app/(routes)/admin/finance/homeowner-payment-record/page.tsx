import { format } from "date-fns";

import { PaymentRecordClient } from "./_components/client";
import { PaymentRecordColumn } from "./_components/columns";
import { currentUser } from "@/lib/auth";
import { getAllTransactions } from "@/server/data/user-transactions";
import { getAllProperties } from "@/server/data/property";
import { getUserById } from "@/server/data/user";

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

  const formattedRecordsPromises: Promise<PaymentRecordColumn>[] =
    transactions.map(async (item) => {
      let user;
      if (item.paidBy) {
        user = await getUserById(item.paidBy); // Fetch user details only if item.paidBy is available
      }
      const address = properties.find(
        (property) => property.id === item.addressId
      );

      return {
        id: item.id || "",
        address: address?.address || "",
        purpose: item.purpose || "",
        description: item.description || "",
        amount: item.amount.toString() || "",
        status: item.status || "",
        dateIssued: item.createdAt
          ? format(
              new Date(item.createdAt).toISOString().split("T")[0],
              "MMMM dd, yyyy"
            )
          : "",
        datePaid: item.datePaid
          ? format(
              new Date(item.datePaid).toISOString().split("T")[0],
              "MMMM dd, yyyy"
            )
          : "",

        paidBy: user?.info?.lastName || "",
      };
    });

  // Wait for all promises to resolve
  const formattedRecords = await Promise.all(formattedRecordsPromises);

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        <PaymentRecordClient data={formattedRecords} />
      </div>
    </div>
  );
};

export default HomeownersPaymentRecord;
