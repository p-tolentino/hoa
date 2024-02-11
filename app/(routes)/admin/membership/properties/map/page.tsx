import { currentUser } from "@/lib/auth";
import { getAllProperties } from "@/server/data/property";
import { MapViewInfo } from "./_components/map-view-info";

const Settings = async () => {
  const user = await currentUser();
  const properties = await getAllProperties();

  if (!user || !properties) {
    return null;
  }

  return (
    <div className="flex-row p-10">
      <div className="space-y-4">
        <MapViewInfo data={properties} />
      </div>
    </div>
  );
};

export default Settings;
