import * as FormServices from '@/pages/services'

export default {
  namespace: 'edit',
  state: {
    components: [
      {
        title: '文本输入框',
        icon: 'form',
        type: 'TextInput',
        default: {title: '未设置', placeholder: '', default: '', name: ''}
      },
      {
        title: '数字输入框',
        icon: 'form',
        type: 'NumberInput',
        default: {title: '未设置', min: 0, max: 10, name: '', default: 0}
      },
      {
        title: '开关',
        icon: 'branches',
        type: 'Switch',
        default: {
          title: '未设置',
          checkedText: '开启',
          uncheckedText: '关闭',
          default: true
        }
      },
      {
        title: '日期选择框',
        icon: 'calendar',
        type: 'DatePicker',
        default: {title: '未设置', name: ''}
      },
      {
        title: '下拉菜单',
        icon: 'select',
        type: 'Select',
        default: {
          title: '未设置',
          name: '',
          placeholder: '',
          list: []
        }
      },
      {
        title: '多选框',
        icon: 'check-square',
        type: 'CheckboxGroup',
        default: {title: '未设置', name: '', list: [], checkedList: []}
      },
      {
        title: '多行文本',
        icon: 'copy',
        type: 'TextArea',
        default: {
          title: '未设置',
          name: '',
          placeholder: '',
          default: '',
          autoSize: false
        }
      },
    ],
    templates: [],
    checkedItem: null,
    formName: ''
  },
  reducers: {
    setTemplates(state, {templates}) {
      return {...state, templates}
    },
    setData(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    * submit({id, formName, templates}, {call}) {
      return yield call(FormServices.submit, {id, formName, templates})
    },
    * fetch({id}, {put, call, select}) {
      yield put({
        type: 'setData',
        payload: {
          templates: [],
          checkedItem: null,
          formName: ''
        }
      })
      if (!id) return
      const res = yield call(FormServices.getForm, {id})
      if (res && res.status === 'success' && res.data) {
        yield put({
          type: 'setData',
          payload: {formName: res.data.name, templates: res.data.templates}
        })
      }
    }
  }
}
