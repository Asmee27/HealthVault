import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

export default function QRScanner({ onScanSuccess }) {
  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    const startScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();

        if (!devices || devices.length === 0) {
          console.error("No camera found");
          return;
        }

        await html5QrCode.start(
          { facingMode: "environment" },
          {
  fps: 10,
},
          async (decodedText) => {
            try {
              if (html5QrCode.isScanning) {
                await html5QrCode.stop();
              }
            } catch (error) {
              console.error("Error stopping scanner:", error);
            }

            onScanSuccess(decodedText);
          },
          () => {}
        );
      } catch (error) {
        console.error("Camera error:", error);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      id="reader"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}