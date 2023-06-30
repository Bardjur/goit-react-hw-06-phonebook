import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import css from './App.module.css';
import { getContacts, getFilter } from "redux/selectors";
import { addContact, delContact, filterChange } from "redux/slices";

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
console.log(contacts);
  const normalizeFilter = filter.toLowerCase();
  const filteredData = contacts.filter(({ name }) => name.toLowerCase().includes(normalizeFilter));

  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={data => dispatch(addContact(data))}
      />

      {contacts.length
        ? ( <>
          <h2>Contacts</h2>
          <Filter onChange={txt => dispatch(filterChange(txt))} />
          <ContactList
            contacts={filteredData}
            onClick={id => dispatch(delContact(id))}/>
        </> )
        : <h2>No contacts</h2>}
      
      <ToastContainer autoClose={3000}/>
    </div>
    
  );
};
