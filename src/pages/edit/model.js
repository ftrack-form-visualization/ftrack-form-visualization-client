export default {
  namespace: 'edit',
  state: {
    components: [
      {
        title: '文本输入框',
        icon: 'form',
        type: 'TextInput',
        default: {title: '未设置', placeholder: '', value: '', name: ''}
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
        title: '选择框',
        icon: 'select',
        type: 'Select',
        default: {title: '未设置', name: '', placeholder: '', list: []}
      },
      {
        title: '多行文本',
        icon: 'copy',
        type: 'TextArea',
        default: {title: '未设置', name: '', placeholder: '', default: ''}
      },
    ],
    templates: [],
    checkedItem: null
  },
  reducers: {
    setTemplates(state, {templates}) {
      return {...state, templates}
    },
    setCheckedItem(state, {checkedItem}) {
      return {...state, checkedItem}
    }
  }
}
