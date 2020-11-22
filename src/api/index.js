import { get, post, del } from '@/utils/axios'


// 用户相关
export class UserService {
  static async login(params) {
    return post('/user/login', params)
  }
  static async getUserInfo(params) {
    return get('/user/user_info', {
      params
    })
  }
  static async createUser(params) {
    return post('/user/create', params)
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

// 角色相关
export class RoleService {

  static async getRoleList(params = {}) {
    return get('/role/list', params)
  }
}

// 职位相关
export class PositionService {
  static async getPositionList(params = {}) {
    return get('/position/list', params)
  }
}

// 部门相关
export class DeptService {
  static async getDeptList(params = {}) {
    return get('/dept/list', params)
  }
}
export default UserService