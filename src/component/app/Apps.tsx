import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Table } from 'antd';
import { getApps } from '../../redux/actions/index';

const columns = [{
    title: '应用名称',
    key: 'app',
    dataIndex: 'app',
}, {
    title: 'Key',
    key: 'key',
    dataIndex: 'key'
}, {
    title: 'Secret',
    key: 'secret',
    dataIndex: 'secret'
}, {
    title: '是否过期',
    key: 'expired',
    dataIndex: 'expired',
    render: (expired: boolean) => expired ? '是': '否'
}, {
    title: '过期时间',
    key: 'expiredAt',
    dataIndex: 'expiredAt'
}, {
    title: '是否锁定',
    key: 'locked',
    dataIndex: 'locked',
    render: (locked: boolean) => locked ? '是': '否'
}];

const Apps: React.FC<any> = (props: any) => {

    function pagination(page: number | undefined = 1, size: number | undefined = 15) {
        props.makeSpin();
        getApps(page, size).then(props.getApps);
    }

    React.useEffect(() => {
        if (props.apps.elements.length == 0) {
            pagination(props.apps.page, props.apps.size);
        }
    })

    return <div>
        <PageHeader title="应用列表" />
        <br />
        <Table
            loading={ props.loading  }
            columns={columns}
            dataSource={props.apps ? props.apps.elements : []}
            pagination={{
                current: props.apps.page,
                total: props.apps.total,
                pageSize: props.apps.size,
                onChange: pagination,
                showQuickJumper: true}}
        />
    </div>
}

// map state to props
const s2p = (states: any) => ({
    apps: states.apps,
    loading: states.loading.some((s: string) => s === 'apps'),
});

// map dispatch to props
const d2p = (dispatch: any) => ({
    makeSpin: () => dispatch({type: 'LOAD_START', target: 'apps'}),
    getApps: (apps: any) => dispatch( { type: 'GET_APPS', apps })
})

export default connect(s2p, d2p)(Apps);
