import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScanPatientID from "./screens/ScanPatientID";
import PatientOverview from "./screens/PatientOverview";
import AddPrescription from "./screens/AddPrescription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScanPatientID />} />
        <Route path="/patient-overview/:qrToken"element={<PatientOverview />} />
        <Route path="/add-prescription/:qrToken"element={<AddPrescription />} />
      </Routes>
    </Router>
  );
}

export default App;
