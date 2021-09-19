import * as FormsServices from './services'

export default {
  namespace: 'index',
  state: {
    forms: []
  },
  reducers: {
    setData(state, {payload: {forms}}) {
      return {forms}
    }
  },
  effects: {
    * fetch({_}, {call, put}) {
      const res = yield call(FormsServices.fetch)
      if (res && res.status === 'success') {
        yield put({type: 'setData', payload: {forms: res.data}})
      } else {
        yield put({type: 'setData', payload: {forms: []}})
      }
    },
    * deleteForm({id}, {call, put}) {
      const res = yield call(FormsServices.deleteForm, id)
      if (res && res.status === 'success') {
        yield put({type: 'setData', payload: {forms: res.data}})
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/') {
          dispatch({type: 'fetch'})
        }
      })
    }
  }
}
