"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { TbCurrencyPeso } from "react-icons/tb";

interface dashboardPoll {
  count: number;
}

export default function FinanceCard({ count }: dashboardPoll) {
  const currencyFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    // Use these options to control the display of the currency
    minimumFractionDigits: 0, // Avoid showing cents
    maximumFractionDigits: 0, // Avoid showing cents
  });

  return (
    <Box>
      <Flex
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        p={4}
        borderRadius="md"
        boxShadow="md"
        bg="white"
      >
        <Box>
          <Text color="gray.500" textTransform="uppercase" fontSize="xs">
            Budget
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {currencyFormatter.format(count)}
          </Text>
        </Box>
        <Avatar
          bg="pink.400"
          size="lg"
          icon={<TbCurrencyPeso size={24} color="white" />}
        />
      </Flex>
    </Box>
  );
}
