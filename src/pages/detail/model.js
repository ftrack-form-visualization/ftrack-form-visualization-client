import {router} from "umi";

export default {
  namespace: 'detail',
  state: {
    templates: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/detail' || pathname === '/detail/') {
          router.push('/')
        }
      })
    }
  }
}
