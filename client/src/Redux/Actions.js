import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOGS_BY_ID = "GET_DOGS_BY_ID";
export const FILTER_SHOW_ALL = "FILTER_SHOW_ALL";
export const FILTER_FROM_BDD = "FILTER_FROM_BDD";
export const FILTER_FROM_API = "FILTER_FROM_API";
export const FILTER_TEMP = "FILTER_TEMP";

export const getAllDogs = () => {
    return async function (dispatch) {
        try {
            const endpoint = "http://localhost:3001/dogs";
            const response = await axios.get(endpoint);

            dispatch({
                type: GET_ALL_DOGS,
                payload: response.data,
            });

        } catch (err) {
            console.log(err);
        }
    }
};

export const getDogsById = (id) => {
    return async function (dispatch) {
        try {
            const endpoint = `http://localhost:3001/dogs/${id}`;
            const response = await axios.get(endpoint);

            dispatch({
                type: GET_DOGS_BY_ID,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const filterTemp = () => {
    return async function (dispatch) {
        try{
            const endpoint = "http://localhost:3001/temperament";
            const response = await axios.get(endpoint);

            dispatch({
                type: FILTER_TEMP,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const filterFromBdd = () => {
    return {
        type: FILTER_FROM_BDD,
    };
};

export const filterFromApi = () => {
    return {
        type: FILTER_FROM_API,
    };
};

export const filterShowAll = () => {
    return {
        type: FILTER_SHOW_ALL,
    };
};