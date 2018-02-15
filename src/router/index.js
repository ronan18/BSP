import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome'
import reaction from '@/components/reaction'
import typing from '@/components/typing'
import thanks from '@/components/thankyou'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/reaction',
      name: 'reaction',
      component: reaction
    },
    {
      path: '/typing',
      name: 'typing',
      component: typing
    },
    {
      path: '/thankyou',
      name: 'thanks',
      component: thanks
    }
  ]
})