import * as React from 'react';
import { Button, Divider, Col, Form, Input, Row } from 'antd'

class LoginForm extends React.Component<any> {
    public render() {
        const { getFieldDecorator } = this.props.form;

        return <Row gutter={24}>
            <Col xs={{span: 20, offset: 2}} sm={{span:16, offset:4}} md={{span:12,offset:6}} lg={{span:8, offset:8}} xl={{span:4, offset:10}} className='login-wrapper'>
                <h2 style={{textAlign:'center'}}>登录</h2>
                <Divider />
                <Form>
                    <Form.Item label="用户名">
                        {
                            getFieldDecorator("username", {
                                rules: [{required: true, message: '请输入用户名'}]
                            })(<Input placeholder="用户名" />)
                        }
                    </Form.Item>

                    <Form.Item label="密码">
                        {
                            getFieldDecorator("password", {
                                rules: [{required: true, message: '请输入密码'}]
                            })(<Input type="password" placeholder="密码" />)
                        }
                    </Form.Item>
                    <Button block={true} type='primary' >登录</Button>
                </Form>
            </Col>
        </Row>
    }
}

export default Form.create()(LoginForm);
