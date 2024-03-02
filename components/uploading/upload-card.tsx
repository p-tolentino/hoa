"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import Upload from "./image-upload";
import { Button } from "@/components/ui/button";
import { ViewDocument } from "./view-document";
import { useState } from "react";

interface UploadCardProps {
  title: string;
  description: string;
  idUrl: string;
}

const UploadCard: React.FC<UploadCardProps> = ({
  title,
  description,
  idUrl,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ViewDocument
        title={title}
        description={description}
        isOpen={open}
        imageUrl={idUrl || ""}
        onClose={() => setOpen(false)}
      />
      <Card className="w-full h-full border-gray-300 shadow-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="name">Document:</Label>
          <Upload />

          <div className="flex justify-center mt-5">
            <Button
              className="text-black bg-yellow-400 hover:bg-yellow-500"
              disabled={!idUrl}
              onClick={() => setOpen(true)}
            >
              {`${
                idUrl ? "View Current Document" : "No uploaded document yet"
              }`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadCard;
