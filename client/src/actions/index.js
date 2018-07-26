import AuthService from '../services/auth';
import EventService from '../services/events';
import OrganisationService from '../services/organisation';
import { normalize } from 'normalizr';
import { eventSchema, eventListSchema } from '../schemas/eventSchema';
import { organisationSchema } from '../schemas/organisationSchema';
import * as humps from 'humps';
// app

export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const TRIGGER_REQUEST = 'TRIGGER_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const TRIGGER_FAILURE = 'TRIGGER_FAILURE';

// current user
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const RESET_PASSWORD = 'RESET_PASSWORD';

// events
export const ADD_EVENT = 'ADD_EVENT';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENT_DETAIL = 'FETCH_EVENT_DETAIL';

// organisation
export const FETCH_ORGANISATION_DETAIL = 'FETCH_ORGANISATION_DETAIL';

// app actions

export const triggerRequest = name => ({
  type: TRIGGER_REQUEST,
  name,
});

export const endRequest = name => ({
  type: END_REQUEST,
  name,
});

export const triggerFailure = (name, error) => ({
  type: TRIGGER_FAILURE,
  name,
  error,
});

// user actions

export const userLoginSuccess = token => ({
  type: USER_LOGIN,
  token,
});

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT,
});

export const userSignupSuccess = token => ({
  type: USER_SIGNUP,
  token,
});

export const resetPasswordSuccess = message => ({
  type: RESET_PASSWORD,
  message,
});
export const refreshToken = payload => ({
  type: REFRESH_TOKEN,
  payload,
});
export const userLogout = () => (dispatch, getState) => {
  dispatch(userLogoutSuccess());
};

export const userLogin = credentials => async (dispatch, getState) => {
  dispatch(triggerRequest(USER_LOGIN));
  try {
    const token = await AuthService.login(
      credentials.username,
      credentials.password
    );
    if (token.access) dispatch(userLoginSuccess(token));
    dispatch(endRequest(USER_LOGIN));
    return token;
  } catch (e) {
    dispatch(triggerFailure(USER_LOGIN, e));
  }
};

// event actions

export const getEvents = events => ({
  type: FETCH_EVENTS,
  events,
});

export const getEventDetail = event => ({
  type: FETCH_EVENT_DETAIL,
  event,
});

export const getOrganisationDetail = organisation => ({
  type: FETCH_ORGANISATION_DETAIL,
  organisation,
});

export const addEvent = event => ({
  type: ADD_EVENT,
  event,
});

export const fetchEvents = () => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_EVENTS));
  return EventService.getAll()
    .then(response => {
      let camelCaseKeys = humps.camelizeKeys(response);
      dispatch(getEvents(normalize(camelCaseKeys, eventListSchema)));
      dispatch(endRequest(FETCH_EVENTS));
    })
    .catch(err => {
      //dispatch(triggerFailure(FETCH_EVENTS, err));
    });
};

export const fetchEventDetail = eventId => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_EVENT_DETAIL));
  try {
    const event = await EventService.getEventDetail(eventId);
    let camelCaseKeys = humps.camelizeKeys(event);
    dispatch(getEventDetail(normalize(camelCaseKeys, eventSchema)));
    dispatch(endRequest(FETCH_EVENT_DETAIL));
  } catch (e) {
    dispatch(triggerFailure(FETCH_EVENT_DETAIL, e));
  }
};

export const fetchOrganisationDetail = organisationId => async (
  dispatch,
  getState
) => {
  dispatch(triggerRequest(FETCH_ORGANISATION_DETAIL));
  try {
    const organisation = await OrganisationService.getOrganisationDetail(
      organisationId
    );
    let camelCaseKeys = humps.camelizeKeys(organisation);
    dispatch(
      getOrganisationDetail(normalize(camelCaseKeys, organisationSchema))
    );
    dispatch(endRequest(FETCH_ORGANISATION_DETAIL));
  } catch (e) {
    dispatch(triggerFailure(FETCH_ORGANISATION_DETAIL, e));
  }
};
export const userSignup = payload => async (dispatch, getState) => {
  dispatch(triggerRequest(USER_SIGNUP));
  try {
    const token = await AuthService.signup(payload);
    dispatch(userSignupSuccess(token.access));
    dispatch(endRequest(USER_SIGNUP));
    return token;
  } catch (e) {
    dispatch(triggerFailure(USER_SIGNUP, e));
  }
};
export const resetPassword = credentials => async (dispatch, getState) => {
  dispatch(triggerRequest(RESET_PASSWORD));
  try {
    const message = await AuthService.resetPassword(credentials.email);
    dispatch(resetPasswordSuccess(message));
    dispatch(endRequest(RESET_PASSWORD));
  } catch (e) {
    dispatch(triggerFailure(RESET_PASSWORD, e));
  }
};

export const postEvent = event => (dispatch, getState) => {
  dispatch(triggerRequest(ADD_EVENT));
  event = humps.decamelizeKeys(event);
  return EventService.add(event)
    .then(event => {
      // dispatch(addEvent(event))
      // cant use ADD_EVENT here since we are using different serializers for read and write
      // in write mode the organisation object isnt returned. So we simply fetch all again
      dispatch(fetchEvents());
      dispatch(endRequest(ADD_EVENT));
    })
    .catch(err => {
      dispatch(triggerFailure(ADD_EVENT, err));
    });
};
