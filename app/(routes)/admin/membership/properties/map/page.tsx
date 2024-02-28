import { currentUser } from "@/lib/auth";
import { getAllProperties } from "@/server/data/property";
import { MapViewInfo } from "./_components/map-view-info";
import { Heading } from "@/components/ui/heading";
import { getAllUsers } from "@/server/data/user";
import { getAllPropertyDocuments } from "@/server/data/property-document";

const Settings = async () => {
  const user = await currentUser();
  const properties = await getAllProperties();
  const allUsers = await getAllUsers();
  const documents = await getAllPropertyDocuments();

  if (!user || !properties || !allUsers || !documents) {
    return null;
  }

  return (
    <div className="flex-row">
      <Heading
        title="Browse Properties"
        description="Browse properties using Google Maps"
      />
      <div className="space-y-4">
        <MapViewInfo
          properties={properties}
          documents={documents}
          users={allUsers}
        />
      </div>
    </div>
  );
};

export default Settings;
