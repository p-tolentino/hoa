import { SimpleGrid } from "@chakra-ui/react";
import ModuleMenuCard from "@/components/system/ModuleMenuCard";
import { currentUser } from "@/lib/auth";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "@prisma/client";

const Membership = async () => {
  const user = await currentUser();

  const userManagement = [
    {
      category: "User Management",
      category_users: "Admins, Officers, and Board of Directors",
      category_buttons: [
        {
          text: "Homeowners Directory",
          href: `/admin/membership/homeowner-directory`,
          description:
            "View the list of all Homeowners' Association-registered homeowners.",
        },
        {
          text: "Admin & Officers Directory",
          href: `/${
            user?.role !== UserRole.USER ? "admin" : "user"
          }/membership/admin-directory`,
          description:
            "View the list of all admins and officers within the Homeowners' Association.",
        },
      ],
    },
  ];

  const propertyManagement = [
    {
      category: "Property Management",
      category_users: "Admins, Officers, and Board of Directors",
      category_buttons: [
        {
          text: "Browse Properties (Maps)",
          href: `/admin/membership/properties/map`,
          description:
            "View property information and browse through properties owned by the Homeowners' Association.",
        },
        {
          text: "Property Information",
          href: `/admin/membership/properties`,
          description:
            "All homeowners are required to complete the property information form before gaining access to the system's functionalities.",
        },
      ],
    },
  ];

  return (
    <>
      <Heading
        title="Membership"
        description="Navigate through the Membership module"
      />
      <Separator className="mt-4 mb-6" />
      <SimpleGrid spacing={10} columns={{ md: 1, lg: 3 }}>
        {/* User Management */}
        {userManagement.map((categoryData) => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
        {/* Property Management */}
        {propertyManagement.map((categoryData) => (
          <ModuleMenuCard
            key={categoryData.category}
            data={categoryData}
          ></ModuleMenuCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Membership;
