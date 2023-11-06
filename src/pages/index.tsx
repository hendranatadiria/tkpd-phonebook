import styled from '@emotion/styled'
import { AllCapsHeader, Separator, StyledButton, TextField, TextHeader } from '@/components/commons';
import ContactList from '@/components/phonebook/ContactList';
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { addFavoriteContact, clearError, deleteContact, fetchContacts, fetchFavorites, removeFavoriteContact, setOpenedId, setQuery } from '@/redux/slices/phonebook';
import PaginationButton from '@/components/phonebook/PaginationButton';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Head from 'next/head';
import _ from 'lodash';
import ViewContactDetailsModal from '@/components/phonebook/ViewContactDetailsModal';

  const SearchField = styled(TextField)`
  margin-bottom: 1rem;
  background-color: #f5f5f5;
  padding: 1rem;
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
  const router = useRouter();
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

  const navigateAddNew = useCallback(() => {
    router.push('/add-new');
  }, [router]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeSearch = useCallback(_.debounce((e: ChangeEvent<HTMLInputElement>) => {
    console.log("searching");
    const val = e?.target?.value !== '' ? e?.target?.value : undefined;
    dispatch(setQuery(val));
    dispatch(fetchContacts(1));
    dispatch(fetchFavorites());
  }, 500)
  , [dispatch]);
  

  return (
    <>
    <Head>
      <title>Phonebook - Tokopedia WPE Test Project - Bernardinus Hendra Natadiria</title>
    </Head>
      <TextHeader>Phonebook</TextHeader>
      <SearchField name="searchBox" placeholder='Search your contact here...' onChange={handleChangeSearch}/>
      
      { (state.favoriteIds.length > 0 && state.favoriteContacts.length > 0) && (
      <>
        <AllCapsHeader>Favorites</AllCapsHeader>
        <ContactList loading={state.loading} data={state.favoriteContacts} 
        error={state.currentPage === 1 ? state.error : undefined} 
        onCardClick={(id) => dispatch(setOpenedId(id))}
        onFavClick={(id) => dispatch(removeFavoriteContact(id))}
        onDelClick={(id) => dispatch(deleteContact(id))}
        handleErrorClose={closeErr}
        />
        <Separator />
      </>
      )}

      <AllCapsHeader>Contacts</AllCapsHeader>
      <ContactList loading={state.loading} data={state.regularContacts} 
        error={state.currentPage !== 1 ? state.error : undefined} 
        onCardClick={(id) => dispatch(setOpenedId(id))}
        onFavClick={(id) => dispatch(addFavoriteContact(id))}
        onDelClick={(id) => dispatch(deleteContact(id))}
        handleErrorClose={closeErr}
      />
      <PaginationButton />

      <FloatingDiv>
        <StyledButton onClick={navigateAddNew}><PlusOutlined /> New Contact</StyledButton>
      </FloatingDiv>

      <ViewContactDetailsModal />
      
    </>
  )
}
