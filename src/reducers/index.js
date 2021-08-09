import { combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';
import service from "./service";

export default combineReducers({
   service: service,
//   form: formReducer
});
