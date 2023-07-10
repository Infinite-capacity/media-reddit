import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';


export const fetchMediaUrls = createAsyncThunk(
    'container/fetchMediaUrls',
    async (url, thunkApi) => {
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        return data;
    }  
)

export const loadMore = createAsyncThunk(
    'container/loadMore',
    async (url, thunkApi) => {
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        return data;
    }
)



const options = {
    name: 'container',
    initialState: {
        mediaUrls: [],
        ids: [],
        isLoading: false,
        after: '',
    },
    reducers: {},
    extraReducers: {

        //Fetch Media Urls

        [fetchMediaUrls.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchMediaUrls.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.mediaUrls = [];
            state.after = action.payload.data.after;
            const children = action.payload.data.children;
            const urls = [];
            children.forEach(child => {
                let name = child.data.name;
                let url = child.data.url;
                const entry = {};
                
                /* eslint-disable no-fallthrough */
                switch (true) {
                    //make all requests https
                    case !url.includes('https'):
                        url = "https" + url.slice(4,0);
                        // break omitted
                    //check for duplicates
                    case urls.includes(url):
                        break;

                    //add url to test array
                    case url:
                        urls.push(url);
                        //break omitted
                    //imgur
                    case url.includes('imgur.com'):
                        switch(true)
                        {
                            case url.includes('imgur.com/a') && (!url.includes('.jpg')|| !url.includes('.png') || !url.includes('.jpeg')):
                                break;
                            case url.includes('.gifv'):
                                url = url.slice(0,-4) + 'mp4';
                                entry.url = url;
                                entry.name = name;
                                state.mediaUrls.push(entry);
                                break;
                            case url.includes('i.imgur') && (url.includes('.jpg') || url.includes('.png') || url.includes('gif')):
                                entry.url = url;
                                entry.name = name;
                                state.mediaUrls.push(entry);
                                break;
                            default:
                                url = url.slice(0,8) +'i.' + url.slice(8) + '.jpg';
                                entry.url = url;
                                entry.name = name;
                                state.mediaUrls.push(entry); 
                            }
                        break;

                    //reddit
                    case url.includes('i.redd') && (url.includes('.jpg') || url.includes('.png') || url.includes('.gif')):
                        entry.url = url;
                        entry.name = name;
                        state.mediaUrls.push(entry);
                        break;

                    //galleries
                    case child.data.gallery_data:
                        child.data.gallery_data.items.map((item) => {
                            url = `https://i.redd.it/${item.media_id}.jpg`;
                            name = item.media_id;
                            entry.url = url;
                            entry.name = name;
                            state.mediaUrls.push(entry);
                        });
                        break;
                    
                    //no match
                    default:
                        break;
                }
                /* eslint-enable no-fallthrough */
            })
        },
        [fetchMediaUrls.rejected]: (state, action) => {
            state.isLoading = false;
            console.error(action.error);
        },

        //Load More

        [loadMore.pending]: (state) => {
            state.isLoading = false;
        },
        [loadMore.fulfilled]: (state, action) => {
            state.isLoading = false;
            const children = action.payload.data.children;
            state.after = action.payload.data.after;
            //state must be accessed through current when using redux toolkit
            const latest = current(state.mediaUrls)
            const urls = [];
            latest.forEach(u => urls.push(u.url));
            children.forEach(child => {
                let name = child.data.name;
                let url = child.data.url;
                const entry = {};
                /* eslint-enable no-fallthrough */
                switch (true) {
                    //make all requests https
                    case !url.includes('https'):
                        url = "https" + url.slice(4,0);
                        // break omitted
                    //check for duplicates
                    case urls.includes(url):
                        break;

                    //add url to test array
                    case url:
                        urls.push(url);
                        //break omitted
                    //imgur
                    case url.includes('imgur.com'):
                        switch(true)
                        {
                            case url.includes('imgur.com/a') && (!url.includes('.jpg')|| !url.includes('.png') || !url.includes('.jpeg')):
                                break;
                            case url.includes('.gifv'):
                                url = url.slice(0,-4) + 'mp4';
                                entry.url = url;
                                entry.name = name;
                                state.mediaUrls.push(entry);
                                break;
                            case url.includes('i.imgur') && (url.includes('.jpg') || url.includes('.png') || url.includes('gif')):
                                entry.url = url;
                                entry.name = name;
                                state.mediaUrls.push(entry);
                                break;
                            default:
                                url = url.slice(0,8) +'i.' + url.slice(8) + '.jpg';
                                entry.url = url;
                                entry.name = name;
                                state.mediaUrls.push(entry); 
                            }
                        break;

                    //reddit
                    case url.includes('i.redd') && (url.includes('.jpg') || url.includes('.png') || url.includes('.gif')):
                        entry.url = url;
                        entry.name = name;
                        state.mediaUrls.push(entry);
                        break;

                    //galleries
                    case child.data.gallery_data:
                        child.data.gallery_data.items.map((item) => {
                            url = `https://i.redd.it/${item.media_id}.jpg`;
                            name = item.media_id;
                            entry.url = url;
                            entry.name = name;
                            state.mediaUrls.push(entry);
                            return;
                        });
                        break;
                    
                    //no match
                    default:
                        break;
                }
                /* eslint-enable no-fallthrough */
            })          
        },
        [loadMore.rejected]: (state, action) => {
            state.isLoading = false;
            console.error(action.error);
        }
    }
}
//create slice
const containerSlice = createSlice(options);
//export reducer as default
export default containerSlice.reducer;
//export selector
export const selectMediaUrls = state => state.container.mediaUrls;
export const selectIsLoading = state => state.container.isLoading;
export const selectAfter = state => state.container.after;