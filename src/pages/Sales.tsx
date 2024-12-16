import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
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
import { BarcodeScanner } from "@/components/inventory/BarcodeScanner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Sale {
  id: number;
  date: string;
  customer: string;
  items: number;
  total: number;
  status: string;
}

const initialSales: Sale[] = [
  {
    id: 1,
    date: "2024-02-20",
    customer: "Oluwaseun Adebayo",
    items: 3,
    total: 15000,
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-02-19",
    customer: "Chidinma Okonkwo",
    items: 2,
    total: 8500,
    status: "Completed",
  },
  {
    id: 3,
    date: "2024-02-18",
    customer: "Babajide Ogunleye",
    items: 1,
    total: 3000,
    status: "Completed",
  },
];

const sampleProducts = [
  { id: "1", name: "Indomie Noodles", price: 250 },
  { id: "2", name: "Peak Milk", price: 500 },
];

export default function Sales() {
  const [sales, setSales] = useState(initialSales);
  const [search, setSearch] = useState("");
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState<SaleItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const filteredSales = sales.filter((sale) =>
    sale.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleBarcodeScan = (barcode: string) => {
    const product = sampleProducts.find(p => p.id === barcode) || {
      id: barcode,
      name: `Product ${barcode}`,
      price: 0,
    };

    const existingItem = currentSale.find(item => item.id === product.id);
    
    if (existingItem) {
      setCurrentSale(prev =>
        prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCurrentSale(prev => [...prev, { ...product, quantity: 1 }]);
    }
    
    toast.success(`Added ${product.name} to cart`);
  };

  const handleQuantityChange = (id: string, change: number) => {
    setCurrentSale(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as SaleItem[]
    );
  };

  const handleCompleteSale = () => {
    if (!customerName.trim()) {
      toast.error("Please enter customer name");
      return;
    }
    if (currentSale.length === 0) {
      toast.error("Please add items to the sale");
      return;
    }

    const total = currentSale.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newSale: Sale = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      customer: customerName,
      items: currentSale.reduce((sum, item) => sum + item.quantity, 0),
      total,
      status: "Completed",
    };

    setSales(prev => [newSale, ...prev]);
    setCurrentSale([]);
    setCustomerName("");
    setIsNewSaleOpen(false);
    toast.success("Sale completed successfully!");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Sales</h1>
        <Button onClick={() => setIsNewSaleOpen(true)}>
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

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date}</TableCell>
                <TableCell className="font-medium">{sale.customer}</TableCell>
                <TableCell className="text-right">{sale.items}</TableCell>
                <TableCell className="text-right">₦{sale.total.toLocaleString()}</TableCell>
                <TableCell className="hidden sm:table-cell">{sale.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isNewSaleOpen} onOpenChange={setIsNewSaleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Sale</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Items</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowScanner(!showScanner)}
                >
                  {showScanner ? "Hide Scanner" : "Scan Barcode"}
                </Button>
              </div>
              
              {showScanner && (
                <div className="p-4 border rounded-lg">
                  <BarcodeScanner onScan={handleBarcodeScan} />
                </div>
              )}

              <div className="border rounded-lg divide-y">
                {currentSale.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, -item.quantity)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {currentSale.length === 0 && (
                  <p className="p-4 text-center text-muted-foreground">
                    No items added yet. Use the barcode scanner to add items.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total:</span>
              <span>
                ₦{currentSale.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewSaleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCompleteSale}>
                Complete Sale
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}