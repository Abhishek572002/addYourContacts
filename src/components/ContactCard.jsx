import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { IoMdTrash } from 'react-icons/io'
import { RiEdit2Fill } from 'react-icons/ri'
import useDisclose from '../hooks/useDisclose'
import {db} from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import { toast } from 'react-toastify'
const ContactCard = ({contact}) => {
      const {isOpen,onClose,onOpen} = useDisclose();
      const deleteContact = async (id) => {
            try {
                  await deleteDoc(doc(db,"contacts",id));
                  toast.success("Contact deleted Successfully");
            } catch (error) {
                  console.log(error);
            }
      }


  return (
      <>
      <div key={contact.id} className='flex items-center justify-between p-2 rounded-lg bg-yellow'>
      <div className='flex gap-1'>
          <HiOutlineUserCircle className='text-4xl text-orange ' />
          <div className='text-grey'>
            <h2 className='text-medium'>{contact.name}</h2>
            <p className='text-sm'>{contact.email}</p>
          </div>
      </div>
      <div className='flex text-3xl cursor-pointer' >
          <RiEdit2Fill onClick={onOpen} className='text-orange'/>
          <IoMdTrash onClick={() => deleteContact(contact.id)}/>
      </div>
    </div>
    <AddAndUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default ContactCard
