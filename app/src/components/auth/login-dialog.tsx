// Path: src/components/login-dialog.tsx
// Modified/Imported from classwork codebase

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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

const LogInDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useMutationUser();
  const { toast } = useToast();

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Sorry! username or password cannot be empty! 🙁",
        description: `Please enter your login credentials.`,
      });
      return;
    }
    await loginUser(username, password);
    clearForm();
  };

  const handleCancel = () => {
    clearForm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Login"} variant="default" size="sm">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Please provide your credentials here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              className="col-span-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="col-span-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogInDialog;
