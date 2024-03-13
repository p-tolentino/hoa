import { currentUser } from "@/lib/auth";
import SoaInfo from "./_components/soa-info";
import { getPropertyById } from "@/server/data/user-info";
import { getTransactionByAddress } from "@/server/data/user-transactions";
import { getAllUsers } from "@/server/data/user";
import { addDays } from "date-fns";
import {
  createAssocDue,
  overdueTransaction,
} from "@/server/actions/user-transactions";
import { PaymentStatus } from "@prisma/client";

const StatementOfAccount = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const property = await getPropertyById(user?.id);

  if (!property) {
    return null;
  }

  const transactions = await getTransactionByAddress(user?.info?.address);

  if (!transactions) {
    return null;
  }

  const existingAssocDuesBill = transactions.find((transaction) => {
    return (
      transaction.purpose === "Association Dues" &&
      transaction.createdAt.getMonth() + 1 === new Date().getMonth() + 1
    );
  });

  if (!existingAssocDuesBill) {
    await createAssocDue().then((data) => {
      if (data) {
        console.log(data.success);
      }
    });
  }

  transactions.map((transaction) => {
    const deadline = addDays(new Date(transaction.createdAt), 30);

    if (transaction.status === PaymentStatus.UNPAID && new Date() > deadline) {
      transaction.status = PaymentStatus.OVERDUE;
      overdueTransaction(transaction.id);
    }
  });

  const updatedTransactions = await getTransactionByAddress(
    user?.info?.address
  );

  if (!updatedTransactions) {
    return null;
  }

  const monthlyUnpaidTransactions = updatedTransactions.filter(
    (transaction) => {
      if (
        transaction.createdAt.getMonth() >= new Date().getMonth() - 1 &&
        transaction.status !== PaymentStatus.PAID
      ) {
        return transaction;
      }
    }
  );

  const allUsers = await getAllUsers();

  if (!allUsers) {
    return null;
  }

  await Promise.all(monthlyUnpaidTransactions);

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        <SoaInfo
          user={user}
          property={property}
          transactions={monthlyUnpaidTransactions}
          allUsers={allUsers}
        />
      </div>
    </div>
  );
};

export default StatementOfAccount;
