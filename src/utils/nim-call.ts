/*
 * http请求
 */

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { CURRENT_HOST, IS_PROD, IS_MOCK, AXIOS_DEFAULT_CONFIG, CONMOM_PRAMS } from '@/config';

const httpStatus = {
    OK: 200,
    MOVED: 302,
    BAD: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    TOO_LARGE: 413,
    ERROR: 500,
    NOT_IMPLEMENTED: 501
};

/**
 */
export default class Request {
    private get host(): string {
        return CURRENT_HOST;
    }

    private get isMock(): boolean {
        return IS_MOCK;
    }

    private get isProd(): boolean {
        return IS_PROD;
    }

    /**
     * @param  {string} url
     * @param  {any} param?
     * @param  {AxiosRequestConfig} option?
     */
    public get(url: string, param?: any, option?: AxiosRequestConfig) {
        return axios
            .get(this.host + url, { params: param, timeout: AXIOS_DEFAULT_CONFIG.timeout })
            .then((res) => this.handelResponse(res))
            .then((result) => this.handleError(result));
    }

    /**
     * @param  {string} url
     * @param  {any} body
     * @param  {any} param?
     * @param  {AxiosRequestConfig} option?
     */
    public post(url: string, body: any, param?: any, option?: AxiosRequestConfig) {
        return axios
            .post(this.host + url, body, { params: param, timeout: AXIOS_DEFAULT_CONFIG.timeout })
            .then((res) => this.handelResponse(res))
            .then((result) => this.handleError(result));
    }

    /**
     * @param  {string} url
     * @param  {any} body?
     * @param  {any} param?
     * @param  {AxiosRequestConfig} option?
     */
    public put(url: string, body?: any, param?: any, option?: AxiosRequestConfig) {
        return axios
            .put(this.host + url, body, { params: param, timeout: AXIOS_DEFAULT_CONFIG.timeout })
            .then((res) => this.handelResponse(res))
            .then((result) => this.handleError(result));
    }

    /**
     * @param  {string} url
     * @param  {any} param?
     * @param  {AxiosRequestConfig} option?
     */
    public delete(url: string, param?: any, option?: AxiosRequestConfig) {
        return axios
            .delete(this.host + url, { params: param, timeout: AXIOS_DEFAULT_CONFIG.timeout })
            .then((res) => this.handelResponse(res))
            .then((result) => this.handleError(result));
    }

    private handelResponse(res: AxiosResponse): { ok: boolean; data: any } {
        switch (res.status) {
            case httpStatus.OK:
                return { ok: true, data: res.data };
            case httpStatus.MOVED:
                return { ok: false, data: `重定向到` + res.data };
            case httpStatus.BAD:
                return { ok: false, data: res.data ? res.data : '请求错误' };
            case httpStatus.UNAUTHORIZED:
                return { ok: false, data: res.data ? res.data : '请求需要用户认证' };
            case httpStatus.NOT_FOUND:
                return { ok: false, data: res.data ? res.data : '不存在的资源' };
            case httpStatus.TOO_LARGE:
                return { ok: false, data: res.data ? res.data : '上传资源体积过大' };
            case httpStatus.ERROR:
                return { ok: false, data: res.data ? res.data : '服务器内部错误，无法完成请求' };
            case httpStatus.NOT_IMPLEMENTED:
                return {
                    ok: false,
                    data: res.data ? res.data : '服务器不支持请求的功能，无法完成请求'
                };
            default:
                return {
                    ok: false,
                    data: res.data ? res.data : '未知错误,  status' + res.status
                };
        }
    }

    private handleError(result: { ok: boolean; data: any }) {
        if (result.ok) {
            return result.data;
        } else {
            this.showError(result.data);
            return false;
        }
    }

    private showError(msg: string) {
        if (this.isProd) {
            // ..重写错误信息展示方式
            console.log(msg);
        } else {
            console.log(msg);
        }
    }
}
