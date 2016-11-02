import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import { SearchNav, Home, ItemList } from './components'

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
  }
})
export default router;
