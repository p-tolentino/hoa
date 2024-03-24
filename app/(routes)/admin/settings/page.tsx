import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Stack, Button, Text, Input, HStack, Box } from "@chakra-ui/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import { RxArrowRight as RightArrow } from "react-icons/rx";
import { Hoa } from "@prisma/client";
import PdfUpload from "./_components/pdf-upload";
import CreateHoa from "./_components/createHoa";
import { newHoaSchema } from "@/server/schemas";


const Settings = async ({ hoa }: { hoa: Hoa }) => {
  return <CreateHoa/>
};

export default Settings;
