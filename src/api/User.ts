import axios from "axios";
import {restfulApiConfig} from "./Config";

export function Post(data: any): Promise<{ error: string | undefined }> {
    return axios.post(restfulApiConfig.apiURL + "/user", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return {
            error: undefined,
        };
    }).catch(err => {
        console.log(err.response);
        return {
            error: "[" + err.response.status + "] " + err.response.data.error,
        };
    })
}

export function PostGroup(id: number, data: any): Promise<{ error: string | undefined }> {
    return axios.post(restfulApiConfig.apiURL + "/group/" + id + "/user", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return {
            error: undefined,
        };
    }).catch(err => {
        console.log(err.response);
        return {
            error: "[" + err.response.status + "] " + err.response.data.error,
        };
    })
}

export function Delete(id: number): Promise<{ error: string | undefined }> {
    return axios.delete(restfulApiConfig.apiURL + "/user/" + id, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return {
            error: undefined,
        };
    }).catch(err => {
        console.log(err.response);
        return {
            error: "[" + err.response.status + "] " + err.response.data.error,
        };
    })
}

export function Put(id: number, data: any): Promise<{ error: string | undefined }> {
    return axios.put(restfulApiConfig.apiURL + "/user/" + id, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return {
            error: undefined,
        };
    }).catch(err => {
        console.log(err.response);
        return {
            error: "[" + err.response.status + "] " + err.response.data.error,
        };
    })
}

export function PasswordRecovery(email: string): Promise<{ error: string | undefined; data: any }> {
    return axios.post(restfulApiConfig.apiURL + "/recovery", {email}, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return {
            error: undefined,
            data: res.data
        };
    }).catch(err => {
        console.log(err.response);
        return {
            error: "[" + err.response.status + "] " + err.response.data.error,
            data: null
        };
    })
}