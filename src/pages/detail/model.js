import {router} from "umi";
import * as FormServices from '@/pages/services'

export default {
  namespace: 'detail',
  state: {
    templates: [],
    values: {}
  },
  reducers: {
    setData(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    * initData({id, defaultData}, {call, put}) {
      yield put({type: 'setData', payload: {templates: []}})
      const res = yield call(FormServices.getForm, {id})
      if (res && res.status === 'success' && res.data) {

        // 替换用户自定义数值
        let templates = res.data.templates
        for (let name in defaultData) {
          for (let i = 0; i < templates.length; i++) {
            if (templates[i].name === name) {
              if (['checkedList', 'Select'].includes(templates[i].type)) {
                templates[i].list = defaultData[name]
              } else {
                templates[i].default = defaultData[name]
              }
              break
            }
          }
        }
        yield put({type: 'setData', payload: {templates: templates}})
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
