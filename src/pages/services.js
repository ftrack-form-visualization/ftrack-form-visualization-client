import request from "@/utils/request";

export function fetch() {
  return request('/api/forms/get_forms')
}

export function deleteForm(id) {
  return request('/api/forms/del_form', {
    method: 'POST',
    body: JSON.stringify({id})
  })
}

export function submit(payload) {
  return request('/api/forms/edit_form', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export function getForm(payload) {
  return request('/api/forms/get_form', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
