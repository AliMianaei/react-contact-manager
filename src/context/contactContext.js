import { createContext } from 'react';

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContact: () => {},
  contacts: [],
  setContacts: () => {},
  filteredContacts: [],
  setFilteredContacts: () => {},
  contactQuery: {},
  groups: [],
  
  onContactChange: () => {},
  createContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},
  contactSearch: () => {},

  // errors: [],
});