import { get, post, del } from '@/utils/axios'


// 用户相关
export class UserService {
  static async login(params) {
    return post('/user/login', params)
  }
  static async getUserInfo(params = {}) {
    return get('/user/user_info', params)
  }
  static async createUser(params) {
    return post('/user/create', params)
  }
  static async editUser(params) {
    return post('/user/edit', params)
  }
  static async delUser(params) {
    return del('/user/delete', params)
  }
  static async getUserList(params) {
    return get('/user/list', params)
  }
  static async getAllUsers(params = {}) {
    return get('/user/all', params)
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
  static async getPositionInfo(params = {}) {
    return get('/position/user_info', params)
  }
  static async createPosition(params) {
    return post('/position/create', params)
  }
  static async editPosition(params) {
    return post('/position/edit', params)
  }
  static async delPosition(params) {
    return del('/position/delete', params)
  }
}

// 部门相关
export class DeptService {
  static async getDeptList(params = {}) {
    return get('/dept/list', params)
  }
  static async getDeptTree(params) {
    return get('/dept/tree', params)
  }
  static async getDeptInfo(params = {}) {
    return get('/dept/user_info', params)
  }
  static async createDept(params) {
    return post('/dept/create', params)
  }
  static async editDept(params) {
    return post('/dept/edit', params)
  }
  static async delDept(params) {
    return del('/dept/delete', params)
  }

}

// 培训相关
export class TrainService {
  static async getTrainInfo(params = {}) {
    return get('/train/user_info', params)
  }
  static async createTrain(params) {
    return post('/train/create', params)
  }
  static async editTrain(params) {
    return post('/train/edit', params)
  }
  static async delTrain(params) {
    return del('/train/delete', params)
  }
  static async getTrainList(params) {
    return get('/train/list', params)
  }
}

// 社保相关
export class SocialService {
  static async getSocialInfo(params = {}) {
    return get('/social/user_info', params)
  }
  static async createSocial(params) {
    return post('/social/create', params)
  }
  static async editSocial(params) {
    return post('/social/edit', params)
  }
  static async delSocial(params) {
    return del('/social/delete', params)
  }
  static async getSocialList(params) {
    return get('/social/list', params)
  }
}
export default UserService