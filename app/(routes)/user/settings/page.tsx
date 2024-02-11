import { currentUser } from "@/lib/auth";
import { SettingsForm } from "./_components/settings-form";
import { getAllProperties } from "@/server/data/property";
import AddVehicle from "./_components/add-vehicle";
import { getVehicleById } from "@/server/data/user-info";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex-row p-10">
      <div className="space-y-4">
        <SettingsForm initialData={user} properties={properties} />
      </div>
      <Separator className="my-5" />
      <div>
        <AddVehicle initialData={user} vehicles={vehicles} />
      </div>
    </div>
  );
};

export default Settings;
