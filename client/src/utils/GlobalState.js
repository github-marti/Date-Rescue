import React, { createContext, useReducer, useContext } from "react";
import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_RELOAD,
  UPDATE_ACTIVE,
  SET_NEW_EVENT,
  SET_UPCOMING_EVENT,
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

    case SET_RELOAD:
      return {
        ...state,
        reload: !state.reload
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

    case SET_UPCOMING_EVENT:
      console.log(action);
      return {
        ...state,
        upcomingEvent: action.event
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
      console.log("addinglike")
      return {
        ...state,
        likes: state.locations.map(location => {
          if (location.id === action.id) {
            location.likes += 1
          }
          return location
        })
      }

    case ADD_DISLIKE:
      console.log("addingdislike")
      return {
        ...state,
        dislikes: state.locations.map(location => {
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
    reload: false,
    authenticated: false,
    autocomplete: "",
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
    }],
    formatTime: time => {
      let hour = time.split(':')[0];
      if (hour.charAt(0) === '0') {
        hour = hour.substring(1);
      }
      let minutes = time.split(':')[1];
      return hour > 12 ? `${(hour - 12)}:${minutes} PM` : `${hour}:${minutes} AM`;
    },
    handleInputChange: event => {
      let name = event.target.name;
      let value = event.target.value;
      dispatch({
        type: UPDATE_EVENT,
        column: name,
        update: value
      });
    },
    handleDateChange: date => {
      let eventDate = date.toISOString();
      dispatch({
        type: UPDATE_EVENT,
        column: "event_date",
        update: eventDate
      });
    },
    handleTimeChange: time => {
      dispatch({
        type: UPDATE_EVENT,
        column: "event_time",
        update: time
      });
    }
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
