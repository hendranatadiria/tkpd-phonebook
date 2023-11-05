import styled from '@emotion/styled';
import React from 'react'
import { BeatLoader } from 'react-spinners';
import ContactCard from './ContactCard';
import { useAppSelector } from '@/redux';
import { CloseOutlined } from '@ant-design/icons';
import { colors } from '@/config/theme';

const AlertDiv = styled.div`
  background-color: #f44336;
  border-radius: 0.5rem;
  color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const Alert = ({children, handleClose} : {children: React.ReactNode, handleClose?: React.MouseEventHandler<HTMLButtonElement> | undefined}) => {
  return (
    <AlertDiv>
      <div>
        {children}
      </div>
      <IconButton onClick={handleClose}>
      <CloseOutlined />
      </IconButton>
    </AlertDiv>
  )
}


const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function ContactList({loading, error, data, onCardClick, handleErrorClose} : {loading: boolean, error?: string, data: Contact[], onCardClick?: (id:number) => any, handleErrorClose?: React.MouseEventHandler<HTMLButtonElement> | undefined}) {
  const phoneBookState = useAppSelector(state => state.phonebook);

  return (
    <div>
      <Center>
        <BeatLoader loading={loading} size={10} color={colors.primary} style={{padding: '1rem'}}/>
      </Center>
      {Boolean(error) && <Alert handleClose={handleErrorClose}>{error}</Alert> }
      {data.map((contact) => {
      return (<ContactCard 
        key={contact.id}
       firstName={contact.first_name}
       lastName={contact.last_name}
        phoneNumber={contact.phones[0]?.number}
        onClick={ () => {
          if (onCardClick !== undefined) {
            onCardClick(contact.id)}
          }
      }
       />)}
      )}
    </div>
  )
}
