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
  funds?: number;
}

export default function PDFTable<T>({ data, columns, reportTitle, reportSubtitle, hoaInfo, funds }: PDFTableProps<T>) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Box p={5} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
  <Stack spacing={6}>
    {/* Header Section */}
    <Box>
      <Heading fontSize="xl" fontFamily="heading" textAlign="center" mb={2}>
        {reportTitle}
      </Heading>
      <Text fontSize="md" textAlign="center" color="gray.600">
        {reportSubtitle}
      </Text>
      <Text fontSize="sm" textAlign="center" color="gray.500" mt={1}>
        Date Generated: {currentDate}
      </Text>
    </Box>

    {/* HOA Information */}
    <Box pl={4} pt={2} pb={2} backgroundColor="gray.50" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold">{hoaInfo?.name}</Text>
      <Text fontSize="md">Contact Number: {hoaInfo?.contactNumber}</Text>
      {funds && <Text fontSize="md">Homeowner Association Funds: P {funds}</Text>}
    </Box>

    {/* Data Table */}
    <Table variant="simple">
      <Thead bg="green.100">
        <Tr>
          {columns.map((column) => (
            <Th key={column.accessor} fontFamily="body" fontSize="sm" fontWeight="bold">
              {column.header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={index} _even={{ backgroundColor: "blue.50" }}>
            {columns.map((column) => (
              <Td key={column.accessor} fontSize="sm">
                {item[column.accessor]}
              </Td>
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
