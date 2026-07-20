import { useState, useEffect, useCallback } from 'react';

export function usePrinter() {
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getPrinters().then(setPrinters);
    }
  }, []);

  const printReceipt = useCallback(async (data) => {
    if (window.electronAPI) {
      return window.electronAPI.printReceipt({
        ...data,
        printerName: selectedPrinter?.name,
      });
    }
    // Fallback: browser print
    window.print();
    return { success: true };
  }, [selectedPrinter]);

  const printInvoice = useCallback(async (data) => {
    if (window.electronAPI) {
      return window.electronAPI.printInvoice({
        ...data,
        printerName: selectedPrinter?.name,
      });
    }
    window.print();
    return { success: true };
  }, [selectedPrinter]);

  return { printers, selectedPrinter, setSelectedPrinter, printReceipt, printInvoice };
}