import * as React from 'react';
import { Button, Col, Form, Input, message, PageHeader, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { chPass } from '../../redux/actions';

const AppCreator: React.FC<any> = (props: any) => {

    const { getFieldDecorator } = props.form
    const [ spin, setSpin ] = React.useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { form } = props;
        form.validateFields(async (error: any, values: any) => {
            if (error != null) {
                return;
            }

            setSpin(true);

            const res = await chPass(values.o, values.n);
            if (res.code !== 20000) {
                message.error("修改密码失败");
            } else {
                message.success("修改密码成功");
            }
            setSpin(false);
        });
    }

    const comparePass = (_: any, value: string, callback: any) => {
        const { form } = props;
        if (value && value !== form.getFieldValue('n')) {
            callback('密码与确认密码不一致');
        } else {
            callback();
        }
    };


    return <div>
        <PageHeader title="添加应用" />
        <Row gutter={24}>
            <Col span={6} offset={9}>
                <div className='login-wrapper' style={{marginTop: 48}}>
                    <Spin spinning={spin}>
    <Form  onSubmit={handleSubmit}>
                            <Form.Item label="原密码">
                                {getFieldDecorator('o',{rules:[{required:true, message:'请输入原密码'}]})(<Input placeholder='原密码' type="password" size="large" />)}
                            </Form.Item>
                            <Form.Item label="新密码">
                                {getFieldDecorator('n',{rules:[{required:true, message:'请输入新密码'}]})(<Input placeholder='新密码' type="password" size="large" />)}
                            </Form.Item>
                            <Form.Item label="确认密码">
                                {getFieldDecorator('cn',{rules:[{required:true, message:'请确认新密码'},{validator: comparePass}]})(<Input placeholder='确认新密码' type="password" size="large" />)}
                            </Form.Item>

                            <Button size="large" block={true} htmlType='submit' type="primary">修改密码</Button>
                        </Form>
                    </Spin>
                </div>
            </Col>
        </Row>
    </div>
};

const d2p = (dispatch: any) => ({
    appendApp: (app: any) => dispatch({type: 'APPEND_APP', app})
});

export default connect(null, d2p)(Form.create()(AppCreator))
