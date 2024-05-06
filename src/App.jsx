import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import _ from 'lodash';

import { ContactContext } from './context/contactContext';
import { createContact, deleteContact, getAllContacts, getAllGroups } from './services/contactService';
// import { contactShema } from './validations/contactValidation';

import {AddContact, Contacts, EditContact, Navbar, ViewContact} from "./components";
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/colors';

import './App.css';
import AddContactFormik from './components/Contacts/AddContactFormik';

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  // const [contactQuery, setContactQuery] = useState({text: ""});
  // const [errors, setErrors] = useState([]);

  const onContactChange = (event) => {
    setContact(prevState => ({...prevState, [event.target.name]: event.target.value}))
  }

  const createContactForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading(true);
      // await contactShema.validate(contact, {abortEarly: false});
      // const { data, status } = await createContact(contact);
      const { data, status } = await createContact(values);

      if (status === 201) {
        setContacts(prevContacts => ([...prevContacts, data]));
        setFilteredContacts(prevFilteredContacts => ([...prevFilteredContacts, data]));
        // setContact({});
        // // setErrors([]);
        navigate("/contacts");
      }
    } catch (error) {
      console.log({error});
      console.log({errorMessage: error.message});
      console.log({errorInner: error.inner});
      // setErrors(error.inner);
    } finally {
      setLoading(false);
    }
  }

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir='rtl'
            style={{backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: '1rem'}}
            className='p-4'  
          >
            <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
            <p style={{color: FOREGROUND}}>
              مطمنئنی که میخوای مخاطب {contactFullname} را پاک کنی؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className='btn mx-2'
              style={{backgroundColor: PURPLE}}
            >مطمئن هستم</button>
            <button
              onClick={onClose}
              className='btn'
              style={{backgroundColor: COMMENT}}
            >انصراف</button>
          </div>
        )
      }
    })
  }

  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {      
      /**
       * NOTE
       * 1- Rerender -> forceRender, setForceRender(true)
       * 2- send request to server 
       * 3- delete in local state -> setContacts() -> delete Contact object with new data which is returned by api after successfull PUT data (best way)
       * 4- delete in local state before server request
       */

      // use 4th way
      // Contacts Copy
      // const allContacts = [...contacts]; // outside of try
      const updatedContacts = allContacts.filter(contact => contact.id !== contactId);
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);

      const { status } = await deleteContact(contactId);
      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (error) {
      console.log(error.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    } finally {
      setLoading(false);
    }
  }

  const contactSearch = _.debounce((query) => {
    if(!query) return setFilteredContacts([...contacts]);
    setFilteredContacts(contacts.filter(contact => contact.fullname.toLowerCase().includes(query.toLowerCase())));
  }, 1000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);        
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      contacts,
      setContacts,
      filteredContacts,
      setFilteredContacts,
      groups,
      // contactQuery,
      contactSearch,
      onContactChange,
      createContact: createContactForm,
      deleteContact: confirmDelete,

      // errors,
    }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts' />} />
          <Route path='/contacts' element={<Contacts />} />
          {/* <Route path='/contacts/add' element={<AddContact />} /> */}
          <Route path='/contacts/add' element={<AddContactFormik />} />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
