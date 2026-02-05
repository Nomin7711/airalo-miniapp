import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

const BarcodeScannerModal = ({ open, handleClose }) => {
  const [scannedData, setScannedData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data.text);
      console.log("Scanned Barcode Data:", data.text);
      handleClose();
    }
  };

  const handleError = (err) => {
    console.error("Barcode Scanner Error:", err);
  };

  useEffect(() => {
    if (scannedData) {
      console.log("Handling Scanned Data:", scannedData);
    }
  }, [scannedData]);

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "16px",
              padding: "22px 16px",
              width: "100%",
              height: "100vh",
              margin: 0,
            },
          }}
      >
        <p className="text-[14px] text-black85 text-center">
          Та доод талбарт сим картны ард хэсэгт байрлах 20 оронтой код бүхий бар
          кодыг уншуулна уу!
        </p>
        <DialogContent>
          <div className="w-full h-[600px] relative">
            <BarcodeScanner
                onUpdate={(err, result) => {
                  if (result) handleScan(result);
                  if (err) handleError(err);
                }}
                constraints={{ facingMode: "environment" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default BarcodeScannerModal;
