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
    * fetch({_},{call,put}){

    }
  }
}
