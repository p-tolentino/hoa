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

const Settings = async ({ hoa }: { hoa: Hoa }) => {
  return (
    <div>
      <div className="flex justify-between">
        <Heading
          title="Admin Settings"
          description="Configure your HOA's settings and preferences"
        />
        <Link href="/user/settings">
          <Button size="sm" colorScheme="yellow">
            User Settings
            <RightArrow className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
      <Separator className="mt-4 mb-6" />
      <Stack spacing={8}>
        <HStack gap={5}>
          <Text fontSize="sm" fontWeight="semibold">
            Name of the Homeowners Association:
          </Text>
          <Input
            w="60%"
            size="sm"
            type="string"
            fontFamily="font.body"
            placeholder="Homeowners Association Name"
          />
        </HStack>
        <HStack gap={5}>
          <Text fontSize="sm" fontWeight="semibold">
            Contact Number of the Homeowners Association:
          </Text>
          <Input
            w="40%"
            size="sm"
            type="string"
            fontFamily="font.body"
            placeholder="Homeowners Association Contact Number"
          />
        </HStack>
        <Stack spacing={1}>
          <HStack gap={5}>
            <Text fontSize="sm" fontWeight="semibold">
              Funds:
            </Text>
            <Input
              w="30%"
              size="sm"
              type="number"
              fontFamily="font.body"
              placeholder="Php 1,000,000.00"
            />
          </HStack>
          <Text fontSize="sm" fontFamily="font.body">
            The homeowners association funds will be reflected in the finance
            management feature, specifically in the income and expense
            management page.
          </Text>
        </Stack>
        <Stack spacing={1}>
          <HStack gap={5}>
            <Text fontSize="sm" fontWeight="semibold">
              Upload Homeowners' Association Bylaws:
            </Text>
            <Dialog>
              <DialogTrigger asChild>
                <Button w="10%" size="xs" fontWeight="semibold">
                  Upload Bylaws
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Upload Homeowners' Association Bylaws
                  </DialogTitle>
                  <DialogDescription>
                    "Upload the latest Homeowners' Association Bylaws for
                    members to view."
                  </DialogDescription>
                </DialogHeader>
                {/* File input */}
                <PdfUpload hoa={hoa} />
              </DialogContent>
            </Dialog>
          </HStack>
          <Text fontSize="sm" fontFamily="font.body">
            The uploaded homeowners association bylaws will be displayed in the
            community engagement feature, enabling homeowners to have access on
            the bylaws.
          </Text>
        </Stack>
        <Box mt={5} textAlign="center">
          <Button size="sm" type="submit" colorScheme="yellow">
            Save Changes
          </Button>
        </Box>
      </Stack>
    </div>
  );
};

export default Settings;
