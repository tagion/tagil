import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

class Http {
    baseAxios: AxiosInstance;

    constructor() {
      this.baseAxios = axios.create({
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
      })

      this.baseAxios.interceptors.response.use(
        response => response,
        ({response}) =>
          Promise.reject({
            error: response,
            response,
          })
      )
    }

    get<T = AxiosResponse>(url: string, config?: AxiosRequestConfig) {
      return this.baseAxios.get<any extends T ? any : T>(url, config)
    }

    delete(url: string, config?: AxiosRequestConfig) {
      return this.baseAxios.delete(url, config)
    }

    post<T = AxiosResponse>(url: string, data: unknown = {}, config?: AxiosRequestConfig) {
      return this.baseAxios.post<unknown extends T ? unknown : T>(url, data, config)
    }

    put<T = AxiosResponse>(url: string, data: unknown = {}, config?: AxiosRequestConfig) {
      return this.baseAxios.put<unknown extends T ? unknown : T>(url, data, config)
    }
}

export default new Http()

export {AxiosResponse, AxiosInstance, Http}
