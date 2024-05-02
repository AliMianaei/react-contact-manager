import { useContext } from "react";
import { Link } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";
import Contact from "./Contact";
import Spinner from "../Spinner";
import { ORANGE, PINK } from "../../helpers/colors";

const Contacts = () => {
  const { loading, filteredContacts, deleteContact } = useContext(ContactContext);

  return (
    <>
      <section className="container my-2">
        <div className="grid">
          <div className="row">
            <div className="col text-end">
              <p className="h3 mb-0">
                <Link to="/contacts/add" className="btn" style={{backgroundColor: PINK}}>
                  <span>ساخت مخاطب جدید</span>
                  <i className="fa fa-plus-circle me-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? <Spinner /> : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0 ? filteredContacts.map((contact) => (
              <Contact key={contact.id} contact={contact} deleteContact={() => deleteContact(contact.id, contact.fullname)} />
            )) :
            (
              <div className="text-center py-5">
                <p className="h3" style={{color: ORANGE}}>
                  مخاطب یافت نشد...
                </p>
                {/* <img src={NotFound} alt="not-found" className="w-25" /> */}
                <img src={require("../../assets/no-found.gif")} alt="not-found" className="w-25" />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default Contacts;