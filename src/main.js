import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { Field, Button, NavBar, List, Cell, CellGroup, Tag, PullRefresh, Checkbox, CheckboxGroup, Toast, Loading, Swipe, SwipeItem } from 'vant'

Vue.use(Field)
.use(Button)
.use(NavBar)
.use(List)
.use(Cell)
.use(CellGroup)
.use(Tag)
.use(PullRefresh)
.use(Checkbox)
.use(CheckboxGroup)
.use(Toast)
.use(Loading)
.use(Swipe)
.use(SwipeItem)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
