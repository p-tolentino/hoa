import ReportForm from "./_components/report-form";
import { currentUser } from '@/lib/auth'
import { getAllInfo } from '@/server/data/user-info'

export const DisputeForm = async () => {
  const user = await currentUser()

  if (!user) {
    return null
  }

  const allUsers = await getAllInfo()

  if (!allUsers) {
    return null
  }

  // const disputeTypes = await getAllDisputeTypes()

  // if (!disputeTypes) {
  //   return null
  // }

  return (
    <>
      {/* <ReportForm disputeTypes={disputeTypes} violationTypes={violationTypes} users={allUsers || null} /> */}
      <ReportForm />
    </>
  );
};

export default DisputeForm;
