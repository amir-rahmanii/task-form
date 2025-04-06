import { GoDotFill } from "react-icons/go";

import AddNewUser from "./+components/AddNewUser";

export default function Home() {
  return (
    <div className="px-4 md:px-5 xl:px-30 py-12">
      <h1 className="font-extrabold text-4xl">Create User</h1>
      <div className="py-4 flex items-center gap-3">
        <span>Dashboard</span> <GoDotFill className="text-muted text-xs" />{" "}
        <span>User</span> <GoDotFill className="text-muted text-xs" />{" "}
        <span className="text-muted">New Users</span>
      </div>
      <AddNewUser />
    </div>
  );
}
