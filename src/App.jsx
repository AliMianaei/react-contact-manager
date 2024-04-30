import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import { createContact, deleteContact, getAllContacts, getAllGroups } from './services/contactService';
import {AddContact, Contacts, EditContact, Navbar, ViewContact} from "./components";

import './App.css';
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/colors';

const contactInitialValues = {
  fullname: "",
  photo: "",
  mobile: "",
  email: "",
  job: "",
  group: "",
};

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState(contactInitialValues);

  const setContactInfo = (event) => {
    setContact(prevState => ({...prevState, [event.target.name]: event.target.value}))
  }

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(contact);
      if (status === 201) {
        setContact(contactInitialValues);
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const confirm = (contactId, contactFullname) => {
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
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);        
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [forceRender]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);        
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
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
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/contacts' />} />
        <Route path='/contacts' element={<Contacts contacts={contacts} loading={loading} confirmDelete={confirm} />} />
        <Route path='/contacts/add' element={<AddContact contact={contact} setContactInfo={setContactInfo} groups={groups} loading={loading} createContactForm={createContactForm} />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact forceRender={forceRender} setForceRender={setForceRender} />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
      </Routes>

    </div>
  );
}

export default App;
