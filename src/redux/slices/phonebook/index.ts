import { AppThunk } from "@/redux";
import { fetchFavoritePhoneBook, fetchPhoneBook, getContactById, removeContact } from "@/services/phonebook";
import { ApolloError } from "@apollo/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  favoriteIds: number[];
  favoriteContacts: Contact[];
  regularContacts: Contact[];
  currentPage: number;
  length: number;
  loading: boolean;
  error?: string;
  query?: string;
  openedId?: number;
  contactData?: Contact;
} = {
  favoriteIds: [],
  currentPage: 1,
  favoriteContacts: [],
  regularContacts: [],
  length: 0,
  loading: false,
  openedId: undefined,
  contactData: undefined,
};

const phonebook = createSlice({
  name: "phonebook",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteIds.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFavoriteList: (state, action) => {
      state.favoriteContacts = action.payload;
    },
    setRegularList: (state, action) => {
      state.regularContacts = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setOpenedId: (state, action) => {
      state.openedId = action.payload;
    },
    setContactData: (state, action) => {
      state.contactData = action.payload;
    }
  },
});

export default phonebook.reducer;
export const {addFavorite, removeFavorite, setCurrentPage, setFavoriteList, setRegularList, setLength, setLoading, setError, clearError, setQuery, setOpenedId, setContactData} = phonebook.actions;

export const fetchContacts = (page: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      console.log("FETCHING CONTACTS!");
      dispatch(setCurrentPage(page));
      dispatch(setLoading(true));
      const regular = await fetchPhoneBook(page, getState().phonebook.query);
      dispatch(setRegularList(regular?.contact));
      dispatch(setLength(regular?.contact_aggregate?.aggregate?.count));
      dispatch(setLoading(false));
    } catch (e) {
      if (e instanceof ApolloError) {
        dispatch(setError(e.message));
      } else {
        console.error(e);
        dispatch(setError((e as any)?.message ?? 'Unknown error when fetching contacts'));
      }
    }
  };
}

export const fetchFavorites = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const favorites = await fetchFavoritePhoneBook(getState().phonebook.query);
      dispatch(setFavoriteList(favorites.contact));
      dispatch(setLoading(false));
    } catch (e) {
      if (e instanceof ApolloError) {
        dispatch(setError(e.message));
      } else {
        console.error(e);
        dispatch((e as any)?.message ?? 'Unknown error when fetching favorite contacts');
      }
    }
  };
}

export const addFavoriteContact = (id: number): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(addFavorite(id));
    dispatch(fetchFavorites());
    dispatch(fetchContacts(getState().phonebook.currentPage))
  };
}

export const removeFavoriteContact = (id: number): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(removeFavorite(id));
    dispatch(fetchFavorites());
    dispatch(fetchContacts(getState().phonebook.currentPage))
  };
}

export const deleteContact = (id: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const response = confirm("Are you sure you want to delete this contact?");
      if (response) {
        removeContact(id).then(() => {
          dispatch(removeFavorite(id));
          dispatch(fetchContacts(getState().phonebook.currentPage))
          dispatch(fetchFavorites());
        });
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        dispatch(setError(e.message));
      } else {
        console.error(e);
        dispatch((e as any)?.message ?? 'Unknown error when deleting contact');
      }
    }
  };
}

export const fetchSingleContactData = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const id = getState().phonebook.openedId;
      if (id !== undefined) {
        const contact = await getContactById(id);
        dispatch(setContactData(contact.contact_by_pk));
      }
      dispatch(setLoading(false));
    } catch (e) {
      if (e instanceof ApolloError) {
        dispatch(setError(e.message));
      } else {
        console.error(e);
        dispatch((e as any)?.message ?? 'Unknown error when fetching contact data');
      }
    }
  };
}