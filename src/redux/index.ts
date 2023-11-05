import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import phonebookReducer from './slices/phonebook/'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/lib/persistStore'

const phonebookPersistConfig = {
  key: 'phonebook',
  storage,
  whitelist: ['favoriteIds']
}

export const store = configureStore({
  reducer: {
    phonebook: persistReducer(phonebookPersistConfig, phonebookReducer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();