import axios from "axios";
import {restfulApiConfig} from "./Config";
import shaJS from "sha.js"
import Cookies from "js-cookie";

const len = 30;

export function GenerateUserToken(): string {
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const cl = c.length;
    let result = '';
    for (let i = 0; i < len; i++) {
        result += c[Math.floor(Math.random() * cl)];
    }
    return result;
}


export function LoginInit(): Promise<string> {
    return axios.get(restfulApiConfig.apiURL + "/login", {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        console.log(res.data);
        return res.data.token;
    }).catch(err => {
        console.log(err);
        return "";
    })
}

export function Login(email: string, password: string): Promise<string> {
    Cookies.set('user_token', GenerateUserToken())
    return axios.get(restfulApiConfig.apiURL + "/login", {
        headers: {
            'Content-Type': 'application/json',
            USER_TOKEN: Cookies.get('user_token')
        }
    }).then(res => {
        const passHash: string = shaJS('sha256').update(password).digest('hex');
        const hash: string = shaJS('sha256').update(passHash + res.data.token).digest('hex');

        // console.log("USER_TOKEN: " + sessionStorage.getItem('user_token'));
        // console.log("HASH_PASS: " + hash);
        // console.log("E-Mail: " + email);

        return axios.post(restfulApiConfig.apiURL + "/login", null, {
            headers: {
                'Content-Type': 'application/json',
                USER_TOKEN: Cookies.get('user_token'),
                HASH_PASS: hash,
                Email: email
            }
        }).then(res => {
            Cookies.set('access_token', res.data.token[0].access_token)
            return "";
        }).catch(err => {
            return "[" + err.response.status + "] " + err.response.data.error;
        })
    }).catch(err => {
        return "[" + err.response.status + "] " + err.response.data.error;
    })
}

export function Logout(): Promise<string> {
    return axios.post(restfulApiConfig.apiURL + "/logout", {}, {
        headers: {
            'Content-Type': 'application/json',
            'ACCESS_TOKEN': Cookies.get('access_token'),
        }
    }).then(res => {
        console.log(res.data.token[0]);
        return "";
    }).catch(err => {
        console.log(err);
        return err;
    })
}

// export const login = Login
