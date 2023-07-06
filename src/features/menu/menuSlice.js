import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const updateUrl = createAsyncThunk(
    'menu/updateUrl',
    async (query, thunkApi) => {
        return query;
    }
)

export const updateSort = createAsyncThunk(
    'menu/updateSort',
    async (order, thunkApi) => {
        return order;
    }
)

//define slice
const options = {
    name: 'menu',
    initialState: {
        sort: `new`,
        subReddit: '',
        currentUrl: '',
        loading: false
    },
    reducers: {},
    extraReducers: {

        [updateUrl.pending]: (state) => {
            state.loading = true;
        },
        [updateUrl.fulfilled]: (state, action) => {
            state.loading = false;
            state.subReddit = action.payload;
            state.currentUrl = `https://api.reddit.com/${action.payload}/${state.sort}`;
        },
        [updateUrl.rejected]: (state) => {
            state.loading = false;
        },


        [updateSort.pending]: (state) => {
            state.loading = true;
        },
        [updateSort.fulfilled]: (state, action) => {
            state.sort = action.payload;
            // state.currentUrl = `https://api.reddit.com/${state.subReddit}/${action.payload}.json`;
            state.loading = false;
        },
        [updateSort.rejected]: (state) => {
            state.loading = false;
        }
    }
}

//create and export
const menuSlice = createSlice(options);
//export reducer
export default menuSlice.reducer;

//export selector
export const selectUrl = state => state.menu.currentUrl;
export const selectSub = state => state.menu.subReddit;
export const selectSort = state => state.menu.sort;