import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import DisputeResolution from "./_components/DisputeResolution";
import Link from "next/link";
import { getHoaInfo } from "@/server/data/hoa-info";

export default async function DisputeProcess() {
  const hoa = await getHoaInfo();

  if (!hoa) {
    return null;
  }

  return (
    <div>
      <Flex justifyContent="space-between">
        <Heading
          title="Dispute Resolution Process Guide"
          description="Read more about the dispute resolution process. "
        />
        <Button as={Link} href="/admin/disputes" size="sm">
          Go Back
        </Button>
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Stack spacing="50px">
        {/* Dispute Resolution */}
        <Box id="disputeResolution">
          <DisputeResolution hoa={hoa} />
        </Box>
      </Stack>
    </div>
  );
}
