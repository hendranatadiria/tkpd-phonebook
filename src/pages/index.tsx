import styled from '@emotion/styled'
import { Card, CardTitle, TextField, TextHeader } from '@/components/commons';
import { font } from '@/config/theme';
import ContactList from '@/components/phonebook/ContactList';
import FavoriteList from '@/components/phonebook/FavoriteList';

const Main = styled.main`
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem;
  `;

  const SearchField = styled(TextField)`
  margin-bottom: 1rem;
  background-color: #e0e0e0;
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

  return (
    <Main
      className={`${font.className}`}
    >
      <TextHeader>Phonebook</TextHeader>
      <SearchField name="searchBox" placeholder='Search your contact here...' />
      <FavoriteList />
      <ContactList />

    </Main>
  )
}
