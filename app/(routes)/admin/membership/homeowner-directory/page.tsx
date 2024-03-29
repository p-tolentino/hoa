import { format } from "date-fns";

import { HomeownersClient } from "./_components/client";
import { HomeownerColumn } from "./_components/columns";
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

  const formattedUsers: HomeownerColumn[] = users.map((item) => ({
    id: item.id || "",
    name:
      `${item.info?.firstName || "-"} ${
        item.info?.middleName ? `${`${item.info?.middleName}`[0]}.` : ""
      } ${item.info?.lastName || ""}` || "",
    email: item.email || "",
    status: item.status || "",
    type: item.info?.type || "",
    position: item.info?.position || "",
    phoneNumber: item.info?.phoneNumber || "",
    birthDay: item.info?.birthDay
      ? format(
          new Date(item.info?.birthDay)?.toISOString().split("T")[0],
          "MMMM dd, yyyy"
        )
      : "",
    address: item.info?.address || "",
    role: item.role || "",
    bio: item.info?.bio || "",
    image: item.image || "",
  }));

  return (
    <div className="flex p-10">
      <div className="flex-1 space-y-4">
        <HomeownersClient data={formattedUsers} />
      </div>
    </div>
  );
};

export default Homeowners;
