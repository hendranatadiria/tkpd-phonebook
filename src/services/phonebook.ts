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

export const fetchPhoneBook = async (page: number, query?: string) => {
  page = page < 1 ? 1 : page;
  const favIds:string[] = store.getState().phonebook.favoriteIds ?? []
  const response = await client.query({
  query: GET_PHONEBOOK,
  fetchPolicy: "network-only",
  variables: {
    offset: (page - 1) * MAX_CONTACT_PER_PAGE,
    limit: MAX_CONTACT_PER_PAGE,
    order_by: {
      first_name: "asc"
    },
    where: {
      _and: [
        {
          _not: {
            id: {
              _in: favIds
            }}
        },
        ...(query !== undefined ? [{
          _or: [
            {
              first_name: {
                _ilike: `%${query}%`
              }
            },
            {
              last_name: {
                _ilike: `%${query}%`
              }
            },
            {
              phones: {
                number: {
                  _ilike: `%${query}%`
                }
              }
            }
          ]
        }] : [])
      ]
    }
  },
})
return response.data;
}

export const fetchFavoritePhoneBook = async (query?:string) => {
  const favIds:string[] = store.getState().phonebook.favoriteIds ?? []
  const response = await client.query({
    query: GET_PHONEBOOK,
    fetchPolicy: "network-only",
    variables: {
      order_by: {
        first_name: "asc"
      },
      where: {
        _and: [
          {
            id: {
              _in: favIds
            }
          },
          ...(query !== undefined ? [{
            _or: [
              {
                first_name: {
                  _ilike: `%${query}%`
                }
              },
              {
                last_name: {
                  _ilike: `%${query}%`
                }
              },
              {
                phones: {
                  number: {
                    _ilike: `%${query}%`
                  }
                }
              }
            ]
          }] : [])
        ]
      }
    }
  })
  return response.data;
}

export const INSERT_CONTACT = gql`
mutation AddContactWithPhones(
  $first_name: String!, 
  $last_name: String!, 
  $phones: [phone_insert_input!]!
  ) {
insert_contact(
    objects: {
        first_name: $first_name, 
        last_name: $last_name, 
        phones: { 
            data: $phones
          }
      }
  ) {
  returning {
    first_name
    last_name
    id
    phones {
      number
    }
  }
}
}
`;

export const FIND_PHONE_NUMBER = gql`
query FindPhoneNumber(
  $phoneNumbers: [String!]
) {
  phone (
    where: {
      number: {
        _in: $phoneNumbers
      }
    }
  ) {
    number
  }
}
`;

export const findPhoneNumber = async (phoneNumbers: string[]) => {
  const response = await client.query({
    query: FIND_PHONE_NUMBER,
    variables: {
      phoneNumbers
    }
  })
  return response.data;
}

export const DELETE_CONTACT = gql`
mutation DeleteById($id: Int!) {
  delete_contact_by_pk(id: $id) {
    first_name
    last_name
    id
  }
}
`;

export const removeContact = async (id: number) => {
  const response = await client.mutate({
    mutation: DELETE_CONTACT,
    variables: {
      id,
    }
  })
  return response.data;
}

export const GET_CONTACT_BY_ID = gql`
query GetContactById($id: Int!) {
  contact_by_pk(id: $id) {
    first_name
    last_name
    id
    phones {
      number
    }
  }
}
`;

export const getContactById = async (id: number) => {
  const response = await client.query({
    query: GET_CONTACT_BY_ID,
    variables: {
      id,
    }
  })
  return response.data;
}