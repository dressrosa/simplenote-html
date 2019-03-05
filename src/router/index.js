import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/article/Home'
// import ArticleComments from '@/components/article/ArticleComments'
// import Login from '@/components/common/Login'
import Mine from '@/components/user/Mine'
// import ArticleMine from '@/components/article/ArticleMine'
// import ArticleCollect from '@/components/article/ArticleCollect'
// import MineFollowing from '@/components/user/MineFollowing'
// import MineComments from '@/components/user/MineComments'
// import MineEdit from '@/components/user/MineEdit'
// import ArticleDetail from '@/components/article/ArticleDetail'
// import ArticleEdit from '@/components/article/ArticleEdit'
// import ArticleWrite from '@/components/article/ArticleWrite'

// import Loading from '@/components/Loading.vue'
import { Indicator } from 'mint-ui'
Vue.use(Router)
// const AsyncLoad = component => new Promise((resolve) => {
//   const load = () => ({ component, loading: Loading })
//   resolve({
//     functional: true,
//     name: 'AsyncLoad',
//     render: h => h(load)
//   })
// })
const ArticleDetail = resolve => {
  Indicator.open('Loading...')
  require(['@/components/article/ArticleDetail'], (component) => {
    resolve(component)
    Indicator.close()
  })
}

const Login = resolve => require(['@/components/common/Login'], resolve)
// const ArticleDetail = resolve => require(['@/components/article/ArticleDetail'], resolve)
const ArticleEdit = resolve => require(['@/components/article/ArticleEdit'], resolve)
const ArticleWrite = resolve => require(['@/components/article/ArticleWrite'], resolve)
const ArticleComments = resolve => require(['@/components/article/ArticleComments'], resolve)

const MineComments = resolve => require(['@/components/user/MineComments'], resolve)
const MineFollowing = resolve => require(['@/components/user/MineFollowing'], resolve)
const ArticleCollect = resolve => require(['@/components/article/ArticleCollect'], resolve)
const ArticleMine = resolve => require(['@/components/article/ArticleMine'], resolve)
const MineEdit = resolve => require(['@/components/user/MineEdit'], resolve)

const ArticleDetailContent = resolve => require(['@/components/article/ArticleDetailContent'], resolve)

const NoteHome = resolve => require(['@/components/note/NoteHome'], resolve)
const NoteLeft = resolve => require(['@/components/note/NoteLeft'], resolve)
const NoteMine = resolve => require(['@/components/note/NoteMine'], resolve)

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/content/hello',
      name: 'ArticleDetailContent',
      component: ArticleDetailContent,
      meta: {
        keepAlive: false
      }
    },
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
      path: '/notes',
      name: 'Notes',
      component: NoteHome,
      meta: {
        keepAlive: true,
        returnback: false
      }
    }, {
      path: '/mine/notes',
      name: 'NoteMine',
      component: NoteMine,
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
