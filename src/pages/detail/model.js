import {router} from "umi";
import * as FormServices from '@/pages/services'

export default {
  namespace: 'detail',
  state: {
    templates: [],
    values: []
  },
  reducers: {
    setData(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    * initData({id}, {call, put}) {
      yield put({type: 'setData', payload: {templates: []}})
      const res = yield call(FormServices.getForm, {id})
      if (res && res.status === 'success' && res.data) {
        yield put({type: 'setData', payload: {templates: res.data.templates}})
      }
    }
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
