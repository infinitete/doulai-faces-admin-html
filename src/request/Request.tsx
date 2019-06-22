const getToken = () => window.sessionStorage.getItem('token');

type mode = 'cors' | 'same-origin' | 'no-cors' | 'navigate' | undefined;

const getSomething = async (url: string) => {
    const token  = getToken();
    if (token == null) {
        window.location.href = '/#/login';
        return;
    }

    // https?://hostname
    /* const isCors = url.split(/\b\/\b/)[0].indexOf(window.location.host) < 7; */

    const headers = new Headers();
    headers.append('authorization', token);

    try {
        const res = await fetch(url, {
            method: 'get',
            headers
        });

        if (res.status === 403) {
            window.location.href = '/#/login';
            return;
        }

        if (res.status === 200) {
            return await res.json();
        }

        return null;
    } catch(e ) {
        window.console.log(e);
        window.location.href = '/#/login';
        return;
    }
}

const login = async (url: string, username: string, password: string) => {
    // https?://hostname
    const isCors = url.split(/\b\/\b/)[0].indexOf(window.location.host) < 7;

    let m: mode = undefined;

    if (isCors) {
        m = 'cors';
    }
    const options = { method: 'post', mode: m, body: null };
    if (isCors) {
        options.mode = 'cors';
    }

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    return await fetch(url, {...options, body: form});
};

export {
    login,
    getSomething
}
