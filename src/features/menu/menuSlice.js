import { createSlice } from '@reduxjs/toolkit';

//define slice
const options = {
    name: 'menu',
    initialState: {
        sort: `new`,
        subReddit: '',
        currentUrl: ``,
    },
    reducers: {
        updateSort: (state, action) => {
            state.sort = action.payload;
            state.currentUrl = `https://www.reddit.com/${state.subReddit}/${state.sort}.json`
        },
        updateUrl: (state, action) => {
            state.subReddit = action.payload;
            state.currentUrl = `https://www.reddit.com/${action.payload}/${state.sort}.json`
        }
    }
}

//create and export
const menuSlice = createSlice(options);
//export reducer
export default menuSlice.reducer;
//export actions
export const { updateSort, updateUrl} = menuSlice.actions;
//export selector
export const selectUrl = state => state.menu.currentUrl;