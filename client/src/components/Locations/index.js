import React, { useEffect } from 'react';
import FormData from 'form-data';
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/locationAPI';
import { ADD_LOCATION, ADD_LIKE, ADD_DISLIKE } from '../../utils/actions';