"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { TbCurrencyPeso } from "react-icons/tb";

export default function FinanceCard() {
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
          <Text fontSize="3xl" fontWeight="bold">
            150K
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
