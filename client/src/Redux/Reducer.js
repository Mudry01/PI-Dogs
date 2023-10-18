import {
    GET_ALL_DOGS,
    GET_DOGS_BY_ID,
    FILTER_SHOW_ALL,
    FILTER_FROM_BDD,
    FILTER_FROM_API,
    FILTER_TEMP
} from "./Actions";

const initialState = {
    dogs: [],
    allDogs: [],
    dogsDetail: [],
    temperaments: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };

        case GET_DOGS_BY_ID:
            return {
                ...state,
                dogsDetail: action.payload,
            };

        case FILTER_FROM_BDD:
            return {
                ...state,
                dogs: state.allDogs.filter((dog) => dog.createdInBd === true),
            };

        case FILTER_FROM_API:
            return {
                ...state,
                dogs: state.allDogs.filter((dog) => dog.createdInBd === false),
            };

        case FILTER_SHOW_ALL:
            return {
                ...state,
                dogs: state.allDogs,
            };

        case FILTER_TEMP:
            return {
                ...state,
                temperaments: action.payload,
            };
        default:
            return { ...state };

    }
};

export default rootReducer;
