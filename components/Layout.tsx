import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
