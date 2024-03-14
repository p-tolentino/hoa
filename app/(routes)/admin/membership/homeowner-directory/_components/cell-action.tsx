"use client";

import {
  LuFileEdit as Edit,
  LuCopy as Copy,
  LuTrash as Trash,
  LuMoreHorizontal as MoreHorizontal,
  LuCheckCheck as Check,
} from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { HomeownerColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { updateUserStatus } from "@/server/actions/user-info";
import { Status } from "@prisma/client";

interface CellActionProps {
  data: HomeownerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const onApprove = async (id: string) => {
    startTransition(() => {
      updateUserStatus(id)
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

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    console.log("Property ID copied to the clipboard.");
  };

  const onDelete = async (id: string) => {
    startTransition(() => {
      console.log("TODO: Delete user");
      setOpen(false);
      // deleteProperty(id)
      //   .then((data) => {
      //     if (data.error) {
      //       console.log(data.error);
      //     }

      //     if (data.success) {
      //       update();
      //       setOpen(false);
      //       router.refresh();
      //       console.log(data.success);
      //     }
      //   })
      //   .catch(() => {
      //     console.log("Something went wrong.");
      //   });
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {data.status === Status.PENDING && (
            <>
              <DropdownMenuItem
                disabled={!data.govtId || !data.address}
                onClick={() => onApprove(data.id)}
              >
                {" "}
                {!data.address ? (
                  "(User has not set up account yet)"
                ) : !data.govtId ? (
                  "(No Government ID Uploaded Yet)"
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Approve Membership
                  </>
                )}
              </DropdownMenuItem>
              <Separator />
            </>
          )}
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="w-4 h-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          {/* 
          
          // !! EDIT USER NOT AVAILABLE FOR ADMIN (wouldn't be logical for someone else to edit your information through the system)
          
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/products/${data.id}`)
              console.log("TRIGGER GO TO EDIT")
            }
          >
            <Edit className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem> 
          
          */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
