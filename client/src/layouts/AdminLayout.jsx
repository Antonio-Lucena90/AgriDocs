import {Outlet} from 'react-router';
import {NavbarAdmin} from '../components/NavbarAdmin/NavbarAdmin';
import { WebFooter } from '../components/WebFooter/WebFooter';

const AdminLayout = () => {
  return (
    <>
      <header>
        <NavbarAdmin/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <WebFooter/>
      </footer>
    </>
  );
};

export default AdminLayout;
