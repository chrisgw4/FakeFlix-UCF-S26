// Handles state updates for Netflix movie requests, including loading,
// successful fetches, loading additional movies, and error handling.

import { moviesActionTypes } from './movies.types';


const initialState = {
    loading: false,
    error: '',
    data: []
}


// Reducer that updates the Netflix movies state by handling loading status,
// replacing or appending movie results on success, and storing errors on failure.
const netflixMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case moviesActionTypes.FETCH_NETFLIX_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
			
		// Replaces entire movie list (payload: movie array)
        case moviesActionTypes.FETCH_NETFLIX_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
			
		// Appends additional movies for pagination (payload: movie array)
        case moviesActionTypes.LOAD_MORE_NETFLIX_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
		
		// Clears data on error (payload: error message string)
        case moviesActionTypes.FETCH_NETFLIX_MOVIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default netflixMoviesReducer;
