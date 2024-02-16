"use client";

import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

interface HomeownersClientProps {
  data: HomeownerColumn[];
}
const SelectSchema = z.object({
  address: z.string(),
});

export const HomeownersClient: React.FC<HomeownersClientProps> = ({ data }) => {
  const { update } = useSession();
  const [propertyInfo, setPropertyInfo] = useState({
    occupant: "-",
    status: "-",
    userId: "-",
  });
  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      address: "-",
    },
  });

  useEffect(() => {
    const address = form.getValues("address");
    data.filter((property) => {
      if (property.address === address) {
        setPropertyInfo({
          occupant: property.name || "-",
          status: property.status !== "" ? "Occupied" : "Vacant",
          userId: property.id || "",
        });
      }
    });
    form.reset();
    // TODO: Include documents
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
                <FormLabel>Please select a house address:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select address" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((property) => {
                      return (
                        <SelectItem
                          key={property.id}
                          value={property.address || ""}
                        >
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
      <DataTable columns={columns} data={data} searchKey="email" />
    </>
  );
};
