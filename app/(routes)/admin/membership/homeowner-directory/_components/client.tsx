"use client";

import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { HomeownerColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Property } from "@prisma/client";

interface HomeownersClientProps {
  data: HomeownerColumn[];
  properties: Property[];
}
const SelectSchema = z.object({
  address: z.string(),
});

export const HomeownersClient: React.FC<HomeownersClientProps> = ({
  data,
  properties,
}) => {
  const { update } = useSession();
  const [occupants, setOccupants] = useState<HomeownerColumn[] | undefined>(
    data
  );

  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      address: "",
    },
  });

  useEffect(() => {
    const address = form.getValues("address");
    properties.filter((property) => {
      if (property.id === address) {
        const houseMembers = data.filter((data) => {
          return property.id === data?.address;
        });

        if (houseMembers) {
          setOccupants(houseMembers);
        } else {
          setOccupants(data);
        }
      }
    });
    form.reset();
  }, [form.watch("address")]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Homeowners Directory (${data.length} users)`}
          description="Manage your system's registered users"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Homeowners of:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select a house address..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {properties.map((property) => {
                      return (
                        <SelectItem key={property.id} value={property.id || ""}>
                          {property.address}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DataTable columns={columns} data={occupants || data} searchKey="email" />
    </>
  );
};
