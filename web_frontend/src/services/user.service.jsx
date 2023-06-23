import axios from 'axios';

class UserService {
    signin(email, password) {
        const uploadData = new FormData();
        uploadData.append('email', email);
        uploadData.append('password', password);
        return axios.post(process.env.REACT_APP_API_URL+'/auth/login/', uploadData);
    }

    signup(form) {
        const uploadData = new FormData();
        for (const key in form) {
            uploadData.append(key, form[key]);
        };
        return axios.post(process.env.REACT_APP_API_URL+'/auth/signup/', uploadData);
    }
}

export default new UserService();