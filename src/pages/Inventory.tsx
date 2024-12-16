import { useState } from "react";
import { BarcodeScanner } from "@/components/inventory/BarcodeScanner";
import { toast } from "sonner";

export default function Inventory() {
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  const handleBarcodeScan = (barcode: string) => {
    setScannedBarcode(barcode);
    // In a real application, you would use this barcode to fetch product details
    // from your backend or database
    toast.info(`Scanned barcode: ${barcode}`);
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
              {/* Example data, replace with actual inventory data */}
              <TableRow>
                <TableCell className="font-medium">Product 1</TableCell>
                <TableCell>SKU12345</TableCell>
                <TableCell>10</TableCell>
                <TableCell>
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive" className="ml-2">Delete</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Product 2</TableCell>
                <TableCell>SKU67890</TableCell>
                <TableCell>5</TableCell>
                <TableCell>
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive" className="ml-2">Delete</Button>
                </TableCell>
              </TableRow>
              {/* Add more products as needed */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
