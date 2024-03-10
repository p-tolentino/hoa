import { currentUser } from "@/lib/auth";
import ReportForm from "./_components/report-form";
import { getAllViolationTypes } from "@/server/data/violation-type";

export const ViolationForm = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const types = await getAllViolationTypes();

  if (!types) {
    return null;
  }

  return (
    <>
      <ReportForm violationTypes={types} />
    </>
  );
};

export default ViolationForm;
