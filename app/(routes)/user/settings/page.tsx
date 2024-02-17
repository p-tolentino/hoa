import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import { currentUser } from "@/lib/auth";
import { SettingsForm } from "./_components/settings-form";
import { getAllProperties } from "@/server/data/property";
import AddVehicle from "./_components/add-vehicle";
// import { getRelativesById } from '@/server/data/user-info'
import { getVehicleById } from "@/server/data/user-info";
import AddRelatives from "./_components/add-relatives";

const Settings = async () => {
  const user = await currentUser();
  const properties = await getAllProperties();

  if (!user || !properties) {
    return null;
  }

  const vehicles = await getVehicleById(user?.id);

  if (!vehicles) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your system settings" />
      </div>
      <Separator className="mt-4 mb-6" />

      {/* Notification Settings */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Notifications Settings</CardTitle>
          <CardDescription>Configure your system notifications</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Email notifications */}
          <FormControl>
            <Text mb="1rem">Receive notifications via email:</Text>
            <Box ml="1rem">
              <Flex gap={10}>
                <Text>Form Submission Confirmation</Text>
                <RadioGroup defaultValue="on" colorScheme="yellow">
                  <Stack direction={"row"} spacing={5}>
                    <Radio value="on">On</Radio>
                    <Radio value="off">Off</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
              <Flex gap={10}>
                <Text>Payment Alerts and Reminders</Text>
                <RadioGroup defaultValue="on" colorScheme="yellow">
                  <Stack direction={"row"} spacing={5}>
                    <Radio value="on">On</Radio>
                    <Radio value="off">Off</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
            </Box>
          </FormControl>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your membership form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex-row p-10">
            <div className="mb-10 space-y-4">
              <SettingsForm initialData={user} properties={properties} />
            </div>
            <Separator className="my-5" />
            <Flex gap="5rem">
              <AddRelatives />
              <AddVehicle initialData={user} vehicles={vehicles} />
            </Flex>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Settings;
