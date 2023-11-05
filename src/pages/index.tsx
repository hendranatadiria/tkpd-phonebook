import styled from '@emotion/styled'
import { Card, CardTitle, TextField, TextHeader } from '@/components/commons';
import { font } from '@/config/theme';
import ContactCard from '@/components/phonebook/ContactCard';

const Main = styled.main`
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem;
  `;

  const SearchField = styled(TextField)`
  margin-bottom: 1rem;
  `


export default function Home() {
  return (
    <Main
      className={`${font.className}`}
    >
      <TextHeader>Phonebook</TextHeader>
      <SearchField name="searchBox" placeholder='Search your contact here...'>

      </SearchField>
      <ContactCard firstName='John' lastName='Doe' phoneNumber='08123456789' />
    </Main>
  )
}
