import { Flex } from "@chakra-ui/react";
import ModuleMenuCard from "@/components/system/ModuleMenuCard";
import { currentUser } from "@/lib/auth";

const Membership = async () => {
  const user = await currentUser();

  const userManagement = [
    {
      category: "User Management",
      category_buttons: ["Homeowners Directory", "Admin Officers Directory"],
      category_hrefs: [
        `/admin/membership/homeowner-directory`,
        `/${user?.role.toLowerCase()}/membership/admin-directory`,
      ],
      category_descriptions: [
        "1Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, quo veritatis repudiandae amet deserunt pariatur?",
        "2Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, quo veritatis repudiandae amet deserunt pariatur?",
      ],
    },
  ];

  const propertyManagement = [
    {
      category: "Property Management",
      category_buttons: ["Browse House Lots (Maps)", "Property Information"],
      category_hrefs: [
        `/admin/membership/properties/map`,
        `/admin/membership/properties`,
      ],
      category_descriptions: [
        "1Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, quo veritatis repudiandae amet deserunt pariatur?",
        "2Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, quo veritatis repudiandae amet deserunt pariatur?",
      ],
    },
  ];

  const userRegistration = [
    {
      category: "User Registration",
      category_buttons: ["Membership Form"],
      category_hrefs: [`/${user?.role.toLowerCase()}/settings`],
      category_descriptions: [
        "1Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, quo veritatis repudiandae amet deserunt pariatur?",
      ],
    },
  ];

  return (
    <Flex className="gap-10 p-10">
      {userManagement.map((categoryData, index) => (
        <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
      ))}

      {propertyManagement.map((categoryData, index) => (
        <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
      ))}

      {/* {userRegistrationMenuCard.map((categoryData, index) => (
        <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
      ))} */}
    </Flex>
  );
};

export default Membership;
