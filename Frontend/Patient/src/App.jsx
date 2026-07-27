import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecordsScreen from './screens/RecordsScreen';
import UploadScreen from './screens/UploadScreen';
import AccessScreen from './screens/AccessScreen';
import PrescriptionsScreen from './screens/PrescriptionsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/records" element={<RecordsScreen />} />
        <Route path="/upload" element={<UploadScreen />} />
        <Route path="/access" element={<AccessScreen />} />
        <Route path="/prescriptions" element={<PrescriptionsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
