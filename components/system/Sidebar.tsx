"use client";

import { cn } from "@/lib/utils";

import {
  FiBriefcase,
  FiCalendar,
  FiUserCheck,
  FiUsers,
  FiMenu,
} from "react-icons/fi";
import Link from "next/link";
import { TbCurrencyPeso } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { PiBinocularsBold, PiBroomFill } from "react-icons/pi";
import { TfiDashboard as Dashboard } from "react-icons/tfi";
import { FaUser as User } from "react-icons/fa";
import { RxGear as Gear, RxExit as Exit } from "react-icons/rx";
import { LuContact2 as Contact } from "react-icons/lu";
import { BsNewspaper } from "react-icons/bs";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Separator } from "../ui/separator";
import { LogoutButton } from "../auth/logout-button";
import { UserRole } from "@prisma/client";

import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Icon,
  Menu,
  MenuButton,
  Box,
} from "@chakra-ui/react";
import { UserButton } from "../auth/user-button";
import NotificationCenter from "./NotifcationCenter";

export function Sidebar() {
  const user = useCurrentUser();
  const pathname = usePathname();

  const sidebarRoutes = [
    {
      label: "Dashboard",
      href: `/${user?.role.toLowerCase()}/dashboard`,
      icon: Dashboard,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/dashboard`),
    },
    {
      label: "Membership",
      href: `/${user?.role.toLowerCase()}/membership`,
      icon: FiUserCheck,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/membership`),
    },
    {
      label: "Finance Management",
      href: `/${user?.role.toLowerCase()}/finance`,
      icon: TbCurrencyPeso,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/finance`),
    },
    {
      label: "Community Engagement",
      href: `/${user?.role.toLowerCase()}/community`,
      icon: FiUsers,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/community`),
    },
    {
      label: "Dispute Resolution",
      href: `/${user?.role.toLowerCase()}/disputes`,
      icon: FiBriefcase,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/disputes`),
    },
    {
      label: "Violation Monitoring",
      href: `/${user?.role.toLowerCase()}/violations`,
      icon: PiBinocularsBold,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/violations`),
    },
    {
      label: "Facility Reservation",
      href: `/${user?.role.toLowerCase()}/facility`,
      icon: FiCalendar,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/facility`),
    },
    {
      label: "Maintenance Handling",
      href: `/${user?.role.toLowerCase()}/maintenance`,
      icon: PiBroomFill,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/maintenance`),
    },
    {
      label: "Election Management",
      href: `/${user?.role.toLowerCase()}/election`,
      icon: BsNewspaper,
      active: pathname.startsWith(`/${user?.role.toLowerCase()}/election`),
    },
  ];

  const membershipRoutes = [];

  const financeRoutes = [];

  const communityRoutes = [];

  const disputeRoutes = [];

  const violationRoutes = [];

  const facilityRoutes = [];

  const maintenanceRoutes = [];

  const electionRoutes = [];

  const profileRoutes = [
    {
      label: "My Profile",
      href: `/${user?.role.toLowerCase()}/profile`,
      icon: User,
      active: pathname === `/${user?.role.toLowerCase()}/profile`,
    },
    {
      label: "Settings",
      href: `/${user?.role.toLowerCase()}/settings`,
      icon: Gear,
      active: pathname === `/${user?.role.toLowerCase()}/settings`,
    },
  ];

  // For responsiveness when window is resized
  const [sidebarSize, changeSidebarSize] = useState("large");
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768; // You can adjust the breakpoint (768) as needed
      changeSidebarSize(isSmallScreen ? "small" : "large");
    };
    // Initial check on mount
    handleResize();
    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Flex
      pos="sticky"
      top={0}
      h="100vh"
      minW={sidebarSize === "small" ? "75px" : "280px"}
      flexDir="column"
      justifyContent="space-between"
      bgColor={"brand.500"}
      color={"white"}
      zIndex={3}
    >
      <Flex
        p={sidebarSize === "small" ? "17%" : "5%"}
        flexDir="column"
        w="100%"
        alignItems={sidebarSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Flex justify="space-between" w="100%">
          <IconButton
            background="none"
            color={"white"}
            _hover={{ background: "none" }}
            icon={<FiMenu />}
            onClick={() => {
              if (sidebarSize === "small") changeSidebarSize("large");
              else changeSidebarSize("small");
            }}
            aria-label={""}
            alignSelf={"flex-start"}
          />
          <NotificationCenter />
        </Flex>

        {sidebarRoutes.map((route) => {
          if (route.label === "Membership" && user?.role === UserRole.USER) {
            (route.label = "Contact Directory"),
              (route.icon = Contact),
              (route.href = `/${user.role.toLowerCase()}/membership/admin-directory`);

            return (
              <Box
                key={route.label}
                mt={"1.4rem"}
                w="100%"
                alignItems={sidebarSize === "small" ? "center" : "left"}
                fontSize={"sm"}
                fontFamily={"font.body"}
              >
                <Menu placement="right" key={route.label}>
                  <Link
                    href={route.href}
                    className={cn(
                      "p-3 rounded-lg no-underline hover:bg-[#688f6e] hover:text-white transition",
                      route.active ? "bg-[#F0CB5B]" : "bg-transparent"
                    )}
                  >
                    <MenuButton w="100%">
                      <Flex>
                        <Icon
                          as={route.icon}
                          fontSize="xl"
                          color={route.active ? "black" : "white"}
                          className="w-5 h-5"
                        />
                        <Text
                          textAlign={"left"}
                          ml={5}
                          display={sidebarSize === "small" ? "none" : "flex"}
                          color={route.active ? "black" : "white"}
                          fontWeight={route.active ? "bold" : "normal"}
                        >
                          {route.label}
                        </Text>
                      </Flex>
                    </MenuButton>
                  </Link>
                </Menu>
              </Box>
            );
          } else {
            return (
              <Box
                key={route.label}
                mt={"1.4rem"}
                w="100%"
                alignItems={sidebarSize === "small" ? "center" : "left"}
                fontSize={"sm"}
                fontFamily={"font.body"}
              >
                <Menu placement="right" key={route.label}>
                  <Link
                    href={route.href}
                    className={cn(
                      "p-3 rounded-lg no-underline hover:bg-[#688f6e] hover:text-white transition",
                      route.active ? "bg-[#F0CB5B]" : "bg-transparent"
                    )}
                  >
                    <MenuButton w="100%">
                      <Flex>
                        <Icon
                          as={route.icon}
                          fontSize="xl"
                          color={route.active ? "black" : "white"}
                          className="w-5 h-5"
                        />
                        <Text
                          textAlign={"left"}
                          ml={5}
                          display={sidebarSize === "small" ? "none" : "flex"}
                          color={route.active ? "black" : "white"}
                          fontWeight={route.active ? "bold" : "normal"}
                        >
                          {route.label}
                        </Text>
                      </Flex>
                    </MenuButton>
                  </Link>
                </Menu>
              </Box>
            );
          }
        })}
      </Flex>

      <Flex
        p="1rem"
        flexDir="column"
        w="100%"
        alignItems={sidebarSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider
          display={sidebarSize === "small" ? "none" : "flex"}
          mt={"1rem"}
        />
        <Flex
          mt={4}
          align="center"
          display={sidebarSize === "small" ? "none" : "flex"}
        >
          <Avatar
            size="sm"
            src={user?.image || ""}
            bg="yellow.500"
            icon={<User className="w-4 h-4" />}
          />
          <Flex flexDir="column" ml={4}>
            <Heading
              as="h3"
              size="sm"
              fontFamily="font.heading"
              className="capitalize"
            >
              {`${user?.info?.firstName || "-"} ${user?.info?.lastName || ""}`}
            </Heading>
            <Text color="brand.300" fontFamily="font.body">
              {user?.role}
            </Text>
          </Flex>
        </Flex>

        <Flex
          mt={3}
          fontSize={"sm"}
          display={sidebarSize === "small" ? "none" : "flex"}
        >
          <Text as={Link} href={`/user/profile`} fontFamily="font.body">
            My Profile
          </Text>
        </Flex>
        <Flex
          mt={2}
          fontSize={"sm"}
          display={sidebarSize === "small" ? "none" : "flex"}
        >
          <Text
            as={Link}
            href={`/${user?.role.toLowerCase()}/settings`}
            fontFamily="font.body"
          >
            Settings
          </Text>
        </Flex>
        <Flex
          mt={2}
          fontSize={"sm"}
          display={sidebarSize === "small" ? "none" : "flex"}
        >
          <LogoutButton>
            <Text fontFamily="font.body">Logout</Text>
          </LogoutButton>
        </Flex>
      </Flex>

      <Flex
        p="1rem"
        flexDir="column"
        w="100%"
        alignItems={sidebarSize === "small" ? "center" : "flex-start"}
        mb={4}
        mt={4}
        align="center"
        display={sidebarSize === "small" ? "flex" : "none"}
      >
        <UserButton />
      </Flex>
    </Flex>
  );
}

