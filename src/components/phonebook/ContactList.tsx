import styled from '@emotion/styled';
import React from 'react'
import { BeatLoader } from 'react-spinners';
import ContactCard from './ContactCard';
import { useAppSelector } from '@/redux';

const Alert = styled.div`
  background-color: #f44336;
  border-radius: 0.5rem;
  color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function ContactList({loading, error, data} : {loading: boolean, error?: string, data: Contact[]}) {
  const phoneBookState = useAppSelector(state => state.phonebook);

  return (
    <div>
      <Center>
        <BeatLoader loading={loading} />
      </Center>
      {Boolean(error) && <Alert>{error}</Alert> }
      {data.map((contact) => {
      return (<ContactCard 
        key={contact.id}
       firstName={contact.first_name}
       lastName={contact.last_name}
        phoneNumber={contact.phones[0]?.number}
       />)}
      )}
    </div>
  )
}
