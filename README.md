# HVault Patient Frontend

A modern, secure healthcare application frontend built with React, Vite, and Tailwind CSS. This is the patient-facing PWA that allows users to manage their medical records, upload reports, and grant access to healthcare professionals.

## Features

- 📱 **Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices
- 🔐 **Secure** - Built with healthcare-grade security practices
- 📲 **PWA Support** - Installable as a progressive web app
- 💾 **Medical Records Management** - Upload, view, and organize medical reports
- 👨‍⚕️ **Access Control** - Grant and manage access to healthcare providers
- 📊 **Health Dashboard** - View key health metrics at a glance
- 🎨 **Modern UI** - Material Design 3 based color scheme and components

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6
- **PWA**: vite-plugin-pwa
- **Additional Libraries**: html5-qrcode (for QR scanning)

## Project Structure

```
Frontend/Patient/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TopAppBar.jsx
│   │   └── BottomNavBar.jsx
│   ├── screens/
│   │   ├── SplashScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── DashboardScreen.jsx
│   │   ├── RecordsScreen.jsx
│   │   ├── UploadScreen.jsx
│   │   ├── AccessScreen.jsx
│   │   ├── PrescriptionsScreen.jsx
│   │   └── ProfileScreen.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation

1. **Clone or navigate to the project**
   ```bash
   cd Frontend/Patient
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Screens

### 1. **Splash Screen**
   - Initial loading screen with animated progress indicator
   - Auto-transitions to login after 2.5 seconds

### 2. **Login Screen**
   - Mobile/Email and OTP-based authentication
   - Secure login flow

### 3. **Dashboard**
   - Patient profile information
   - Quick action cards
   - Emergency information display
   - Key health metrics (Blood Group, Age)

### 4. **Records**
   - Search and filter medical records
   - Timeline view of medical history
   - Access detailed records

### 5. **Upload**
   - Drag-and-drop file upload interface
   - Report type selection
   - File notes and metadata

### 6. **Access**
   - Display health ID with QR code
   - Manage access requests from healthcare providers
   - Grant/deny permissions

### 7. **Prescriptions**
   - View medication history
   - Track prescriptions from different doctors
   - Download prescription details

### 8. **Profile**
   - User profile management
   - Personal information editing
   - Logout functionality

## Color Scheme

- **Primary**: #006a64 (Teal)
- **Secondary**: #00658d (Blue)
- **Error**: #ba1a1a (Red)
- **Custom Material Design 3 colors** configured in tailwind.config.js

## Typography

- **Headlines**: Manrope (700, 800, 900 weights)
- **Body/Labels**: Inter (400, 500, 600 weights)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Key Components

**TopAppBar**: Fixed header with profile picture and notifications

**BottomNavBar**: Bottom navigation bar with 5 main navigation items

**Screen Components**: Each screen is modular and self-contained

## PWA Features

This application is configured as a Progressive Web App (PWA) and can be:
- Installed on mobile devices as a native-like app
- Used offline (when service worker is configured)
- Accessed from home screen without browser UI

## Backend Integration

This frontend is designed to work with Supabase as the backend-as-a-service solution. Ensure proper environment variables are configured for:
- Supabase URL
- Supabase Anon Key
- Other service configurations

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

## Contributing

Follow these guidelines when contributing:
1. Use component-based architecture
2. Maintain consistent naming conventions
3. Use Tailwind CSS for styling
4. Keep components modular and reusable

## License

[Add your license here]

## Support

For issues or questions, please contact the development team.
