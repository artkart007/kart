import { config } from './env'
import { post, get } from 'axios';

export const apiservice = {
    fetchUsers: function () { 
        let url = this.getBaseUrl() + '/api/v1/users';
        return get(url);
     },
    fetchArtsAvailable: function (userId) {
        let url = this.getBaseUrl() + '/api/v1/arts';
        url += '/findByUserId/' + userId;

        return get(url);
    },
    getBaseUrl: function () {
        if (config.env === 'prod') {
            return '';
        }

        return 'http://localhost:8090'
    },
    fileUpload: function (file, customName, userId, description, currency, price) {
        const url = this.getBaseUrl() + '/api/v1/arts/upload';
        const formData = new FormData();
        formData.append('file', file)
        formData.append('customName', customName);
        formData.append('userId', userId);
        formData.append('description', description);
        formData.append('currency', currency);
        formData.append('price', price);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

}