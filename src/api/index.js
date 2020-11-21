import { get, post, del } from '@/utils/axios'


// 用户管理
export class UserService {
  static async login(params) {
    return post('/user/login',  params)
  }
  static async getUserInfo(params) {
    return get('/user/user_info', {
      params
    })
  }
  static async createUser(params) {
    return post('/user/create', {
      params
    })
  }
  static async editUser(params) {
    return post('/user/edit', {
      params
    })
  }
  static async delUser(params) {
    return del('/user/delete', {
      params
    })
  }
  static async getUserList(params) {
    return get('/user/list', params)
  }
}
export default UserService