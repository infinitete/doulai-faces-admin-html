import * as React from 'react';
import { Col, Form, Input, PageHeader, Row } from 'antd';
import { connect } from 'react-redux';

const AppCreator: React.FC<any> = (props: any) => {

    const { getFieldDecorator } = props.form

    return <div>
        <PageHeader title="添加应用" />
        <Row gutter={24}>
            <Col span={6} offset={9}>
                <div className='login-wrapper' style={{marginTop: 48}}>
                <Form>
                    <Form.Item label="应用名称">
                        {getFieldDecorator('app',{rules:[{required:true, message:'请填写应用名称'}]})(<Input placeholder='应用名称' />)}
                    </Form.Item>
                </Form>
                </div>
            </Col>
        </Row>
    </div>
};


export default connect()(Form.create()(AppCreator))
