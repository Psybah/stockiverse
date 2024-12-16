import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onDeleteUser: (id: number) => void;
}

export function UserTable({ users, onDeleteUser }: UserTableProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-500';
      case 'manager':
        return 'bg-blue-500';
      case 'cashier':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDeleteUser = (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDeleteUser(user.id);
      toast.success(`${user.name} has been removed`);
    }
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
                <span className="block md:hidden text-sm text-muted-foreground">
                  {user.email}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">{user.email}</TableCell>
              <TableCell>
                <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{user.status}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteUser(user)}
                  className="w-full md:w-auto"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}