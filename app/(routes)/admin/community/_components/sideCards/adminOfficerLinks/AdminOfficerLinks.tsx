"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, ListItem, UnorderedList } from "@chakra-ui/react";
import { UploadBylaws } from "./_components/UploadBylaws";
import { Hoa } from "@prisma/client";

export default function AdminOfficerLinks({ hoa }: { hoa: Hoa }) {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">For Admin & Officers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <UnorderedList fontFamily={"font.body"}>
            <ListItem>
              <Link fontSize="sm" href="/admin/community/post-approvals">
                Posts for Officer Approval
              </Link>
            </ListItem>
            <ListItem>
              <UploadBylaws hoa={hoa} />
            </ListItem>
          </UnorderedList>
        </CardContent>
      </Card>
    </>
  );
}
