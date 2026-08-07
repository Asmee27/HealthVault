import jsPDF from "jspdf";
import AlexBrushRegular from "./AlexBrush-Regular"; // the file generated alongside this one

const downloadPrescription = (card) => {
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const doctorName = card.doctor?.fullName || doctor?.fullName || "Unknown Doctor";
  const licenseId = card.doctor?.licenseId || doctor?.licenseId || "N/A";
  const signatureName = doctor?.signatureName || doctorName;

  const timestamp = new Date().toLocaleString();
  const doc = new jsPDF();

  // Register the real cursive signature font (Alex Brush, free/OFL licensed)
  doc.addFileToVFS("AlexBrush-Regular.ttf", AlexBrushRegular);
  doc.addFont("AlexBrush-Regular.ttf", "AlexBrush", "normal");

  // 1. Subtle Diagonal Watermark
  doc.setTextColor(230, 235, 235);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIDENTIAL MEDICAL RECORD", 105, 150, {
    angle: 35,
    align: "center",
  });

  // 2. Prescription Header Banner
  doc.setFillColor(0, 106, 100); // Primary Teal Color
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("HEALTHVAULT OFFICIAL PRESCRIPTION", 20, 16);

  // 3. Doctor Details Header
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`${doctorName}`, 20, 38);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`License ID: ${licenseId}`, 20, 44);
  doc.text(`Issued On: ${timestamp}`, 20, 50);

  // Separator Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(20, 56, 190, 56);

  // 4. Clinical Details Section
  let startY = 68;

  const details = [
    { label: "Diagnosis / Symptoms", value: card.diagnosis || "N/A" },
    { label: "Prescribed Medicines", value: card.medicines || "N/A" },
    { label: "Duration", value: card.duration || "N/A" },
    { label: "Frequency", value: card.frequency || "N/A" },
  ];

  details.forEach((item) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 106, 100);
    doc.text(item.label.toUpperCase(), 20, startY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(item.value, 20, startY + 6);

    startY += 18;
  });

  // 5. Stylized Digital Signature Stamp Box
  const sigBoxY = Math.max(startY + 10, 160);

  // Box Background & Border
  doc.setFillColor(244, 251, 249);
  doc.setDrawColor(0, 106, 100);
  doc.setLineWidth(0.8);
  doc.roundedRect(20, sigBoxY, 100, 42, 3, 3, "FD");

  // Verification Badge Header
  doc.setFillColor(0, 106, 100);
  doc.circle(28, sigBoxY + 9, 3, "F");

  doc.setTextColor(0, 106, 100);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DIGITALLY VERIFIED PRESCRIPTION", 35, sigBoxY + 10);

  // Real cursive signature using the embedded Alex Brush font
  doc.setFont("AlexBrush", "normal");
  doc.setFontSize(28); // script fonts need to be larger to read clearly
  doc.setTextColor(0, 77, 64);
  doc.text(`${signatureName}`, 26, sigBoxY + 25);

  // Signature Metadata
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Signed by: ${doctorName}`, 26, sigBoxY + 33);
  doc.text(`Timestamp: ${timestamp}`, 26, sigBoxY + 38);

  // Save the PDF
  doc.save(`Prescription_${card.id}.pdf`);
};

export default downloadPrescription;
