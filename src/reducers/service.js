import {
    SET_LOADER,
    INITIALDATA
} from "../actions/types";

const INITIAL_STATE = {
    response: [],
    isLoading: false,
    initialData: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOADER:
            return { ...state, isLoading: action.payload };
        case INITIALDATA:
            return { ...state, initialData: action.payload, isLoading: false };
        default:
            return state;
    }
};
