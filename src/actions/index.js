import {
    SET_LOADER,
    INITIALDATA
} from "./types";

// Set loader
export const setLoader = loader => dispatch => {
    dispatch({ type: SET_LOADER, payload: loader });
};

export const getInitialData = (jsonData) => async dispatch => {
   return dispatch({ type: INITIALDATA, payload: jsonData });
}
