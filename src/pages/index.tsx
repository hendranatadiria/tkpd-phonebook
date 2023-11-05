import styled from '@emotion/styled'
import { AllCapsHeader, Card, CardTitle, Separator, TextField, TextHeader } from '@/components/commons';
import { font } from '@/config/theme';
import ContactList from '@/components/phonebook/ContactList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { fetchContacts } from '@/redux/slices/phonebook';
import PaginationButton from '@/components/phonebook/PaginationButton';

const Main = styled.main`
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem;
  `;

  const SearchField = styled(TextField)`
  margin-bottom: 1rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border: none;
  &::placeholder {
    color: #9e9e9e;
  }
  &:focus {
    outline: none;
  }
  `

export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.phonebook)

  useEffect(() => {
    dispatch(fetchContacts(state.currentPage));
  }, [dispatch, state.currentPage])
  

  return (
    <Main
      className={`${font.className}`}
    >
      <TextHeader>Phonebook</TextHeader>
      <SearchField name="searchBox" placeholder='Search your contact here...' />
      
      { state.favoriteIds.length > 0 && (
      <>
        <AllCapsHeader>Favorites</AllCapsHeader>
        <ContactList loading={state.loading} data={state.favoriteContacts} error={state.currentPage === 1 ? state.error : undefined}/>
        <Separator />
      </>
      )}

      <AllCapsHeader>Contacts</AllCapsHeader>
      <ContactList loading={state.loading} data={state.regularContacts} error={state.currentPage !== 1 ? state.error : undefined}/>
      <PaginationButton />

    </Main>
  )
}
