import axios from 'axios'

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if (localStorage.getItem('mateToken')) {
		config.headers.Authorization = `token ${localStorage.getItem('mateToken')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
	return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
	return response
}, err => {
	if (err.response) {
		switch (err.response.status) {
			case 401:
				// 返回 401 清除token信息并跳转到登录页面
				localStorage.removeItem('mateToken');
				window.location.href = '/';
		}
	}
	return Promise.reject(err)
})

export default {
	// 用户注册
	userRegister(data) {
		return instance.post('/api/v1/teacher/register', data)
	},
	// 教师登陆
	userLogin(data) {
		return instance.post('/api/v1/teacher/login', data);
	},
	// 修改用户信息
	updateUserInfo(data) {
		return instance.post('/api/v1/teacher/updateInfo', data)
	},
	// 更改密码
	updatePwd(data) {
		return instance.post('/api/v1/teacher/updatePwd', data)
	},
	// 学生注册
	studentRegister(data) {
		return instance.post('/api/v1/student/register', data)
	},
	studentLogin(data) {
		return instance.post('/api/v1/student/login', data);
	},
	// 创建课程
	createCourse(data) {
		return instance.post('/api/v1/course/create', data)
	},
	// 编辑课程信息
	updateCourse(data) {
		return instance.post('/api/v1/course/update', data)
	},
	// 删除课程
	deleteCourse(data) {
		return instance.post('/api/v1/course/delete', data)
    },
    // 创建问卷
	createForm(data) {
		return instance.post('/api/v1/form/cr', data)
    },
    // 保存答案
    saveAnsForm(data) {
        return instance.post('/api/v1/ansForm/save', data)
    },
    // 获取问卷地址
    getLink(data) {
        return instance.post('/api/v1/form/getLink', data)
    },

	// 获得课程信息
	getCourses(teacher_id) {
		return instance.get('/api/v1/courses?teacher_id=' + teacher_id)
	},
	// 获得问卷状态
	getAnsFormStatus(course_id, form_id) {
		return instance.get('/api/v1/ansForm/getStatus?course_id=' + course_id + '&form_id=' + form_id)
	},
	//获得问卷
	getForm(form_link) {
		return instance.get('/api/v1' + form_link);
	},
	// 获得问卷地址二维码
	getQr() {
		return instance.get();
	}
}
