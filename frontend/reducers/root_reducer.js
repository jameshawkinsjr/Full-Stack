import { combineReducers } from 'redux';
import errorsReducer from './errors/errors_reducer';
import entitiesReducer from './entities/entities_reducer';
import sessionReducer from './session/session_reducer';
import uiReducer from './ui/ui_reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    entities: entitiesReducer,
    errors: errorsReducer,
    ui: uiReducer,
});

export default rootReducer;