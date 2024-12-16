import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddUserDialogProps {
  onUserAdded: (user: any) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type UserFormData = {
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Cashier";
  password: string;
};

export function AddUserDialog({ onUserAdded, isOpen, onOpenChange }: AddUserDialogProps) {
  const form = useForm<UserFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "Cashier",
      password: "",
    },
  });

  const onSubmit = (data: UserFormData) => {
    const newUser = {
      id: Date.now(),
      ...data,
      status: "Active",
    };
    onUserAdded(newUser);
    onOpenChange(false);
    form.reset();
    toast.success("User added successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Admin" id="admin" />
                        <Label htmlFor="admin">Admin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Manager" id="manager" />
                        <Label htmlFor="manager">Manager</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Cashier" id="cashier" />
                        <Label htmlFor="cashier">Cashier</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Add User</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}