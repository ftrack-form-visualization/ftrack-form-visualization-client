export default {
  'POST /api/forms/get_forms': (req, res) => {
    return res.send({
      status: 'success',
      data: [
        {
          name: '表单1',
          'url': 'https://baijiahao.baidu.com/s?id=1711320884916273453&wfr=spider&for=pc',
          id: 1
        }, {
          name: '表单2',
          'url': 'https://baijiahao.baidu.com/s?id=1711320884916273453&wfr=spider&for=pc',
          id: 2
        }
      ]})
  }
}
