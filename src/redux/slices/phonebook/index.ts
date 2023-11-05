import { MAX_CONTACT_PER_PAGE } from "@/config/consts";
import { client } from "@/config/gql";
import { AppThunk } from "@/redux";
import { GET_PHONEBOOK, fetchFavoritePhoneBook, fetchPhoneBook } from "@/services/phonebook";
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
} = {
  favoriteIds: [],
  currentPage: 1,
  favoriteContacts: [],
  regularContacts: [],
  length: 0,
  loading: false,
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
      const maxPage = Math.ceil(state.length / MAX_CONTACT_PER_PAGE)
      if (action.payload < 1) {
        state.currentPage = 1;
      } else if (action.payload > maxPage && maxPage > 0) {
        state.currentPage = maxPage;
      }
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
    }
  },
});

export default phonebook.reducer;
export const {addFavorite, removeFavorite, setCurrentPage, setFavoriteList, setRegularList, setLength, setLoading, setError, clearError} = phonebook.actions;

export const fetchContacts = (page: number): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setCurrentPage(page));
      dispatch(setLoading(true));
      const regular = await fetchPhoneBook(page);
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
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const favorites = await fetchFavoritePhoneBook();
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