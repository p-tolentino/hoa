import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PdfUpload from "./pdf-upload";
import { Button } from "@chakra-ui/react";
import { Hoa } from "@prisma/client";

export async function UploadBylaws({ hoa }: { hoa: Hoa }) {
  const title = "Upload Homeowners' Association Bylaws";
  const description =
    "Upload the latest Homeowners' Association Bylaws for members to view.";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" color="black" fontWeight="normal">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* File input */}
        <PdfUpload hoa={hoa} />

        <DialogFooter>
          {/* <Button type="submit" colorScheme="yellow">
            Publish
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
