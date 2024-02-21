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

const SoaTableSummary = ({
  data,
}: {
  data: {
    purpose: string;
    debit: string;
    credit: string;
  }[];
}) => {
  // Function to calculate sum of debit
  const calculateDebitSum = () => {
    return data.reduce(
      (total, fee) => total + parseFloat(fee.debit.replace(",", "")),
      0
    );
  };

  // Function to calculate sum of credit
  const calculateCreditSum = () => {
    return data.reduce(
      (total, fee) => total + parseFloat(fee.credit.replace(",", "")),
      0
    );
  };

  // Function to calculate balance due
  const calculateBalanceDue = () => {
    const debitSum = calculateDebitSum();
    const creditSum = calculateCreditSum();
    return (creditSum - debitSum).toFixed(2); // Round to 2 decimal places
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
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((fee, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{fee.purpose}</TableCell>
                <TableCell className="font-medium text-right">
                  {fee.debit}
                </TableCell>
                <TableCell className="font-medium text-right">
                  {fee.credit}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-semibold text-right">
                ₱ {formatNumber(debitSum)} {/* Display formatted debit sum */}
              </TableCell>
              <TableCell className="font-semibold text-right">
                ₱ {formatNumber(creditSum)} {/* Display formatted credit sum */}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="text-lg font-bold">
                Balance Due
              </TableCell>
              <TableCell className="text-xl font-bold text-right text-red-700">
                ₱ {formatNumber(parseFloat(balanceDue))}
                {/* Display formatted balance due */}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <Button className="mt-5 text-white lg:text-lg font-semibold bg-[#355E3B]">
        Pay Now
      </Button>
    </div>
  );
};

export default SoaTableSummary;
