import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";

export const getAllDogs = () => {
    return async function (dispatch){
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
}