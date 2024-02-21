import { currentUser } from "@/lib/auth";
import SoaInfo from "./_components/soa-info";
import { getPropertyById } from "@/server/data/user-info";

const StatementOfAccount = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const property = await getPropertyById(user?.id);

  if (!property) {
    return null;
  }

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        <SoaInfo user={user} property={property} />
      </div>
    </div>
  );
};

export default StatementOfAccount;
