import { Routes, Route } from 'react-router-dom';
import { RestoLayout } from '../components/resto/layout/RestoLayout';
import { RestoProvider } from '../context/resto/RestoContext';
import Dashboard from '../pages/resto/Dashboard';
import Menu from '../pages/resto/Menu';
import Reports from '../pages/resto/Reports';
import Settings from '../pages/resto/Settings';

export default function RestoApp() {
  return (
    <RestoProvider>
      <Routes>
        <Route element={<RestoLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </RestoProvider>
  );
}