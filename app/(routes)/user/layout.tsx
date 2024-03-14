"use client";

import { Sidebar } from "@/components/system/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter } from "next/navigation";
import { Notification, Status, UserRole } from "@prisma/client";
import InfoGate from "./_components/info-gate";
import ApprovalGate from "./_components/approval-gate";
import { getNotificationsByUserId } from "@/server/data/notification";
import { useEffect, useState } from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();

  const [notifications, setNotifications] = useState<Notification[] | null>();

  if (!user) {
    return null;
  }

  const isAdmin = user?.role === UserRole.ADMIN;
  const existingUserInfo = user?.info;
  const isMemberInfoPath = pathname === "/user/settings";
  const isApproved = user?.status === Status.ACTIVE;

  // TODO: REVERT AFTER ALL DONE
  // if (isAdmin) {
  //   router.replace("/admin/dashboard");
  // }

  // return !isAdmin && !existingUserInfo && !isMemberInfoPath ? (
  //   <InfoGate />
  // ) : !isAdmin && existingUserInfo && !isMemberInfoPath && !isApproved ? (
  //   <ApprovalGate />

  useEffect(() => {
    const getNotifs = async () => {
      await getNotificationsByUserId(user.id).then((data) => {
        if (data) {
          console.log(data)
          setNotifications(data);
        }
      });
    };
    getNotifs();
  }, []);

  return (
    <>
      <Flex>
        <Sidebar
          notifications={
            notifications?.filter(notif => notif.isArchived === false).sort(
              (a: any, b: any) => b.createdAt - a.createdAt
            ) || null
          }
        />
        <Box className="p-10" w="100%">
          {children}
        </Box>
      </Flex>
    </>
  );
};
export default UserLayout;
