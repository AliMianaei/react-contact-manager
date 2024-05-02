import { useLocation } from "react-router-dom";

import SearchContact from "./Contacts/SearchContact";

import { BACKGROUND, PURPLE } from "../helpers/colors";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-dark navbar-expand-sm shadow-lg py-3" style={{backgroundColor: BACKGROUND}}>
      <div className="container">
        <div className="row w-100 m-0">
          <div className="col navbar-brand m-0 px-0 text-end">
            <i className="fas fa-id-badge fa-lg" style={{color: PURPLE}} />
            <span> وب اپلیکیشن مدیریت </span>
            <span style={{color: PURPLE}}>مخاطبین</span>
          </div>
          <div className="col p-0">
            <div className="d-flex justify-content-end">
              {location.pathname === '/contacts' ? <SearchContact /> : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
