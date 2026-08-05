import { useNavigate } from "react-router-dom";
import QRScanner from "../components/QRScanner";
import { getPatientByQrToken } from "../services/doctorService";
import { useRef } from "react";
import jsQR from "jsqr";

export default function ScanPatientID() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleGalleryUpload = () => {
    fileInputRef.current.click();
  };
  const handleScanSuccess = async (decodedText) => {
    console.log("QR Scanned:", decodedText);

    try {
      // If QR contains full URL, get only the token
      const qrToken = decodedText.split("/").pop();

      console.log("QR Token:", qrToken);

      const response = await getPatientByQrToken(qrToken);

      console.log("Patient:", response.data);

      localStorage.setItem(
        "scannedPatient",
        JSON.stringify(response.data)
      );

      console.log("Navigating to Patient Overview...");

      navigate(`/patient-overview/${qrToken}`);

    } catch (error) {
      console.error(error);
      alert("Patient not found");
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface h-screen flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <h1 className="font-headline font-bold text-lg">
            Scan Patient ID
          </h1>
        </div>

        <div className="w-8 h-8 rounded-full border overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8D2vvj4WdL6IDNkLP44jk3ZYeb0E1Xdq8S1w-D_QChGHQOSVRpEBZGQsoRvZR21DG6K9XFxOAyM4FmBGYU1xy9IrCBqUR9d79ZGe7UK4ufE6mdvSavKvzasOOro10I_CGuyOiOP--7hhitoa59FGicakl4ZZSegQheRXuf8JbT4vRZKx-CMtFgTInph98KHvUZJ1-RkZGn8iXDtJTijHKgmeL4ZeiPhntd14_sN3faMniUop3jsSltZFQlDtbZPEXi21kMHT_bTA"
            alt="Doctor"
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">

        {/* Scanner */}
        <div className="relative w-[280px] h-[280px] mb-12">

          <div className="absolute inset-0 bg-white rounded-3xl border overflow-hidden">

            <QRScanner onScanSuccess={handleScanSuccess} />
            

            <div className="absolute inset-0 pointer-events-none">
              <div className="scan-line"></div>
            </div>

          </div>

          {/* Scanner Corners */}
          <div className="absolute -inset-1 pointer-events-none">

            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>

            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>

            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>

            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>

          </div>
        </div>

        <div className="text-center space-y-4 mb-12 max-w-xs">

  <p className="text-xl font-bold">
    Place the ID inside the frame
  </p>

  <p className="text-on-surface-variant">
    Align the QR code within the corners. Scanning happens automatically.
  </p>

  <button
    onClick={handleGalleryUpload}
    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-on-primary rounded-full text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all"
  >
    <span className="material-symbols-outlined text-lg">image</span>
    Upload from Gallery
  </button>
  <input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  style={{ display: "none" }}
  onChange={(e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const code = jsQR(
        imageData.data,
        imageData.width,
        imageData.height
      );

      if (code) {
        handleScanSuccess(code.data);
      } else {
        alert("QR Code not detected.");
      }
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}}
/>

</div>
        
      </main>

      <footer className="p-8 flex justify-center">
        <div className="bg-surface-container-high px-5 py-3 rounded-full flex items-center gap-3 border shadow-sm">

          <span className="material-symbols-outlined text-primary">
            security
          </span>

          <span className="text-[11px] font-bold uppercase">
            Encrypted Clinical Scanning Mode
          </span>

          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>

        </div>
      </footer>
    </div>
  );
}