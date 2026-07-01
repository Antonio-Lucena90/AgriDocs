import { Outlet } from "react-router"
import NavbarPublic from "../components/NavbarPublic/NavbarPublic"
import { WebFooter } from "../components/WebFooter/WebFooter"

const PublicLayout = () => {
  return (
    <>
      {/* Ambient orbs — fixed, visible on all public pages */}
      <div className="pub-orbs" aria-hidden="true">
        <div className="pub-orb pub-orb-1" />
        <div className="pub-orb pub-orb-2" />
        <div className="pub-orb pub-orb-3" />
      </div>

      <header>
        <NavbarPublic />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <WebFooter/>
      </footer>
    </>
  )
}

export default PublicLayout
