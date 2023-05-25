import { createSlice } from '@reduxjs/toolkit';

const options = {
    name: 'container',
    intitialState: {
        posts
    },
    reducers: {
        loadMedia: (state, action) => {
            const { subreddit, listing } = action.payload;

        }
    }
}

export const containerSlice = createSlice(options);