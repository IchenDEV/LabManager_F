import fetchx from "@/util/fetch.js";
export default {
  Host:process.env.VUE_APP_SERVER_HOST,
  Api: {
    AddDevice: '/device/add',
    ListDevice: '/device/list',
    UpdateDevice: '/device/update',
    DelDevice: '/device/delete',

    HotDevice:'/book/getHot',
    AddBook:'/book/add',
    ExportBook:'/book/export',
    ListBook:'/book/list',
    UpdateBook:'/book/update',
    DelBook:'/book/delete',

    AddProject: '/project/add',
    ListProject: '/project/list',
    UpdateProject:'/project/update',
    DelProject: '/project/delete',

    
    TotalUseRate: '/analyse/totalUseRate',
    Counts: '/analyse/count',

    UserInfo: '/login/getInfo',
    UpdateInfo:'/login/updateInfo',
    Logout:'/login/logout',
    UpdatePassword:'/login/updatePassword',
    HyperSearch: '/hyperSearch/search',
    Login: '/login/auth',
    SingUp: '/singUp',

    GetAnnouncement:'/announcement/get',
    ListAnnouncement:'/announcement/list',
    AddAnnouncement:'/announcement/add',
    DelAnnouncement:'/announcement/delete',

    SetBackupSchedule:'/backup/setSchedule',
    GetBackupSchedule:'/backup/getSchedule',
    BackupNow:'/backup/now',

    ListMsg:'/msg/list',
    AddMsg:'/msg/addMsg',
    ReadMsg:'/msg/readMsg',

    DelLab:'/lab/delete',
    ListLab:'/lab/list',
    UpdateLab:'/lab/update',
    AddLab:'/lab/add',

    ListGroup:'/group/list',
    ListGroupUser:'/group/listUser',
    ListGroupProject:'/group/listProject',
    AddGroupUser:'/group/addUser',
    DelGroupUser:'/group/deleteUser',
    AddGroupProject:'/group/addProject',
    DelGroupProject:'/group/deleteProject',
    AddGroup:'/group/add',
    UpdateGroup:'/group/update',
    DeleteGroup:'/group/delete',

    ListUser:'/user/list',
    ListUserDepartment:'/user/listDepartment',
    ListUserGroup:'/user/listGroup',
    ListUserProject:'/user/listProject',
    DelUser:'/user/delete',
    UpdateUser:'/user/update',
    AddUser:'/user/add',

    AddDepartment:'/department/add',
    ListDepartment:'/department/list',
    ListDepartmentUser:'/department/listUser',
    AddDepartmentUser:'/department/listUser',
    DelDepartmentUser:'/department/deleteUser',
    DelDepartment:'/department/delete',
    UpdateDepartment:'/department/delete',

    ListLog:'/log/list'
  },
  removeEmptyKey(search) {
    for (var key in search) {
      if (search[key] === null || search[key] === "") {
        delete search[key];
      }
    }
    return search
  },
  timeBuilder(beginDate, beginTime) {
    return beginDate.getFullYear() +
      "-" +
      (new Number(beginDate.getMonth()) + 1) +
      "-" +
      beginDate.getDate() +
      " " +
      beginTime;
  },
  sha3(code) {
    const JsSHA = require('jssha')
    var shaObj = new JsSHA('SHA3-256', 'TEXT')
    shaObj.update(code)
    return shaObj.getHash('HEX')
  },
  stringCat(a, b, c) {
    return a + " " + b + " " + c;
  },
  easyfetch(api, data) {
    let fx = '{}'
    if (data != null) {
      this.removeEmptyKey(data)
      fx=JSON.stringify(data)
    }
    return new Promise((resolve) => {
      fetchx({
          method: 'Post',
          url: this.Host + api,
          data: fx
        })
        .then(res => {
          resolve(res)
        })
        .catch()
    })
  },
  fetchFile(api, data) {
    let fx = '{}'
    if (data != null) {
      fx=JSON.stringify(data)
    }
    return new Promise((resolve) => {
      fetchx({
          method: 'Post',
          url: this.Host + api,
          data: fx,
          responseType: 'blob'
        })
        .then(res => {
          resolve(res)
        })
        .catch()
    })
  },
}
