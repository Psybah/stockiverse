import { useState } from "react";
import { BarcodeScanner } from "@/components/inventory/BarcodeScanner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
}

export default function Inventory() {
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Product 1", sku: "SKU12345", quantity: 10 },
    { id: "2", name: "Product 2", sku: "SKU67890", quantity: 5 },
  ]);

  const handleBarcodeScan = (barcode: string) => {
    setScannedBarcode(barcode);
    // In a real application, you would use this barcode to fetch product details
    // from your backend or database
    toast.info(`Scanning product with barcode: ${barcode}`);
    
    // Mock adding a product when barcode is scanned
    const newProduct = {
      id: Date.now().toString(),
      name: `Product from barcode ${barcode}`,
      sku: barcode,
      quantity: 1,
    };
    
    setProducts(prev => [...prev, newProduct]);
    toast.success("Product added to inventory!");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Barcode Scanner</h2>
          <BarcodeScanner onScan={handleBarcodeScan} />
          {scannedBarcode && (
            <p className="mt-2">Last scanned barcode: {scannedBarcode}</p>
          )}
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline">Edit</Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        setProducts(prev => prev.filter(p => p.id !== product.id));
                        toast.success("Product removed from inventory");
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}