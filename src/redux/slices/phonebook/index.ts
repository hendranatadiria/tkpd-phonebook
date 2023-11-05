import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  favoriteIds: string[];
} = {
  favoriteIds: [],
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
  },
});

export default phonebook.reducer;
export const {addFavorite, removeFavorite} = phonebook.actions;