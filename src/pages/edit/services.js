import request from "@/utils/request";

export function submit(payload) {
  return request('/api/forms/add_form', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
