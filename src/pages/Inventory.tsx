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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export default function Inventory() {
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Indomie Noodles", sku: "SKU12345", quantity: 100, price: 250 },
    { id: "2", name: "Peak Milk", sku: "SKU67890", quantity: 50, price: 500 },
  ]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleBarcodeScan = (barcode: string) => {
    setScannedBarcode(barcode);
    toast.info(`Scanning product with barcode: ${barcode}`);
    
    const newProduct = {
      id: Date.now().toString(),
      name: `Product from barcode ${barcode}`,
      sku: barcode,
      quantity: 1,
      price: 0,
    };
    
    setProducts(prev => [...prev, newProduct]);
    toast.success("Product added to inventory!");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts(prev =>
      prev.map(p => (p.id === editingProduct.id ? editingProduct : p))
    );
    setIsEditDialogOpen(false);
    toast.success("Product updated successfully!");
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
        
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead className="hidden md:table-cell">SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price (₦)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.name}
                    <span className="block md:hidden text-sm text-muted-foreground">
                      SKU: {product.sku}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.sku}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>₦{product.price.toLocaleString()}</TableCell>
                  <TableCell className="space-y-2 md:space-y-0 md:space-x-2">
                    <Button 
                      variant="outline"
                      className="w-full md:w-auto"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive"
                      className="w-full md:w-auto"
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={editingProduct?.name || ''}
                onChange={(e) => setEditingProduct(prev => prev ? {...prev, name: e.target.value} : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={editingProduct?.sku || ''}
                onChange={(e) => setEditingProduct(prev => prev ? {...prev, sku: e.target.value} : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={editingProduct?.quantity || 0}
                onChange={(e) => setEditingProduct(prev => prev ? {...prev, quantity: Number(e.target.value)} : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                type="number"
                value={editingProduct?.price || 0}
                onChange={(e) => setEditingProduct(prev => prev ? {...prev, price: Number(e.target.value)} : null)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}