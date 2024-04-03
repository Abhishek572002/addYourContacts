import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { RiUserSearchLine } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
// import { HiOutlineUserCircle } from "react-icons/hi2";
import { collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
// import { IoMdTrash } from "react-icons/io";
// import { RiEdit2Fill } from "react-icons/ri";
import {db} from "./config/firebase"
import ContactCard from './components/ContactCard';
import Modal from './components/Modal';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclose from './hooks/useDisclose';
const App = () => {
  const [contacts, setContacts] = useState([]);
  
  const {isOpen,onClose,onOpen} = useDisclose();

  useEffect (()=>{
    const getContacts = async()=>{
        try {
          const contactsRef  = collection(db,"contacts");   
          onSnapshot(contactsRef,(snapshot)=>{
            const contactList = snapshot.docs.map((doc) =>
            {
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            setContacts(contactList);
            return contactList;
          })
          // console.log(contactList)
        } catch (error) {
          console.log('error');
        }
    };
    getContacts();
  },[]);

  const filterContacts =(e) =>{
    
    const value = e.target.value;

    const contactsRef  = collection(db,"contacts");   
      onSnapshot(contactsRef,(snapshot)=>{
        const contactList = snapshot.docs.map((doc) =>
        {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const filteredContacts = contactList.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))

        setContacts(filteredContacts);
        return filteredContacts;
    })

  }

  return (
    <>
    <div className='mx-auto max-w-[370px] px-4'>
        <Navbar/>
    <div className='flex gap-2'>
      <div className='relative flex  flex-grow items-center'>
            <RiUserSearchLine  className=' ml-1 absolute text-3xl text-white'/>
            <input onChange={filterContacts}  placeholder='search your contacts' type="text" className=" flex-grow h-10 border border-white rounded-md bg-transparent text-white pl-9" />
          </div>
          <div>
              <CiCirclePlus onClick={onOpen} className=' cursor-pointer text-5xl text-white '/>
          </div>
    </div>
    <div className='mt-4 gap-4 flex flex-col'>
        {contacts.map((contact) =>(
            <ContactCard  key={contact.id} contact={contact}/>
      ))}
    </div>
    </div>
          <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
          <ToastContainer
          position='bottom-center'
          />
    </>
  ) 
}

export default App
