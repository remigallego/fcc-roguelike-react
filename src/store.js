import {createStore, combineReducers} from 'redux'
import mapReducer    from './reducers/mapReducer.js'

const DEV_TOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const combined = combineReducers({mapReducer})

export default createStore(combined, DEV_TOOLS)
