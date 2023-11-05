import { GET_PHONEBOOK } from '@/services/phonebook';
import { useQuery } from '@apollo/client/react';
import styled from '@emotion/styled';
import React from 'react'
import { BeatLoader } from 'react-spinners';
import ContactCard from './ContactCard';

const Alert = styled.div`
  background-color: #f44336;
  border-radius: 0.5rem;
  color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export default function ContactList() {
  const { loading, error, data } = useQuery(GET_PHONEBOOK);
  console.log(loading, error, data);

  return (
    <div>
      <BeatLoader loading={loading} />
      {Boolean(error) && <Alert>{error?.message}</Alert> }
      {data?.contact?.map((contact: any) => {
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
