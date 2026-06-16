import { Outlet } from "react-router"
import { NavbarUser } from "../components/NavbarUser/NavbarUser"


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

      </footer>
    </>
  )
}

export default UserLayaout