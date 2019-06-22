import { getSomething } from '../../request/Request';

const LOAD_START = 'LOAD_START';
const LOAD_END = 'LOAD_END';
const SET_APPS = 'SET_APPS';
const GET_APPS = 'GET_APPS';
const SET_FACES = 'SET_FACES';
const GET_FACES = 'GET_APPS';
const TOGGLE_APP_LOCK = 'TOGGLE_APP_LOCK';

const HOST = 'http://localhost:8080'

const getApps = async (page: number = 1, size: number = 20) => {
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

const toggleAppLock = async (app: any) => {

    const json = await getSomething(`${HOST}/api/v1/app/lock/${app.id}`);

    if (json !== null && json !== undefined) {
        return json.payload;
    }

    return app;
}

export {
    LOAD_START,
    LOAD_END,
    SET_APPS,
    GET_APPS,
    SET_FACES,
    GET_FACES,
    TOGGLE_APP_LOCK,

    getApps,
    toggleAppLock
}
