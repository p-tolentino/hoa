"use client";

import { Sidebar } from "@/components/system/Sidebar";
import { Flex } from "@chakra-ui/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter } from "next/navigation";
import { Status, UserRole } from "@prisma/client";
import InfoGate from "./_components/info-gate";
import ApprovalGate from "./_components/approval-gate";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = user?.role === UserRole.ADMIN;
  const existingUserInfo = user?.info;
  const isMemberInfoPath = pathname === "/user/settings"; // TODO: change to whatever new route for member info
  const isApproved = user?.status === Status.ACTIVE;

  // TODO: REVERT AFTER ALL DONE
  // if (isAdmin) {
  //   router.replace("/admin");
  // }

  // return !isAdmin && !existingUserInfo && !isMemberInfoPath ? (
  //   <InfoGate />
  // ) : !isAdmin && existingUserInfo && !isMemberInfoPath && !isApproved ? (
  //   <ApprovalGate />
  // ) :

  return (
    <>
      <Flex>
        <Sidebar />
        <Flex flexDir={"column"} w="100%">
          {children}
        </Flex>
      </Flex>
    </>
  );
};
export default UserLayout;
