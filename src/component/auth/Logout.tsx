import React from 'react';
import { connect } from 'react-redux';

const Logout:React.FC<any> = (props: any) => {

    const [cleared, setCleared] = React.useState(false);

    React.useEffect(() => {

        if (props.token === null) {
            window.location.href = '/#/login'
        }

        if (!cleared && props.token !== null) {
            setTimeout(() => {
                window.sessionStorage.removeItem('token');
                props.logout()
                window.location.href = '/#/login'
            }, 2000)
        }
    }, [props]);

    return <div>正在退出</div>
}

const s2p = (state: any) => ({
    token: state.token
});

const d2p = (dispatch: any) => ({
    logout: () => dispatch({type: 'CLEAR_TOKEN'})
});

export default connect(s2p, d2p)(Logout);
