import styled from '@emotion/styled'
import { AllCapsHeader, Separator, TextField, TextHeader } from '@/components/commons';
import ContactList from '@/components/phonebook/ContactList';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { addFavoriteContact, clearError, fetchContacts, fetchFavorites, removeFavoriteContact } from '@/redux/slices/phonebook';
import PaginationButton from '@/components/phonebook/PaginationButton';

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

  const FloatingDiv = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  `

export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.phonebook)

  useEffect(() => {
    dispatch(fetchContacts(state.currentPage));
  }, [dispatch, state.currentPage])

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch])

  const closeErr = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);
  

  return (
    <>
      <TextHeader>Phonebook</TextHeader>
      <SearchField name="searchBox" placeholder='Search your contact here...' />
      
      { (state.favoriteIds.length > 0 && state.favoriteContacts.length > 0) && (
      <>
        <AllCapsHeader>Favorites</AllCapsHeader>
        <ContactList loading={state.loading} data={state.favoriteContacts} 
        error={state.currentPage === 1 ? state.error : undefined} 
        onCardClick={(id) => dispatch(removeFavoriteContact(id))}
        handleErrorClose={closeErr}
        />
        <Separator />
      </>
      )}

      <AllCapsHeader>Contacts</AllCapsHeader>
      <ContactList loading={state.loading} data={state.regularContacts} 
      error={state.currentPage !== 1 ? state.error : undefined} 
      onCardClick={(id) => dispatch(addFavoriteContact(id))}
      handleErrorClose={closeErr}
      />
      <PaginationButton />
    </>
  )
}
