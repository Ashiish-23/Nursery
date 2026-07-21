import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

function HomePage() {
  return (
    <div>
      <h1>Welcome to SasyaVana 🌿</h1>
      <p>Home Page Placeholder</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}