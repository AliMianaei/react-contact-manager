/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { getContact, updateContact } from "../../services/contactService";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/contactContext";
import { contactShema } from "../../validations/contactValidation";

const EditContactFormik = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  const { loading, setLoading, groups, contacts, setContacts, setFilteredContacts } = useContext(ContactContext);

  const editContact = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);

      if (status === 200) {
        setContacts(draft => {
          const contactIndex = draft.findIndex(contact => contact.id === contactId);
          draft[contactIndex] = data;
        });

        setFilteredContacts(draft => {
          const contactIndex = draft.findIndex(contact => contact.id === contactId);
          draft[contactIndex] = data;
        });

        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('Edit uesEffect run');
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik
                    initialValues= {contact}
                    validationSchema= {contactShema}
                    onSubmit= {editContact}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage name="fullname" render={msg => <p className="my-1 text-danger text-end">{msg}</p>} />
                      </div>

                      <div className="mb-2">
                        <Field
                          name="photo"
                          type="text"
                          className="form-control"
                          placeholder="آدرس تصویر"
                        />
                        <ErrorMessage name="photo" render={msg => <p className="my-1 text-danger text-end">{msg}</p>} />
                      </div>

                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage name="mobile" render={msg => <p className="my-1 text-danger text-end">{msg}</p>} />
                      </div>

                      <div className="mb-2">
                        <Field
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="آدرس ایمیل"
                        />
                        <ErrorMessage name="email" render={msg => <p className="my-1 text-danger text-end">{msg}</p>} />
                      </div>

                      <div className="mb-2">
                        <Field
                          name="job"
                          type="text"
                          className="form-control"
                          placeholder="شغل"
                        />
                        <ErrorMessage name="job" render={msg => <p className="my-1 text-danger text-end">{msg}</p>} />
                      </div>
                      
                      <div className="mb-2">
                        <Field
                          name="group"
                          as="select"
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 && groups.map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="group" render={msg => <p className="my-1 text-danger text-end">{msg}</p>} />
                      </div>

                      <div className="mx-2">
                        <input 
                          type="submit"
                          className="btn"
                          style={{backgroundColor: PURPLE}}
                          value="ویرایش مخاطب"
                        />
                        <Link
                          to="/contacts"
                          className="btn mx-2"
                          style={{backgroundColor: COMMENT}}  
                        >انصراف</Link>
                      </div>

                    </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo || "https://placehold.co/300x300"}
                    alt=""
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <img
                src={require("../../assets/man-taking-note.png")}
                alt=""
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default EditContactFormik;