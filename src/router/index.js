import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/article/Home'
import ArticleDetail from '@/components/article/ArticleDetail'
import ArticleComments from '@/components/article/ArticleComments'
import Login from '@/components/common/Login'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/article/:articleId/comments',
      name: 'ArticleComments',
      component: ArticleComments
    }, {
      path: '/article/:articleId',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
