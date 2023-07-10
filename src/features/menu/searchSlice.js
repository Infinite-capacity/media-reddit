import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getSuggestions = createAsyncThunk(
    'search/getSuggestions',
    async (query, thunkApi) => {
        const results = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);//&include_over_18=on
        const data = await results.json();
        const entries = []
        let i = 0;

        data.data.children.map( (child) =>{
            if (i < 5) {
            const entry = {}; 
            entry.url = child.data.url.slice(1,-1);
            entry.id = child.data.name;
            entries.push(entry);
            i ++;
            }
            return;
        })
        return entries;
    }
)




const options = {
    name: 'search',
    initialState: {
        query: '',
        suggestions: [],
        loading: false,
        nsfw: ''
    },
    reducers: {
        updateQuery: (state, action) => {
            state.query = action.payload;
        },
        clearSuggestions: (state) => {
            state.suggestions = '';
        },
        toggleNsfw: (state) => {
            if(state.nsfw) {
                state.nsfw = '';
            } else {
                state.nsfw = '&include_over_18=on';
            }
        }
    },
    extraReducers: {
        [getSuggestions.pending]: (state) => {
            state.loading = true;
        },
        [getSuggestions.fulfilled]: (state, action) => {
            state.suggestions = action.payload;
            state.loading = false;
        },
        [getSuggestions.rejected]: (state) => {
            state.loading = false;
        }
    }

}



const searchSlice = createSlice(options);
export default searchSlice.reducer;
export const { updateQuery, clearSuggestions, toggleNsfw } = searchSlice.actions;
export const selectQuery = state => state.search.query;
export const selectSuggestions = state => state.search.suggestions;
export const selectNsfw = state => state.search.nsfw;