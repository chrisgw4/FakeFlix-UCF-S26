/*
Custom React hook for fetching category data based on the current route,
selected category, and page number using Redux.
*/


import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";

/*
Custom React hook for managing category-based data fetching.
Selects the appropriate data configuration based on route and category,
dispatches Redux thunks to fetch paginated data, and returns category metadata.
*/
export const useRetrieveCategory = (slicedUrl, categoryName, page) => {

	const dispatch = useDispatch();
	const [categoryData, setCategoryData] = useState();
	
	
	/*
	When the route, category, or page changes, select the appropriate
	category config and dispatch its Redux thunk to fetch the new data.
	*/
	useEffect(() => {
		let selectedConfigArray = null;
		
		// Figures out which category config array to retrieve data from
		switch (slicedUrl) {
			case "browse":
			case "movies":
				selectedConfigArray = fetchMovieDataConfig;
				break;
			case "tvseries":
				selectedConfigArray = fetchSeriesDataConfig;
				break;
			case "popular":
				selectedConfigArray = fetchPopularDataConfig;
				break;
			default:
				break;
		}

		// Retrieves the config object whose genre matches the selected category name
		const [data] = selectedConfigArray.filter(el => el.genre === categoryName);
		dispatch(data.thunk(`${data.url}&page=${page}`));
		setCategoryData(data);

	}, [dispatch, categoryName, slicedUrl, page])

	return categoryData;
}
