import axios from 'axios'

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

export default {
	// 用户注册
	userRegister(data) {
		return instance.post('/api/v1/teacher', data)
	},
	// 修改用户信息
	UpdateUserInfo(data) {
		return instance.post('/api/v1/teacher', data)
	},
	// 创建课程
	createCourse(data) {
		return instance.post('/api/v1/course', data)
	},
	// 编辑课程信息
	updateCourse(data) {
		return instance.post('/api/v1/course', data)
	},
	// 删除课程
	deleteCourse(data) {
		return instance.post('/api/v1/course', data)
    },
    // 创建问卷
	createForm(data) {
		return instance.post('/api/v1/form/cr', data)
    },
    // 保持答案
    saveAnsForm(data) {
        return instance.post('/api/v1/ansForm', data)
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
	}
}
