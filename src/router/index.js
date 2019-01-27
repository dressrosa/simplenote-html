import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/article/Home'
import ArticleComments from '@/components/article/ArticleComments'
import Login from '@/components/common/Login'
import Mine from '@/components/user/Mine'
import ArticleMine from '@/components/article/ArticleMine'
import ArticleCollect from '@/components/article/ArticleCollect'
import MineFollowing from '@/components/user/MineFollowing'
import MineComments from '@/components/user/MineComments'
import MineEdit from '@/components/user/MineEdit'
// import ArticleDetail from '@/components/article/ArticleDetail'
// import ArticleEdit from '@/components/article/ArticleEdit'
// import ArticleWrite from '@/components/article/ArticleWrite'
import Hello from '@/components/note/Hello'
import NoteLeft from '@/components/note/NoteLeft'
Vue.use(Router)
const ArticleDetail = resolve => require(['@/components/article/ArticleDetail'], resolve)
const ArticleEdit = resolve => require(['@/components/article/ArticleEdit'], resolve)
const ArticleWrite = resolve => require(['@/components/article/ArticleWrite'], resolve)

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/article/write',
      name: 'ArticleWrite',
      component: ArticleWrite,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/article/edit/:articleId',
      name: 'ArticleEdit',
      component: ArticleEdit
    },
    {
      path: '/article/:articleId/comments',
      name: 'ArticleComments',
      component: ArticleComments,
      meta: {
        keepAlive: true,
        returnback: false
      }
    },
    {
      path: '/article/:articleId',
      name: 'ArticleDetail',
      component: ArticleDetail,
      meta: {
        keepAlive: true,
        returnback: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mine/articles',
      name: 'ArticleMine',
      component: ArticleMine,
      meta: {
        keepAlive: true,
        returnback: false
      }
    }, {
      path: '/mine/collects/articles',
      name: 'ArticleCollect',
      component: ArticleCollect,
      meta: {
        keepAlive: true,
        returnback: false
      }
    }, {
      path: '/mine/comments',
      name: 'MineComments',
      component: MineComments,
      meta: {
        keepAlive: true,
        returnback: false
      }
    }, {
      path: '/mine/following',
      name: 'MineFollowing',
      component: MineFollowing,
      meta: {
        keepAlive: true,
        returnback: false
      }
    }, {
      path: '/mine/edit',
      name: 'MineEdit',
      component: MineEdit
    }, {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }, {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
        returnback: false
      }
    }, {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        keepAlive: true,
        returnback: false
      }
    }, {
      path: '/note/left',
      name: 'NoteLeft',
      component: NoteLeft
    }
  ]
})
