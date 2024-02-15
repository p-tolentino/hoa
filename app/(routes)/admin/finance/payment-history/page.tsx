import { Heading } from "@/components/ui/heading";
import React from "react";

export default function PaymentHistory() {
  return (
    <div className="flex items-center justify-between">
      <Heading
        title={`Payment History`}
        description="View your payment transaction history."
      />
    </div>
  );
}
