import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScanPatientID from "./screens/ScanPatientID";
import PatientOverview from "./screens/PatientOverview";
import AddPrescription from "./screens/AddPrescription";
import DoctorLoginScreen from "./screens/DoctorLoginScreen";
import DoctorRegister from "./screens/DoctorRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/scan-patient-id" element={<ScanPatientID />} />
        <Route path="/patient-overview/:qrToken"element={<PatientOverview />} />
        <Route path="/add-prescription/:qrToken"element={<AddPrescription />} />
        <Route path="/" element={<DoctorLoginScreen />} />
        <Route path="/login" element={<DoctorLoginScreen />} />
        <Route path="/register" element={<DoctorRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
