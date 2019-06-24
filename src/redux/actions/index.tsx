import * as Types from '../../types/index';
import { getSomething, postSomething } from '../../request/Request';

const CH_PASS = 'CH_PASS';
const SET_TOKEN = 'SET_TOKEN';
const CLEAR_TOKEN = 'CLEAR_TOKEN';
const APPEND_APP = 'APPEND_APP';
const DELETE_APP = 'DELETE_APP';
const LOAD_START = 'LOAD_START';
const LOAD_END = 'LOAD_END';
const SET_APPS = 'SET_APPS';
const GET_APPS = 'GET_APPS';
const SET_FACES = 'SET_FACES';
const GET_FACES = 'GET_FACES';
const TOGGLE_APP_LOCK = 'TOGGLE_APP_LOCK';

const HOST = 'http://localhost:8080'

const getApps = async (page: number = 1, size: number = 15) => {
    const json = await getSomething(`${HOST}/api/v1/app/${page}/${size}`);

    if (json !== null && json !== undefined) {
        return json.payload;
    }

    return {
        page: 1,
        size: 15,
        total: 0,
        elements: []
    };
}

const appendApp = (apps: any, app: Types.App) => {
    if (app === null || app === undefined) {
        return apps;
    }

    apps.elements.append(app);

    return apps;
}

const toggleAppLock = async (app: Types.App) => {

    const json = await getSomething(`${HOST}/api/v1/app/lock/${app.id}`);

    if (json !== null && json !== undefined) {
        return json.payload;
    }

    return app;
}

const createApp = async (app: string, expiredAt: string, desc: string) => {
    const form = new FormData();
    form.append('app', app);
    form.append('expiredAt', expiredAt);
    form.append('desc', desc);
    return await postSomething(`${HOST}/api/v1/app/create`, form);
}


//
// 获取已注册人脸信息
//
const getPictures = async (page: number = 1, size: number = 15) => {
    const json = await getSomething(`${HOST}/api/v1/picture/${page}/${size}`);

    if (json !== null && json !== undefined) {
        return json.payload;
    }

    return {
        page: 1,
        size: 15,
        total: 0,
        elements: []
    };
}

const chPass = async (o: string, n: string) => {
    const form = new FormData();
    form.append('o', o);
    form.append('n', n);
    return await postSomething(`${HOST}/api/v1/user/pass`, form);
}

export {
    APPEND_APP,
    DELETE_APP,
    LOAD_START,
    LOAD_END,
    SET_APPS,
    GET_APPS,
    SET_FACES,
    GET_FACES,
    SET_TOKEN,
    CLEAR_TOKEN,
    TOGGLE_APP_LOCK,
    CH_PASS,

    getApps,
    createApp,
    appendApp,
    toggleAppLock,
    chPass,
    getPictures,
}
