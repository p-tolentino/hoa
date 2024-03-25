"use client";

import * as z from "zod";
import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/system/BackButton";

import { HomeownerColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";

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
import { Hoa, Property } from "@prisma/client";
import { Button, HStack } from "@chakra-ui/react";
import { VscRefresh as Refresh } from "react-icons/vsc";
import { getHoaInfo } from "@/server/data/hoa-info";

interface HomeownersClientProps {
  data: HomeownerColumn[];
  properties: Property[];
  hoaInfo: Hoa;
}
const SelectSchema = z.object({
  address: z.string(),
});

interface TableColumn {
  header: string;
  accessor: string;
}

export const HomeownersClient: React.FC<HomeownersClientProps> = ({
  data,
  properties,
  hoaInfo,
}) => {
  const { update } = useSession();
  const [occupants, setOccupants] = useState<HomeownerColumn[]>(data);

  /* Code for PDF Generation */

  const otherDataColumns: TableColumn[] = [
    { header: 'Status', accessor: 'status' },
    { header: 'Position', accessor: 'position' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    // Add more columns as needed
  ];
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Homeowner Directory Report",
    // onAfterPrint: () => alert("Data saved in PDF"),
  });
  /* end of PDF Generation code */

  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      address: "",
    },
  });

  useEffect(() => {
    console.log("triggered");
    const address = form.watch("address");
    if (address) {
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
    }
  }, [form.watch("address"), data]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Homeowners Directory (${data.length} users)`}
          description="Manage your system's registered users"
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <BackButton />
        </HStack>
      </div>
      <Separator />
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-3/5">
                <FormLabel>Homeowners of:</FormLabel>
                <div className="flex">
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
                          <SelectItem
                            key={property.id}
                            value={property.id || ""}
                          >
                            {property.address}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => form.reset()} ml={2}>
                    <Refresh fontSize="xl" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
        {hoaInfo && (
        <PDFTable 
          data={form.watch("address") !== "" ? occupants : data}
          columns={otherDataColumns} 
          reportTitle="Homeowner Directory Report"
          reportSubtitle="View list of registered homeowners" 
          hoaInfo={hoaInfo}
        />
        )}
        </div>
        
      </div>
      <DataTable
        columns={columns}
        data={form.watch("address") !== "" ? occupants : data}
        searchKey="email"
      />
    </>
  );
};
