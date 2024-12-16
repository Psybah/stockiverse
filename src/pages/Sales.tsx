import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const initialSales = [
  {
    id: 1,
    date: "2024-02-20",
    customer: "John Doe",
    items: 3,
    total: 1299.99,
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-02-19",
    customer: "Jane Smith",
    items: 2,
    total: 799.99,
    status: "Completed",
  },
  {
    id: 3,
    date: "2024-02-18",
    customer: "Bob Johnson",
    items: 1,
    total: 99.99,
    status: "Completed",
  },
];

export default function Sales() {
  const [sales] = useState(initialSales);
  const [search, setSearch] = useState("");

  const filteredSales = sales.filter((sale) =>
    sale.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sales</h1>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" /> New Sale
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date}</TableCell>
                <TableCell className="font-medium">{sale.customer}</TableCell>
                <TableCell>{sale.items}</TableCell>
                <TableCell>${sale.total}</TableCell>
                <TableCell>{sale.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}