/* V2 */
/* 
return (
    <div
      className={cn(
        "h-[100vh]  bg-[#355E3B] flex items-start space-x-4 lg:space-x-6 text-white"
      )}
    >
      <div className="py-4 space-y-4">
        <div className="px-3 py-2">
          <h1 className="px-4 mb-2 text-lg font-semibold tracking-tight ">
            Modules
          </h1>
          <div className="space-y-4">
            {sidebarRoutes.map((route) => {
              if (
                route.label === "Membership" &&
                user?.role === UserRole.USER
              ) {
                return null;
              } else {
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex justify-between font-medium transition-colors hover:text-primary",
                      route.active ? "text-black" : "text-white"
                    )}
                  >
                    <Button
                      className={cn(
                        "justify-start w-full mr-2",
                        route.active
                          ? "bg-[#F0CB5B] text-black hover:bg-[#F0CB5B]"
                          : "bg-[#355E3B] hover:bg-[#93ca9b] hover:text-black"
                      )}
                    >
                      {route.icon}
                      {route.label}
                    </Button>
                  </Link>
                );
              }
            })}
          </div>
        </div>

        <div className="px-3 py-[100px]">
          <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">
            Account
          </h2>
          <div className="space-y-1">
            {profileRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex justify-between font-medium transition-colors hover:text-primary",
                  route.active ? "text-black" : "text-white"
                )}
              >
                <Button
                  className={cn(
                    "justify-start w-full",
                    route.active
                      ? "bg-[#F0CB5B] text-black hover:bg-[#F0CB5B]"
                      : "bg-[#355E3B] hover:bg-[#93ca9b] hover:text-black"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}
          </div>
          <Separator className="my-4 opacity-50" />
          <LogoutButton>
            <Button
              className=" justify-start w-full bg-[#355E3B] hover:bg-[#93ca9b] hover:text-black"
              variant="ghost"
            >
              <Exit className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </LogoutButton>
        </div>
      </div>
    </div>
  );
*/
