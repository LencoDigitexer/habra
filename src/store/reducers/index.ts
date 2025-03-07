import { combineReducers } from 'redux'
import home from './home'
import settings from './settings'
import news from './news'
import hubs from './hubs'
import user from './profile'

export default combineReducers({
  news,
  home,
  settings,
  hubs,
  user,
})
