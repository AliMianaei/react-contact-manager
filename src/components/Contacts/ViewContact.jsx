/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";
import { getContact, getGroup } from "../../services/contactService";

import Spinner from "../Spinner";
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/colors";

const ViewContact = () => {

  const { contactId } = useParams();

  const [contact, setContact] = useState({});
  const [group, setGroup] = useState({});

  const { loading, setLoading } = useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData, status } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);

        if (status === 200) {
          setContact(contactData);
          setGroup(groupData);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{backgroundColor: CYAN}}>
              اطلاعات کاربر
            </p>
          </div>
        </div>
      </section>
      <hr style={{backgroundColor: CYAN}} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-3">
              <div className="container p-2" style={{borderRadius: "1rem", backgroundColor: CURRENTLINE}}>
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={contact.photo || "https://placehold.co/300x200"}
                      alt=""
                      className="img-fluid rounded"
                      style={{border: `1px solid ${PURPLE}`}}  
                    />
                  </div>
                  <div className="col-md-9 text-end">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        <span>نام و نام خانوادگی: </span>
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>

                      <li className="list-group-item list-group-item-dark">
                        <span>شماره موبایل: </span>
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>

                      <li className="list-group-item list-group-item-dark">
                        <span>ایمیل: </span>
                        <span className="fw-bold">{contact.email}</span>
                      </li>

                      <li className="list-group-item list-group-item-dark">
                        <span>شغل: </span>
                        <span className="fw-bold">{contact.job}</span>
                      </li>

                      <li className="list-group-item list-group-item-dark">
                        <span>گروه: </span>
                        <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 text-start">
                  <Link to="/contacts" className="btn" style={{backgroundColor: PURPLE}}>برگشت به صفحه اصلی</Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}

export default ViewContact;
