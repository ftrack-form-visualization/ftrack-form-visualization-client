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
    ],
    templates: []
  },
  reducers: {
    setTemplates(state, {templates}) {
      return {...state, templates}
    }
  }
}
