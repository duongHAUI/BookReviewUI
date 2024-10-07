import axiosClient from './axiosClient'
import baseApi from './baseApi'
export class userApi extends baseApi {
    AdminUser = (params) => {
        try {
        return axiosClient.post(this.baseUrl + 'AdminUser', params)
        } catch (error) {
        console.log(error)
        }
    }
  

  StopUsing = (id) => {
        try {
            return axiosClient.put(this.baseUrl + 'StopUsing' + "/" + id)
        } catch (error) {
            console.log(error)
        }
    }
    ResetPassword = (id) => {
        try {
            return axiosClient.put(this.baseUrl + 'ResetPassword' + "/" + id)
        } catch (error) {
            console.log(error)
        }
    }
}

export default userApi
