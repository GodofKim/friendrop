import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import reducer from './reducer';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  data: reducer
});

export default rootReducer;
