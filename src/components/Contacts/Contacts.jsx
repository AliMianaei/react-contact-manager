import { ORANGE, PINK } from "../../helpers/colors";
import Contact from "./Contact";

// import NotFound from "../../assets/no-found.gif";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Contacts = ({contacts, loading}) => {
  // const emptyArray = Array.from({ length: 15 }).fill(null);
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
            {contacts.length > 0 ? contacts.map((contact) => (
              <Contact key={contact.id} contact={contact} />
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