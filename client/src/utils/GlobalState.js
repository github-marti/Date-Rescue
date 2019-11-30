import React, { createContext, useReducer, useContext } from "react";
import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_ACTIVE,
  SET_NEW_EVENT,
  SET_ALL_EVENTS,
  UPDATE_EVENT,
  REMOVE_EVENT,
  COMPLETE_EVENT,
  ADD_LOCATION,
  ADD_LIKE,
  ADD_DISLIKE
} from './actions';

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        username: action.username,
        userid: action.userid
      }

    case LOGOUT_USER:
      return {
        ...state,
        username: ''
      }

    case UPDATE_ACTIVE:
      return {
        ...state,
        active: action.active
      }

    case SET_NEW_EVENT:
      return {
        ...state,
        newEvent: action.newEvent
      }

    case SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.allEvents
      }

    case UPDATE_EVENT:
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          [action.column]: action.update
        }
      }

    case COMPLETE_EVENT:
      return {
        ...state,
        newEvent: {},
        allEvents: [
          ...state.allEvents,
          action.completedEvent
        ]
      }

    case REMOVE_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.filter(event => {
          return action.id !== event.id
        })
      }

    case ADD_LOCATION:
      return {
        ...state,
        locations: [
          ...state.locations,
          action.newLocation
        ]
      }

    case ADD_LIKE:
      return {
        ...state,
        locations: state.locations.map(location => {
          if (location.id === action.id) {
            location.likes += 1
          }
          return location
        })
      }

    case ADD_DISLIKE:
      return {
        ...state,
        locations: state.locations.map(location => {
          if (location.id === action.id) {
            location.dislikes += 1
          }
          return location
        })
      }
      
      default:
        return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    userid: 0,
    authenticated: false,
    newEvent: {},
    allEvents: [],
    upcomingCall: {},
    upcomingText: {},
    locations: [{
      id: 0,
      locationName: "",
      locationAddress: "",
      locationCity: "",
      locationState: "",
      locationZip: "",
      angelShot: "",
      likes: 0,
      dislikes: 0
    }]
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
