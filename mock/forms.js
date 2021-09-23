const initData = [
  {
    name: '表单1',
    'url': 'https://baijiahao.baidu.com/s?id=1711320884916273453&wfr=spider&for=pc',
    id: 1
  }, {
    name: '表单2',
    'url': 'https://baijiahao.baidu.com/s?id=1711320884916273453&wfr=spider&for=pc',
    id: 2
  }
]

export default {
  'GET /api/forms/get_forms': (req, res) => {
    return res.send({
      status: 'success',
      data: initData
    })
  },

  'POST /api/forms/del_form': (req, res) => {
    const resData = initData.filter(d => d.id !== req.body.id)
    return res.send({
      status: 'success',
      data: resData
    })
  },

  'POST /api/forms/edit_form': (req, res) => {
    return res.send({
      status: 'success',
      data: req.body.id ? req.body.id : '123456789'
    })
  }
}
