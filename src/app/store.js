import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import containerReducer from '../features/media/container/containerSlice';
import searchReducer from '../features/menu/searchSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    container: containerReducer,
    search: searchReducer,

  },
});
