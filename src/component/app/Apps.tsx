import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Icon, Input, PageHeader, Switch, Table, Tag } from 'antd';
import { getApps, toggleAppLock } from '../../redux/actions/index';

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
    title: '是否过期',
    render: (app: any) => app.expiredAt < (new Date()).getTime() ? <Tag color='orange'>已过期</Tag>:<Tag color='green'>未过期</Tag>,
    filters: [{text:'已过期', value:true}, {text:'未过期', value: false}] as any,
    onFilter: (value: boolean, record: any) => record.expired === value,
    filterMultiple: false
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

    // 用来标记上锁或解锁操作
    const [lock, setLock] = React.useState('');

    const cols = [...columns, {  title: '操作', render: (record: any) => <span>
        <Switch checked={ !record.locked }  checkedChildren="锁定" unCheckedChildren="解锁" loading={ lock === record.id } onChange={ () => toggleLock(record) } />
    </span> }];

    // 解锁或上锁
    const toggleLock = async (record: any) => {
        setLock(record.id);
        await toggleAppLock(record);
        const elements = props.apps.elements.map((a: any) => {
            if (a.id === record.id) {
                a.locked = !record.locked;
            }

            return a;
        });

        setLock('');
        const apps = {...props.apps, elements};
        props.getApps(apps);
    }

    // 初始化数据
    React.useEffect(() => {

        // 用一个全局状态来标识是否已初始化
        if (!props.loaded) {
            pagination(props.apps.page, props.apps.size);
        }
    }, [props.loaded])


    return <div style={{backgroundColor: '#f6f6f6'}}>
        <PageHeader title="应用列表" />
        <br />
        <Table
            bordered={true}
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
