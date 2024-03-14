import { currentUser } from "@/lib/auth";

const Membership = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return <div>Membership</div>;
};

export default Membership;
