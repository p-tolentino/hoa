import { Box, Flex } from '@chakra-ui/react'
import ModuleMenuCard from '@/components/system/ModuleMenuCard'
import { currentUser } from '@/lib/auth'
import { Heading } from '@/components/ui/heading'

const Membership = async () => {
  const user = await currentUser()

  const userManagement = [
    {
      category: 'User Management',
      category_buttons: ['Homeowners Directory', 'Admin & Officers Directory'],
      category_users: 'Admins, Officers, and Board of Directors',
      category_hrefs: [
        `/admin/membership/homeowner-directory`,
        `/${user?.role.toLowerCase()}/membership/admin-directory`
      ],
      category_descriptions: [
        "View the list of all Homeowners' Association-registered homeowners.",
        "View the list of all admins and officers within the Homeowners' Association."
      ]
    }
  ]

  const propertyManagement = [
    {
      category: 'Property Management',
      category_users: 'Admins, Officers, and Board of Directors',
      category_buttons: ['Browse Properties (Maps)', 'Property Information'],
      category_hrefs: [
        `/admin/membership/properties/map`,
        `/admin/membership/properties`
      ],
      category_descriptions: [
        "View property information and browse through properties owned by the Homeowners' Association.",
        "All homeowners are required to complete the property information form before gaining access to the system's functionalities."
      ]
    }
  ]

  return (
    <>
      <Heading
        title='Membership'
        description='Navigate through the Membership module'
      />
      <Flex className='gap-10 pt-8'>
        {userManagement.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}

        {propertyManagement.map((categoryData, index) => (
          <ModuleMenuCard key={index} data={categoryData}></ModuleMenuCard>
        ))}
      </Flex>
    </>
  )
}

export default Membership
