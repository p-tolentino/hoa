import { currentUser } from "@/lib/auth";
import { getAllProperties } from "@/server/data/property";
import { MapViewInfo } from "./_components/map-view-info";
import { Heading } from "@/components/ui/heading";
import { getAllUsers } from "@/server/data/user";
import { getAllPropertyDocuments } from "@/server/data/property-document";
import { Separator } from "@/components/ui/separator";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Settings = async () => {
  const user = await currentUser();
  const properties = await getAllProperties();
  const allUsers = await getAllUsers();

  if (!user || !properties || !allUsers) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Browse Properties"
          description="Browse properties using Google Maps"
        />
        <Button size="sm" as={Link} href="/admin/membership">
          Go Back
        </Button>
      </div>
      <Separator className="mt-2" />
      <div className="space-y-4">
        <MapViewInfo properties={properties} users={allUsers} />
      </div>
    </>
  );
};

export default Settings;
