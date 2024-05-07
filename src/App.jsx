import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { Slide, ToastContainer } from 'react-toastify';

import { ContactContext } from './context/contactContext';
import { createContact, deleteContact, getAllContacts, getAllGroups } from './services/contactService';
// import { contactShema } from './validations/contactValidation';

import { AddContactFormik, Contacts, EditContactFormik, Navbar, ViewContact} from "./components";

import './App.css';
import { confirmDelete } from './helpers/confirmDelete';
import { errorMessage, successMessage } from './helpers/message';

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // const [contacts, setContacts] = useState([]);
  // const [filteredContacts, setFilteredContacts] = useState([]);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);

  const [groups, setGroups] = useState([]);
  // const [contact, setContact] = useState({});

  // const onContactChange = (event) => {
  //   setContact(prevState => ({...prevState, [event.target.name]: event.target.value}))
  // }

  const createContactForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await createContact(values);

      if (status === 201) {
        successMessage("مخاطب با موفقیت ساخته شد")
        setContacts(draft => {
          draft.push(data);
        });
        setFilteredContacts(draft => {
          draft.push(data);
        });
        navigate("/contacts");
      }
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  }

  const removeContact = async (contactId) => {
    // const allContacts = [...contacts];
    try {      
      // /**
      //  * NOTE
      //  * 1- Rerender -> forceRender, setForceRender(true)
      //  * 2- send request to server 
      //  * 3- delete in local state -> setContacts() -> delete Contact object with new data which is returned by api after successfull PUT data (best way)
      //  * 4- delete in local state before server request
      //  */

      // // use 4th way
      // // Contacts Copy
      // // const allContacts = [...contacts]; // outside of try
      // const updatedContacts = allContacts.filter(contact => contact.id !== contactId);
      // setContacts(updatedContacts);
      // setFilteredContacts(updatedContacts);

      setContacts(draft => draft.filter(contact => contact.id !== contactId));
      setFilteredContacts(draft => draft.filter(contact => contact.id !== contactId));

      const { status } = await deleteContact(contactId);
      errorMessage("مخاطب با موفقیت حذف شد")
      if (status !== 200) {
        setContacts([...contacts]);
        setFilteredContacts([...contacts]);
      }
    } catch (error) {
      console.log(error.message);
      setContacts([...contacts]);
      setFilteredContacts([...contacts]);
    } finally {
      setLoading(false);
    }
  }

  const contactSearch = _.debounce((query) => {
    if(!query) return setFilteredContacts([...contacts]);
    // setFilteredContacts(contacts.filter(contact => contact.fullname.toLowerCase().includes(query.toLowerCase())));
    setFilteredContacts(draft => draft.filter(contact => contact.fullname.toLowerCase().includes(query.toLowerCase())));
  }, 1000);

  useEffect(() => {
    console.log('App uesEffect run')
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
      // contact,
      contacts,
      setContacts,
      filteredContacts,
      setFilteredContacts,
      groups,
      // contactQuery,
      contactSearch,
      // onContactChange,
      createContact: createContactForm,
      deleteContact: { confirmDelete, removeContact },

      // errors,
    }}>
      <div className="App">
        <ToastContainer rtl={true} position="bottom-right" theme="dark" transition={Slide} stacked />
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts' />} />
          <Route path='/contacts' element={<Contacts />} />
          {/* <Route path='/contacts/add' element={<AddContact />} /> */}
          <Route path='/contacts/add' element={<AddContactFormik />} />
          {/* <Route path='/contacts/edit/:contactId' element={<EditContact />} /> */}
          <Route path='/contacts/edit/:contactId' element={<EditContactFormik />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
