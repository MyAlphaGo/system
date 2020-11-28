import { get, post, del, getBlob } from "@/utils/axios";

// 用户相关
export class UserService {
  static async login(params) {
    return post("/user/login", params);
  }
  static async getUserInfo(params = {}) {
    return get("/user/user_info", params);
  }
  static async createUser(params) {
    return post("/user/create", params);
  }
  static async editUser(params) {
    return post("/user/edit", params);
  }
  static async delUser(params) {
    return del("/user/delete", params);
  }
  static async getUserList(params) {
    return get("/user/list", params);
  }
  static async getAllUsers(params = {}) {
    return get("/user/all", params);
  }
  static async signIn() {
    return get("/user/check");
  }
  static async signInList(params) {
    return get("/user/check_list",params);
  }
}

// 角色相关
export class RoleService {
  static async getRoleList(params = {}) {
    return get("/role/list", params);
  }
}

// 职位相关
export class PositionService {
  static async getPositionList(params = {}) {
    return get("/position/list", params);
  }
  static async getPositionInfo(params = {}) {
    return get("/position/user_info", params);
  }
  static async createPosition(params) {
    return post("/position/create", params);
  }
  static async editPosition(params) {
    return post("/position/edit", params);
  }
  static async delPosition(params) {
    return del("/position/delete", params);
  }
}

// 部门相关
export class DeptService {
  static async getDeptList(params = {}) {
    return get("/dept/list", params);
  }
  static async getDeptTree(params) {
    return get("/dept/tree", params);
  }
  static async getDeptInfo(params = {}) {
    return get("/dept/user_info", params);
  }
  static async createDept(params) {
    return post("/dept/create", params);
  }
  static async editDept(params) {
    return post("/dept/edit", params);
  }
  static async delDept(params) {
    return del("/dept/delete", params);
  }
}

// 培训相关
export class TrainService {
  static async getTrainInfo(params = {}) {
    return get("/train/user_info", params);
  }
  static async createTrain(params) {
    return post("/train/create", params);
  }
  static async editTrain(params) {
    return post("/train/edit", params);
  }
  static async delTrain(params) {
    return del("/train/delete", params);
  }
  static async getTrainList(params) {
    return get("/train/list", params);
  }
}

// 社保相关
export class SocialService {
  static async getSocialInfo(params = {}) {
    return get("/social/user_info", params);
  }
  static async createSocial(params) {
    return post("/social/create", params);
  }
  static async editSocial(params) {
    return post("/social/edit", params);
  }
  static async delSocial(params) {
    return del("/social/delete", params);
  }
  static async getSocialList(params) {
    return get("/social/list", params);
  }
}
// 文件相关
export class FileService {
  static async getFileInfo(params = {}) {
    return get("/file/user_info", params);
  }
  static async createFile(params) {
    return post("/file/upload", params);
  }
  static async editFile(params) {
    return post("/file/edit", params);
  }
  static async delFile(params) {
    return del("/file/delete", params);
  }
  static async getFileList(params) {
    return get("/file/list", params);
  }
  static async getRecordList(params) {
    return get('/file/work_list', params)
  }
  static async getCurrentUserApprove(params) {
    return get("/approve/list", params);
  }
  static async detailFile(params) {
    return get("/file/detail", params);
  }
  static async createApprove(params) {
    return get("/approve/create", params);
  }
  static async opApprove(params) {
    return get("/approve/op", params);
  }
  static async getFile(params) {
    return getBlob(params);
  }
}
export class LogService {
  static async getDataList(params) {
    return get("/log/list", params);
  }
}

export default UserService;
