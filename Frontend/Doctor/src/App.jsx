import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScanPatientID from './screens/ScanPatientID';
import PatientRecords from './screens/PatientRecords';
import PatientOverview from './screens/PatientOverview';
import AddPrescription from './screens/AddPrescription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScanPatientID />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/patient-overview" element={<PatientOverview />} />
        <Route path="/add-prescription" element={<AddPrescription />} />
      </Routes>
    </Router>
  );
}

export default App;
