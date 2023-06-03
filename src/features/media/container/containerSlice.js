import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectUrl } from '../../menu/menuSlice';
import { useSelector } from 'react-redux';

export const fetchMediaUrls = createAsyncThunk(
    'container/fetchMediaUrls',
    async (url, thunkApi) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }  
)

const options = {
    name: 'container',
    initialState: {
        mediaUrls: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [fetchMediaUrls.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchMediaUrls.fulfilled]: (state, action) => {
            state.isLoading = false;
            const children = action.payload.data.children;
            children.map(child => {
                state.mediaUrls.push(child.data.url);
            })          
        },
        [fetchMediaUrls.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        }
    }
}
//create slice
const containerSlice = createSlice(options);
//export reducer as default
export default containerSlice.reducer;
//export selector
export const selectMediaUrls = state => state.container.mediaUrls;