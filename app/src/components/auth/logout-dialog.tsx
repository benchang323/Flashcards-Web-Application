// Path: src/components/logout-dialog.tsx
// Modified/Imported from classwork codebase

import { Button } from "@/components/ui/button";
import useMutationUser from "@/hooks/use-mutations-user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LogOutDialog = () => {
  const { logoutUser } = useMutationUser();

  const handleLogout = async () => {
    logoutUser();
  };

  const handleCancel = () => {
    // do nothing!
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Click to login"} variant="destructive">
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleLogout}>
              Logout
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogOutDialog;
