import { DataState } from '../enum/data-state.enum';

// represents the entire state of the application at any given moment
// this is a "reactive" approach
// Using ? optional for appData and error since we can't have both - we either get an error or appData
export interface AppState<T> {
  dataState: DataState; // determine the state of the data
  appData?: T; // T for whatever type is passed from AppState will be the type for appData
  error?: string;
}
