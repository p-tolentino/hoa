import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Heading,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { getHoaInfo } from "@/server/data/hoa-info";
import { Hoa } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";

interface TableColumn {
  header: string;
  accessor: string; // key from the data object
}

interface PDFTableProps<T> {
  data: any[];
  columns: TableColumn[];
  reportTitle: string;
  reportSubtitle: string;
  hoaInfo: Hoa;
}

export default function PDFTable<T>({ data, columns, reportTitle, reportSubtitle, hoaInfo }: PDFTableProps<T>) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Box p="5%">
        <Stack spacing={8}>
          <Stack spacing={1}>
            <Heading fontSize="md" fontFamily="font.heading">
              {hoaInfo?.name}
            </Heading>
            <Heading fontSize="xs" fontFamily="font.heading">
              Contact Number: {hoaInfo?.contactNumber}
            </Heading>
            <Heading fontSize="xs" fontFamily="font.heading">
          Date Generated: {currentDate}
          </Heading>
          </Stack>
          <Stack spacing={1}>
            <Heading fontSize="sm" fontFamily="font.heading">
              {reportTitle}
            </Heading>
            <Text fontSize="sm">{reportSubtitle}</Text>
          </Stack>
          <Table variant="striped">
            <Thead>
              <Tr>
                {columns.map((column) => (
                  <Th key={column.accessor}>{column.header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr fontSize="xs" key={index}>
                  {columns.map((column) => (
                    <Td key={column.accessor}>{item[column.accessor]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Box>
    </>
  );
}
