import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div>Header Placeholder</div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <div>Footer Placeholder</div>
      </footer>
    </div>
  );
};

export default MainLayout;
