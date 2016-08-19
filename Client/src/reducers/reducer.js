/**
 * Created by GodofKim on 2016. 8. 19..
 */
import {
  FETCH_PROFILE_OTHER
} from  '../actions/type';

export default function(state = {}, action){
  switch(action.type) {
    case FETCH_PROFILE_OTHER:
      //...state -> state에 원래있던 애들 그대로 가져가면서.
      return { ...state, profileOther: action.payload};
  }

  return state;
}
