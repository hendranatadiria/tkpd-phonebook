import { MAX_CONTACT_PER_PAGE } from "@/config/consts";
import { client } from "@/config/gql";
import { store } from "@/redux";
import { gql } from "@apollo/client";

export const GET_PHONEBOOK = gql`
query GetContactList (
  $distinct_on: [contact_select_column!], 
  $limit: Int, 
  $offset: Int, 
  $order_by: [contact_order_by!], 
  $where: contact_bool_exp
) {
  contact(
      distinct_on: $distinct_on, 
      limit: $limit, 
      offset: $offset, 
      order_by: $order_by, 
      where: $where
  ){
    first_name
    id
    last_name
    phones {
      number
    }
  }
  contact_aggregate(
      distinct_on: $distinct_on, 
      where: $where
  ){
    aggregate {
      count
    }
  }
}
`;

export const fetchPhoneBook = async (page: number) => {
  page = page < 1 ? 1 : page;
  const favIds:string[] = store.getState().phonebook.favoriteIds ?? []
  const response = await client.query({
  query: GET_PHONEBOOK,
  variables: {
    offset: (page - 1) * MAX_CONTACT_PER_PAGE,
    limit: MAX_CONTACT_PER_PAGE,
    sort: {
      first_name: "asc"
    },
    where: {
      _not: {
        id: {
          _in: favIds
        }
      }
    }
  },
})
return response.data;
}

export const fetchFavoritePhoneBook = async () => {
  const favIds:string[] = store.getState().phonebook.favoriteIds ?? []
  const response = await client.query({
    query: GET_PHONEBOOK,
    variables: {
      sort: {
        first_name: "asc"
      },
      where: {
        id: {
          _in: favIds
        }
      }
    }
  })
  return response.data;
}
