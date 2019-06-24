import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Table } from 'antd';
import { getPictures } from '../../redux/actions/index';

const columns = [{
    title: '姓名',
    key: 'person.name',
    dataIndex: 'person.name',
}, {
    title: '性别',
    key: 'person.gender',
    dataIndex: 'person.gender'
}, {
    title: '身份号码',
    key: 'person.idNumber',
    dataIndex: 'person.idNumber'
}, {
    title: '区域码',
    key: 'longcode',
    dataIndex: 'longcode'
}, {
    title: '住址',
    key: 'person.address',
    dataIndex: 'person.address'
}, {
    title: '版本',
    key: 'version',
    dataIndex: 'version'
}];

const Faces: React.FC<any> = (props: any) => {

    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if (!props.loaded && !loaded) {
            // go fetch pictures
            pagination(props.faces.page, props.faces.size)
            setLoaded(true);
        }
    },[props]);

    function pagination(page: number | undefined = 1, size: number | undefined = 15) {
        props.makeSpin();
        getPictures(page, size).then(props.getFaces);
    }

    const cols = [...columns];

    return <div style={{backgroundColor: '#f6f6f6'}}>
        <PageHeader title="已注册病患" />
        <br />
        <Table
            bordered={true}
            rowKey="id"
            loading={ props.loading  }
            columns={cols}
            dataSource={ props.faces.elements }
            pagination={{
                current: props.faces.page,
                total: props.faces.total,
                pageSize: props.faces.size,
                onChange: pagination,
                showQuickJumper: true}}
        />
    </div>
}

const s2p = (state: any) => ({
    loaded: state.loaded.has('faces'),
    loading: state.loading.has('faces'),
    faces: state.faces
});

const d2p = (dispatch: any) => ({
    makeSpin: () => dispatch({type: 'LOAD_START', target: 'faces'}),
    getFaces: (faces: any) => dispatch({type: 'GET_FACES', faces})
});

export default connect(s2p, d2p)(Faces);
