import {
    GET_APPS,
    GET_FACES,
    LOAD_START,
    APPEND_APP,
    SET_TOKEN,
    CLEAR_TOKEN
} from '../actions/index';

const reducer = (state: any, action: any) => {

    switch (action.type) {
        case GET_APPS: {
            const { apps } = action;
            const loaded = new Set([...state.loaded, 'apps'])
            const { loading } = state;
            loading.delete('apps');
            return {...{...state}, apps, loading, loaded};
        }

        case GET_FACES: {
            const { faces } = action;
            const loaded = new Set([...state.loaded, 'faces'])
            const { loading } = state;
            loading.delete('faces');
            return {...{...state}, faces, loading, loaded}
        }

        case APPEND_APP: {
            const { apps } = state;
            apps.elements.push(action.app)

            return {...{...state}, apps}
        }

        case LOAD_START: {
            const { loading } = state;
            loading.add(action.target);
            return {...{...state}, loading}
        }

        case SET_TOKEN: {
            return {...{...state}, token: action.token}
        }

        case CLEAR_TOKEN: {
            return {...{...state}, token: null}
        }

        default:
            return state;
    }
}

export default reducer;
