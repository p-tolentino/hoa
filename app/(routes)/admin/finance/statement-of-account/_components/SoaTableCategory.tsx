import { Badge } from "@/components/ui/badge";
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
import { getUserById } from "@/server/data/user";
import { PaymentStatus, UserTransaction } from "@prisma/client";
import { format } from "date-fns";
import { PayNow } from "./pay-now";
import { ExtendedUser } from "@/next-auth";

const SoaTableCategory = ({
  data,
  users,
}: {
  data: UserTransaction[];
  users: ExtendedUser[];
}) => {
  // Calculate the sum of paid and unpaid amounts
  const calculateSums = () => {
    let paidSum = 0;
    let unpaidSum = 0;
    data.forEach((fee) => {
      if (fee.status === PaymentStatus.PAID) {
        paidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
      } else {
        unpaidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
      }
    });
    return {
      paidSum,
      unpaidSum,
    };
  };

  // Function to format number with commas and two decimal points
  const formatNumber = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Get the sums and balance due
  const { paidSum, unpaidSum } = calculateSums();

  // Determine if the balance due is negative
  const isFullyPaid = unpaidSum === 0;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-3 border rounded-md">
        <Table>
          <TableHeader className="bg-[#F0CB5B]">
            <TableRow>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[150px]">Date Issued</TableHead>
              <TableHead className="w-[150px]">Date Paid</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Paid By</TableHead>
              <TableHead className="text-right">Amount Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((fee, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Badge
                    className={
                      fee.status === PaymentStatus.PAID
                        ? "bg-green-700"
                        : fee.status === PaymentStatus.OVERDUE
                        ? "bg-red-700"
                        : fee.status === PaymentStatus.UNPAID
                        ? "bg-yellow-600"
                        : "display-none"
                    }
                  >
                    {fee.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {fee.createdAt
                    ? format(
                        new Date(fee.createdAt)?.toISOString().split("T")[0],
                        "MMMM dd, yyyy"
                      )
                    : ""}
                </TableCell>
                <TableCell className="font-medium">
                  {fee.datePaid
                    ? format(
                        new Date(fee.datePaid)?.toISOString().split("T")[0],
                        "MMMM dd, yyyy"
                      )
                    : ""}
                </TableCell>
                <TableCell className="font-medium">{fee.description}</TableCell>
                <TableCell className="font-medium">
                  {`${
                    users?.find((user) => user.id === fee.paidBy)?.info
                      .firstName || ""
                  } ${
                    users?.find((user) => user.id === fee.paidBy)?.info
                      .lastName || ""
                  }`}
                </TableCell>
                <TableCell className="font-medium text-right">
                  {formatNumber(parseFloat(fee.amount.toFixed(2)))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-lg font-bold">
                Balance Due
              </TableCell>
              <TableCell
                className={`font-bold text-right text-xl ${
                  isFullyPaid ? "" : "text-red-700"
                }`}
              >
                ₱ {formatNumber(parseFloat(unpaidSum.toFixed(2)))}
                {/* Display balance due */}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {Number(unpaidSum) !== 0 && (
        <PayNow
          amountToPay={unpaidSum.toString()}
          transactionsToUpdate={data}
        />
      )}
    </div>
  );
};

export default SoaTableCategory;
