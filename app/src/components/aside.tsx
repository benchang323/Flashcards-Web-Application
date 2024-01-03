// Path: app/src/components/aside.tsx

import LogOutDialog from "./auth/logout-dialog";
import LogInDialog from "./auth/login-dialog";
import { RegisterDialog } from "./auth/register-dialog";
import { useStore } from "@/lib/store";

const Aside = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="flex flex-col gap-2 p-4">
      {user ? <LogOutDialog /> : <LogInDialog />}
      {!user && <RegisterDialog />}
    </div>
  );
};

export default Aside;
