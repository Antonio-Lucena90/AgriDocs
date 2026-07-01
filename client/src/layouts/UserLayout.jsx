import { Outlet } from "react-router"
import { NavbarUser } from "../components/NavbarUser/NavbarUser"
import { WebFooter } from "../components/WebFooter/WebFooter"


const UserLayaout = () => {
  return (
        <>
      <header>
        <NavbarUser/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <WebFooter/>
      </footer>
    </>
  )
}

export default UserLayaout