import { get, post, del } from '@/utils/axios'

//test

export async function test(params) {
  return get('/state/check', {
    params,
  })
}
// 用户管理
export class UserService {
  static async login(params) {
    return post('/user/login', {
      params,
    })
  }
  async getUserInfo(params) {
    return get('/user/user_info', {
      params
    })
  }
  async createUser(params) {
    return post('/user/create', {
      params
    })
  }
  async editUser(params) {
    return post('/user/edit', {
      params
    })
  }
  async delUser(params) {
    return del('/user/delete', {
      params
    })
  }
  async getUserList(params) {
    return get('/user/list', {
      params
    })
  }
}