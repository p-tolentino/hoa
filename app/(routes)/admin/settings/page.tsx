import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { RxArrowRight as RightArrow } from "react-icons/rx";

const Settings = async () => {
  return (
    <div>
      <div className="flex justify-between">
        <Heading
          title="Admin Settings"
          description="Configure your HOA's settings and preferences"
        />
        <Link href="/user/settings">
          <Button className="text-black bg-yellow-400 end hover:bg-yellow-500">
            User Settings
            <RightArrow className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
      <Separator className="mt-4 mb-6" />
    </div>
  );
};

export default Settings;
