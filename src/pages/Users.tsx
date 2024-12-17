import { useState } from "react";
import { Input } from "@/components/ui/input";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Oluwaseun Adebayo",
    email: "seun@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Chidinma Okonkwo",
    email: "chidi@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Babajide Ogunleye",
    email: "jide@example.com",
    role: "Cashier",
    status: "Active",
  },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Users</h1>
        <Button onClick={() => setIsDialogOpen(true)} size="sm" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
        <AddUserDialog
          onUserAdded={handleAddUser}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-sm"
        />
      </div>

      <UserTable users={filteredUsers} onDeleteUser={handleDeleteUser} />
    </div>
  );
}