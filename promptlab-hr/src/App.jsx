import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import Welcome from '@/pages/Welcome';
import Purpose from '@/pages/Purpose';
import Learning from '@/pages/Learning';
import Builder from '@/pages/Builder';
import Safety from '@/pages/Safety';
import Progress from '@/pages/Progress';
import Login from '@/pages/Login';
import { AuthProvider } from '@/features/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/purpose" element={<Purpose />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
