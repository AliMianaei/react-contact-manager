import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import {AddContact, Contacts, EditContact, Navbar, ViewContact} from "./components";

import './App.css';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await axios.get('http://localhost:9000/contacts');
        const { data: groupsData } = await axios.get('http://localhost:9000/groups');

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
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
      </Routes>

    </div>
  );
}

export default App;
