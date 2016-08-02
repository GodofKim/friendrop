import {
  AUTH_USER,
  UNAUTH_USER ,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_ARRAY,
  FETCH_DROPS,
  FETCH_PROFILE,
  FETCH_LETTERS
} from  '../actions/type';

export default function(state = {}, action){
  switch(action.type) {
    case AUTH_USER:
      //...state -> state에 원래있던 애들 그대로 가져가면서.
      return { ...state, error: '', authenticated: true};
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload};
    case FETCH_ARRAY:
      return { ...state, array: action.payload};
    case FETCH_DROPS:
      return { ...state, drops: action.payload};
    case FETCH_PROFILE:
      return { ...state, profile: action.payload};
    case FETCH_LETTERS:
      return { ...state, letters: action.payload};
  }

  return state;
}
