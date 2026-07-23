import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import { Button } from "./shared/ui/button";

function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button>Welcome to SasyaVana 🌿</Button>
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