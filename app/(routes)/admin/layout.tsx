import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/system/Sidebar";

import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import Link from "next/link";

import { FaUserShield as Admin } from "react-icons/fa";
import { getNotificationsByUserId } from "@/server/data/notification";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const role = await currentRole();

  // TODO: REVERT AFTER ALL DONE
  // return role === UserRole.USER ? (
  //   <div className="flex items-center justify-center min-h-full align-middle">
  //     <Card className="w-[600px] mt-10">
  //       <CardHeader>
  //         <p className="flex justify-center text-2xl font-semibold">
  //           <Admin className="mr-2 text-3xl" />
  //           Admin-only Access
  //         </p>
  //       </CardHeader>
  //       <CardContent className="space-y-4">
  //         <FormError message="You do not have permission to view this page." />
  //         <div className="flex items-center justify-center">
  //           <Link href="/user/membership">
  //             <Button className="text-black bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600">
  //               ← Return to Homepage
  //             </Button>
  //           </Link>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </div>
  // ) :

  const notifications = await getNotificationsByUserId(user?.id);


  return (
    <Flex>
      <Sidebar
        notifications={ notifications ?
          notifications?.filter(notif => notif.isArchived === false).sort((a: any, b: any) => b.createdAt - a.createdAt) :
          null
        }
      />
      <Box className="p-10" w="100%">
        {children}
      </Box>
    </Flex>
  );
};

export default AdminLayout;
