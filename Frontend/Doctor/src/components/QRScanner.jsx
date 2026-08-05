import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

export default function QRScanner({ onScanSuccess }) {

  useEffect(() => {

    const html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras()
      .then((devices) => {

        if (devices && devices.length) {

          html5QrCode.start(
            { facingMode: "environment" }, // back camera if available
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              html5QrCode.stop().then(() => {
                onScanSuccess(decodedText);
              });
            },
            () => {}
          );

        }

      })
      .catch(console.error);

    return () => {
      html5QrCode.stop().catch(() => {});
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
