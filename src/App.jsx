import { useState } from 'react';

import {AddContact, Contacts, EditContact, Navbar, ViewContact} from "./components";

import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

const contactsArray = [
  {
    id: 1,
    name: "علی میانایی",
    email: "ali.mianaei@gmail.com",
    phone: "۰۹۱۲۰۱۵۲۱۵۳",
  },
  {
    id: 2,
    name: "مریم کنعانی",
    email: "maryam.kanani@gmail.com",
    phone: "۰۹۱۲۱۱۲۹۹۸۸",
  },
  {
    id: 3,
    name: "سینا میانایی",
    email: "sina.mianaei@gmail.com",
    phone: "۰۹۳۵۵۵۸۵۸۵۸",
  },
  {
    id: 4,
    name: "نجمه میانایی",
    email: "najmeh.mianaei@gmail.com",
    phone: "۰۹۱۲۹۹۸۸۱۱۱",
  },
]

const App = () => {

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState(contactsArray);

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
