import { currentUser } from "@/lib/auth";
import ReportForm from "./_components/report-form";

export const ViolationForm = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <ReportForm />
    </>
  );
};

export default ViolationForm;
