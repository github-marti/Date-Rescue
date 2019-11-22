import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    currentEvent: {
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventPicture: ""
    },
    pastEvents: [],
    upcomingCall: {},
    upcomingText: {},
    locations: [{
        locationName: "",
        locationAddress: "",
        locationCity: "",
        locationState: "",
        locationZip: "",
        angelShot: "",
        like: 0,
        dislike: 0
    }]
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
