import React, { useEffect, useMemo } from 'react'
import Modal from '../commons/Modal'
import { useAppDispatch, useAppSelector } from '@/redux'
import { fetchSingleContactData, setContactData, setOpenedId } from '@/redux/slices/phonebook';
import { AllCapsHeader, Card, TextHeader } from '../commons';
import styled from '@emotion/styled';

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;


export default function ViewContactDetailsModal() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.phonebook);

    const onClose = () => {
        dispatch(setOpenedId(undefined));
        dispatch(setContactData(undefined));
    }

    const contact:Contact | undefined = useMemo(() => state.contactData, [state.contactData]);

    useEffect(() => {
        console.log("fetching single contact data", state.openedId);
      dispatch(fetchSingleContactData());
    
    }, [state.openedId, dispatch])

    
  return (
    <Modal
    hasCloseBtn={true}
    isOpen={state.openedId !== undefined}
    onClose={onClose}
  >
        <TextHeader>{contact?.first_name} {contact?.last_name}</TextHeader>
        <AllCapsHeader>Phone Number</AllCapsHeader>
        <ContactContainer>
            {contact?.phones.map((phone, index) => (
                <div key={index}>{phone.number}</div>
            ))}
        </ContactContainer>
    </Modal>
  )
}
