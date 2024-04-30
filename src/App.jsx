import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { createContact, getAllContacts, getAllGroups } from './services/contactService';
import {AddContact, Contacts, EditContact, Navbar, ViewContact} from "./components";

import './App.css';

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
        <Route path='/contacts' element={<Contacts contacts={contacts} loading={loading} />} />
        <Route path='/contacts/add' element={<AddContact contact={contact} setContactInfo={setContactInfo} groups={groups} loading={loading} createContactForm={createContactForm} />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
      </Routes>

    </div>
  );
}

export default App;
