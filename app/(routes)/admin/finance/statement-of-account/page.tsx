import { currentUser } from "@/lib/auth";
import SoaInfo from "./_components/soa-info";
import { getPropertyById } from "@/server/data/user-info";
import { getTransactionByAddress } from "@/server/data/user-transactions";
import { getAllUsers } from "@/server/data/user";

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

  const allUsers = await getAllUsers();

  if (!allUsers) {
    return null;
  }

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        <SoaInfo
          user={user}
          property={property}
          transactions={transactions}
          allUsers={allUsers}
        />
      </div>
    </div>
  );
};

export default StatementOfAccount;
