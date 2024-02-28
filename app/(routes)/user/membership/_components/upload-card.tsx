"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import Upload from "./image-upload";
import { Property, PropertyDocument } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewDocument } from "./view-document";
import { useState } from "react";

interface UploadCardProps {
  title: string;
  description: string;
  property: Property;
  document: PropertyDocument | null;
}

const UploadCard: React.FC<UploadCardProps> = ({
  title,
  description,
  property,
  document,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ViewDocument
        title={title}
        description={description}
        isOpen={open}
        imageUrl={document?.imageUrl || ""}
        onClose={() => setOpen(false)}
      />
      <Card className="w-full h-full border-gray-300 shadow-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="name">Document:</Label>
          <Upload title={title} property={property} />

          <div className="flex justify-center mt-5">
            <Button
              className="text-black bg-yellow-400 hover:bg-yellow-500"
              disabled={!document}
              onClick={() => setOpen(true)}
            >
              {`${
                document ? "View Current Document" : "No uploaded document yet"
              }`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadCard;
