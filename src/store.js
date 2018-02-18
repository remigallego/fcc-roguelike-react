import {createStore, combineReducers} from 'redux'
import playerReducer from './reducers/playerReducer.js'
import mapReducer    from './reducers/mapReducer.js'

const DEV_TOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const combined = combineReducers({playerReducer,mapReducer})

export default createStore(combined, DEV_TOOLS)
