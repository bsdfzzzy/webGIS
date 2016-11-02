import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import { SearchNav, Home, ItemList, Navigation, Detail, Route } from './components'

Vue.use(VueRouter)
const router = new VueRouter()

router.map({
  '/': {
    name: 'home',
    component: Home
  },
  'searchResult': {
    name: 'result',
    component: ItemList
  },
  'navigation': {
    name: 'navigation',
    component: Navigation
  },
  'detail': {
    name: 'detail',
    component: Detail
  },
  'route': {
    name: 'route',
    component: Route
  }
})
export default router;
