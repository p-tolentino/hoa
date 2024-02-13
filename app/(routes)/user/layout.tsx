"use client";

import { Sidebar } from "@/components/system/Sidebar";
import { Flex } from "@chakra-ui/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import InfoGate from "./_components/info-gate";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();

  // TODO: REVERT AFTER ALL DONE
  // if (user?.role === UserRole.ADMIN) {
  //   router.replace("/admin");
  // }

  // return user?.role !== UserRole.ADMIN &&
  //   !user?.info &&
  //   pathname !== "/user/settings" ? (
  //   <InfoGate />
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
