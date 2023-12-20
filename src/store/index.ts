import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  type Reducer,
} from "redux";
import { thunk } from "redux-thunk";

export type RootReducer = {};

const reducer: Reducer<RootReducer, any, any> = combineReducers({}) as any;

export default createStore(reducer, applyMiddleware(thunk));
