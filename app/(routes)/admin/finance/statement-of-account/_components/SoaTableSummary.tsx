import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PayNow } from "./pay-now";
import { UserTransaction } from "@prisma/client";

const SoaTableSummary = ({
  data,
  transactionsToUpdate,
}: {
  data: {
    purpose: string;
    debit: number;
    credit: number;
  }[];
  transactionsToUpdate: UserTransaction[];
}) => {
  // Function to calculate sum of debit
  const calculateDebitSum = () => {
    return data.reduce(
      (total, fee) => total + parseFloat(fee.debit.toString().replace(",", "")),
      0
    );
  };

  // Function to calculate sum of credit
  const calculateCreditSum = () => {
    return data.reduce(
      (total, fee) =>
        total + parseFloat(fee.credit.toString().replace(",", "")),
      0
    );
  };

  // Function to calculate balance due
  const calculateBalanceDue = () => {
    return calculateCreditSum().toFixed(2); // Round to 2 decimal places
  };

  // Function to format number with commas and two decimal points
  const formatNumber = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Store the sums in constant variables
  const debitSum = calculateDebitSum();
  const creditSum = calculateCreditSum();
  const balanceDue = calculateBalanceDue();

  return (
    <div className="flex flex-col items-center">
      <div className="border rounded-md mb-3 w-[50vw]">
        <Table>
          <TableHeader className="bg-[#F0CB5B]">
            <TableRow>
              <TableHead>Fees</TableHead>
              {/* <TableHead className="text-right">Debit</TableHead> */}
              <TableHead className="text-right">Credit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((fee, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{fee.purpose}</TableCell>
                {/* <TableCell className="font-medium text-right">
                  {formatNumber(fee.debit)}
                </TableCell> */}
                <TableCell className="font-medium text-right">
                  ₱ {formatNumber(fee.credit)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              {/* <TableCell className="font-semibold text-right">
                ₱ {formatNumber(debitSum)}
              </TableCell> */}
              <TableCell className="font-semibold text-right">
                ₱ {formatNumber(creditSum)}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-lg font-bold">Balance Due</TableCell>
              <TableCell className="text-xl font-bold text-right text-red-700">
                ₱ {formatNumber(parseFloat(balanceDue))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {Number(balanceDue) !== 0 && (
        <PayNow
          amountToPay={balanceDue}
          transactionsToUpdate={transactionsToUpdate}
        />
      )}
    </div>
  );
};

export default SoaTableSummary;
