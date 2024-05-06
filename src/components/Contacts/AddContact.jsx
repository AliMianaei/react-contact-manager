import { useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';

import { ContactContext } from "../../context/contactContext";
import { contactShema } from '../../validations/contactValidation'
import Spinner from "../Spinner";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

const AddContact = () => {
  const {
    loading,
    contact,
    groups,
    onContactChange,
    createContact,

    // errors,
  } = useContext(ContactContext);

  const formik = useFormik({
    initialValues: {
      fullname: '',
      photo: '',
      mobile: '',
      email: '',
      job: '',
      group: '',
    },
    validationSchema: contactShema,
    onSubmit: (values, formikBag) => {
      console.log({ values });
      console.log({ formikBag })
      createContact(values);
    }
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              alt=""
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left:"100px",
                opacity: "50%",
              }}  
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{color: GREEN}}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{backgroundColor: GREEN}} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={formik.handleSubmit}>

                    <div className="mb-2">
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                        // value={contact.fullname}
                        // onChange={onContactChange}
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fullname && formik.errors.fullname && <p className="my-1 text-danger text-end">{formik.errors.fullname}</p>}
                    </div>

                    <div className="mb-2">
                      <input
                        id="photo"
                        name="photo"
                        type="text"
                        className="form-control"
                        placeholder="آدرس تصویر"
                        required={false}
                        // value={contact.photo}
                        // onChange={onContactChange}
                        value={formik.values.photo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.photo && formik.errors.photo && <p className="my-1 text-danger text-end">{formik.errors.photo}</p>}
                    </div>

                    <div className="mb-2">
                      <input
                        id="mobile"
                        name="mobile"
                        type="number"
                        className="form-control"
                        placeholder="شماره موبایل"
                        // value={contact.mobile}
                        // onChange={onContactChange}
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.mobile && formik.errors.mobile && <p className="my-1 text-danger text-end">{formik.errors.mobile}</p>}
                    </div>

                    <div className="mb-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="آدرس ایمیل"
                        // value={contact.email}
                        // onChange={onContactChange}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && <p className="my-1 text-danger text-end">{formik.errors.email}</p>}
                    </div>

                    <div className="mb-2">
                      <input
                        id="job"
                        name="job"
                        type="text"
                        className="form-control"
                        placeholder="شغل"
                        // value={contact.job}
                        // onChange={onContactChange}
                        value={formik.values.job}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.job && formik.errors.job && <p className="my-1 text-danger text-end">{formik.errors.job}</p>}
                    </div>
                    
                    <div className="mb-2">
                      <select
                        id="group"
                        name="group"
                        className="form-control"
                        // value={contact.group}
                        // onChange={onContactChange}
                        value={formik.values.group}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 && groups.map(group => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                      </select>
                      {formik.touched.group && formik.errors.group && <p className="my-1 text-danger text-end">{formik.errors.group}</p>}
                    </div>

                    <div className="mx-2">
                      <input 
                        type="submit"
                        className="btn"
                        style={{backgroundColor: PURPLE}}
                        value="ساخت مخاطب"
                      />
                      <Link
                        to="/contacts"
                        className="btn mx-2"
                        style={{backgroundColor: COMMENT}}  
                      >انصراف</Link>
                    </div>

                  </form>
                  {/* {errors?.map((error, index) => <div key={index} className="text-danger text-end mt-2">{error.message}</div>)} */}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default AddContact;
