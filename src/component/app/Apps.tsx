import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Icon, Input, PageHeader, Table, Tag } from 'antd';
import { getApps } from '../../redux/actions/index';

moment.locale('zh-cn')

const columns = [{
    title: '应用名称',
    key: 'app',
    dataIndex: 'app',
    filterDropdown: <div style={{padding: 8}}>
        <Input placeholder='查找应用' style={{ width: 188, marginBottom: 8, display: 'block' }} />
        <p />
        <Button icon="search" style={{ width: 90, marginRight: 4 }} type="primary"  size="small">查找</Button> <Button size="small" style={{ width: 90 }}>重置</Button>
    </div>
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
    render: (expired: boolean) => expired ? <Tag color='orange'>已过期</Tag>:<Tag color='green'>未过期</Tag>,
    filters: [{text:'已过期', value:true}, {text:'未过期', value: false}] as any,
    onFilter: (value: boolean, record: any) => record.expired === value,
    filterMultiple: false
}, {
    title: '创建时间',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (c: number) => moment(c).format('Y年MM月DD日 H时m分s秒'),
    sorter: (a: any, b: any) => a.createdAt - b.createdAt
}, {
    title: '过期时间',
    key: 'expiredAt',
    dataIndex: 'expiredAt',
    render: (e: number) => moment(e).format('Y年MM月DD日 H时m分s秒')
}, {
    title: '是否锁定',
    key: 'locked',
    dataIndex: 'locked',
    render: (locked: boolean) => locked? <Tag color='orange'><Icon type="lock" /> 已锁定</Tag>:<Tag color='green'>未锁定</Tag>
}];

const Apps: React.FC<any> = (props: any) => {

    function pagination(page: number | undefined = 1, size: number | undefined = 15) {
        props.makeSpin();
        getApps(page, size).then(props.getApps);
    }

    const cols = [...columns, {  title: '操作', render: (_: any) => <span>锁定</span> }];

    React.useEffect(() => {
        if (!props.loaded) {
            pagination(props.apps.page, props.apps.size);
        }
    }, [props.loaded])


    return <div>
        <PageHeader title="应用列表" />
        <br />
        <Table
            rowKey="id"
            loading={ props.loading  }
            columns={cols}
            dataSource={ props.apps.elements }
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
    loaded: states.loaded.has('apps'),
    loading: states.loading.some((s: string) => s === 'apps'),
});

// map dispatch to props
const d2p = (dispatch: any) => ({
    makeSpin: () => dispatch({type: 'LOAD_START', target: 'apps'}),
    getApps: (apps: any) => dispatch( { type: 'GET_APPS', apps })
})

export default connect(s2p, d2p)(Apps);
