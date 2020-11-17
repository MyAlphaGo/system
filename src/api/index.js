import { get } from '@/utils/axios'
// 获取甘特图列表
export async function getGantList(params = {}) {
  return get('/api/dev/gantt', {
    params,
  })
}