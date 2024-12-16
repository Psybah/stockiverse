import { useZxing } from "react-zxing";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);

  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
      setIsScanning(false);
      toast.success("Barcode scanned successfully!");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to scan barcode. Please try again.");
    },
  });

  if (!isScanning) {
    return (
      <Button onClick={() => setIsScanning(true)} variant="outline">
        Start Scanning
      </Button>
    );
  }

  return (
    <div className="relative">
      <video ref={ref} className="w-full max-w-[300px] rounded-lg" />
      <Button
        onClick={() => setIsScanning(false)}
        variant="outline"
        className="mt-2"
      >
        Stop Scanning
      </Button>
    </div>
  );
}