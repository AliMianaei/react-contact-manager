import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Contacts from './components/contact/Contacts';

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
  const [contacts, setContacts] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={contacts} loading={loading} />
    </div>
  );
}

export default App;
