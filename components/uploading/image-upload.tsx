"use client";

import { UploadDropzone } from "@/lib/utils";
import { updateGovtId } from "@/server/actions/user-info";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const Upload = () => {
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (imageUrl: string) => {
    startTransition(() => {
      updateGovtId(imageUrl)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          }

          if (data.success) {
            update();
            router.refresh();
            console.log(data.success);
          }
        })
        .catch(() => {
          console.log("Something went wrong.");
        });
    });
  };

  return (
    <div>
      <UploadDropzone
        appearance={{
          button:
            "ut-uploading:cursor-not-allowed rounded-r-none bg-[#e6c45e] text-black bg-none after:bg-[#dbac1d]",
          label: {
            color: "#ffaa00",
          },
          uploadIcon: {
            color: "#355E3B",
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onSubmit(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default Upload;
