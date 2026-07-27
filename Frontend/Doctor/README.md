# MediVault Doctor Frontend

A modern, secure clinical records management and patient scanning application built with React, Vite, and Tailwind CSS. This is the healthcare professional (doctor) interface for accessing patient information, managing prescriptions, and reviewing medical records.

## Features

- 📱 **Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices
- 🔐 **Secure Patient Access** - QR code based patient identification
- 📜 **Clinical Records Management** - View and manage patient health records
- 💊 **Prescription Management** - Add and track patient prescriptions
- 📊 **Patient Overview** - Comprehensive patient health dashboard
- 🔍 **Advanced Search** - Filter and search medical reports
- 🎨 **Modern UI** - Material Design 3 based with professional healthcare color scheme
- 📲 **PWA Support** - Installable as a progressive web app

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6
- **PWA**: vite-plugin-pwa
- **Additional Libraries**: html5-qrcode (for QR scanning)

## Project Structure

```
Frontend/Doctor/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── MobileNav.jsx
│   │   ├── ReportItem.jsx
│   │   └── HistoryCard.jsx
│   ├── screens/
│   │   ├── ScanPatientID.jsx
│   │   ├── PatientRecords.jsx
│   │   ├── PatientOverview.jsx
│   │   └── AddPrescription.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.json
├── .env.example
└── README.md
```

## Installation

1. **Navigate to project folder:**
   ```bash
   cd "Frontend/Doctor"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Screens

### 1. **Scan Patient ID** (Initial/Home)
   - QR code scanner interface
   - Encrypted clinical scanning mode
   - Upload from gallery fallback
   - Security status display

### 2. **Patient Records**
   - Patient information confirmation
   - Critical allergies display
   - Privacy protection notice
   - Access request functionality

### 3. **Patient Overview**
   - Comprehensive patient dashboard
   - Patient information card
   - Medical reports gallery
   - Report filtering and search
   - Upcoming appointments display
   - Sidebar navigation (desktop)

### 4. **Add Prescription**
   - Clinical notes entry form
   - Medicine and dosage input
   - Duration and frequency selection
   - Recent medical history review
   - Draft and submit options
   - FAB button for quick access (mobile)

## Color Scheme

- **Primary**: #006a64 (Teal)
- **Secondary**: #00658d (Blue)
- **Error**: #ba1a1a (Red)
- **Custom Material Design 3 colors** configured in tailwind.config.js

## Typography

- **Headlines**: Manrope (400, 500, 600, 700, 800 weights)
- **Body/Labels**: Inter (400, 500, 600 weights)

## Development

### Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Key Components

**Sidebar**: Navigation menu with patient info and quick actions (desktop only)

**MobileNav**: Bottom navigation for mobile devices

**ReportItem**: Reusable component for displaying medical reports

**HistoryCard**: Component for displaying patient history entries

## Features in Detail

### Patient Scanning
- Encrypted QR code scanning mode
- Real-time security status indicator
- Image upload fallback option

### Records Management
- Advanced filtering by report type (Radiology, Pathology, etc.)
- Search functionality for reports
- Report details with attachment information
- PDF viewing capability

### Prescription Management
- Doctor information auto-population
- Multi-medicine support with dosage
- Duration and frequency configuration
- Draft save functionality
- Diagnosis documentation

### Patient History
- Categorized history (Infection, Routine, Allergy)
- Medication tracking
- Vital signs display
- Chronological organization

## Backend Integration

This frontend is designed to work with Supabase as the backend-as-a-service solution. Ensure proper environment variables are configured for:
- Supabase URL
- Supabase Anon Key
- API endpoints
- Service configurations

## Security Features

- Encrypted clinical scanning mode
- Privacy protection alerts
- Access control mechanisms
- Secure patient data handling
- HIPAA-compliant design patterns

## Performance Optimizations

- Code splitting with React Router
- Image optimization
- Tree-shaking with Vite
- CSS purging with Tailwind
- Lazy loading components

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android

## Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancements (sidebar, wider layouts)
- Touch-friendly components
- Adaptive typography

## Contributing

Follow these guidelines when contributing:
1. Use component-based architecture
2. Maintain consistent naming conventions
3. Use Tailwind CSS for styling
4. Keep components modular and reusable
5. Follow Material Design 3 principles

## License

[Add your license here]

## Support

For issues or questions, please contact the development team.
