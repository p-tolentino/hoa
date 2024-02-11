import { currentUser } from "@/lib/auth";
import UserInfo from "./_components/user-info";
import { getInfoById, getVehicleById } from "@/server/data/user-info";

const Profile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const info = await getInfoById(user?.id);

  if (!info) {
    return null;
  }

  const vehicles = await getVehicleById(user?.id);

  if (!vehicles) {
    return null;
  }

  return (
    <div className="flex-1 p-10 space-y-4">
      <UserInfo user={user} info={info} vehicles={vehicles} />
    </div>
  );
};

export default Profile;
