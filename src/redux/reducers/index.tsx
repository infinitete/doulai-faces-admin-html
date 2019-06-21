import {
    GET_APPS, GET_FACES, LOAD_START
} from '../actions/index';

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case GET_APPS: {
            const { apps } = action;
            const loaded = new Set([...state.loaded, 'apps'])
            console.log(loaded);
            const loading  = state.loading.filter((s: string) => s !== 'apps');
            return {...{...state}, apps, loading, loaded};
        }
        case GET_FACES: {
            const { faces } = action;
            const loaded = new Set([...state.loaded, 'faces'])
            const loading  = state.loading.filter((s: string) => s !== 'faces`');
            return {...{...state}, faces, loading, loaded}
        }
        case LOAD_START: {
            const { loading } = state;
            loading.push(action.target);
            return {...{...state}, loading}
        }

        default:
            return state;
    }
}

export default reducer;
