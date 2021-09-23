import request from "@/utils/request";

export function submit(payload) {
  return request('/api/forms/edit_form', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export function fetch(payload) {
  return request('/api/forms/get_form', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
