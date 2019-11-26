import React, { createContext, useReducer, useContext } from "react";
import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_EVENT,
  SET_PAST_EVENTS,
  UPDATE_EVENT,
  REMOVE_EVENT,
  COMPLETE_EVENT,
  ADD_LOCATION,
  ADD_LIKE,
  ADD_DISLIKE,
  REMOVE_LOCATION
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

    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.newEvent
      }

    case SET_PAST_EVENTS:
      return {
        ...state,
        pastEvents: action.pastEvents
      }

    case UPDATE_EVENT:
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          [action.column]: action.update
        }
      }

    case COMPLETE_EVENT:
      return {
        ...state,
        currentEvent: {},
        pastEvents: [
          ...state.pastEvents,
          action.completedEvent
        ]
      }

    case REMOVE_EVENT:
      return {
        ...state,
        pastEvents: state.pastEvents.filter(event => {
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

      case REMOVE_LOCATION:
        return {
          ...state,
          locations: state.locations.filter(location => {
            return location.id !== action.id
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
    currentEvent: {},
    pastEvents: [],
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
