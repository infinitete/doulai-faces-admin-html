import * as React from 'react';
import { PageHeader, Table } from 'antd';

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
    title: '住址',
    key: 'person.address',
    dataIndex: 'person.address'
}, {
    title: '版本',
    key: 'version',
    dataIndex: 'version'
}];

const Faces: React.FC<any> = () => {
    return <div>
        <PageHeader title="已注册信息" />
        <br />
        <Table columns={columns} />
    </div>
}

export default Faces;
