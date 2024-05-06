import { useContext } from "react";
import { Link } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";
import Spinner from "../Spinner";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

const AddContact = () => {
  const {
    loading,
    contact,
    groups,
    onContactChange,
    createContact,

    errors,
  } = useContext(ContactContext);

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
                  <form onSubmit={createContact}>

                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                        // required={true}
                        value={contact.fullname}
                        onChange={onContactChange}
                      />
                      {errors.filter(error => error.path === 'fullname').map((error, index) => (
                        <p key={index} className="text-danger text-end my-1">{error.message}</p>
                      ))}
                    </div>

                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        className="form-control"
                        placeholder="آدرس تصویر"
                        required={false}
                        value={contact.photo}
                        onChange={onContactChange}
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        className="form-control"
                        placeholder="شماره موبایل"
                        // required={true}
                        value={contact.mobile}
                        onChange={onContactChange}
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="آدرس ایمیل"
                        // required={true}
                        value={contact.email}
                        onChange={onContactChange} 
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        placeholder="شغل"
                        // required={true}
                        value={contact.job}
                        onChange={onContactChange}
                      />
                    </div>
                    
                    <div className="mb-2">
                      <select
                        name="group"
                        className="form-control"
                        // required={true}
                        value={contact.group}
                        onChange={onContactChange}
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 && groups.map(group => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                      </select>
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
                  {errors?.map((error, index) => <div key={index} className="text-danger text-end mt-2">{error.message}</div>)}
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
