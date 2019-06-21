import * as React from 'react';
import { Button, Divider, Col, Form, Input, message, Row, Spin } from 'antd'
import { login } from '../../request/Request';

class LoginForm extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);

        this.state = {spin: false};

        this.doLogin = this.doLogin.bind(this);
    }

    public doLogin(e: any) {
        e.preventDefault();
        this.props.form.validateFields(async (error: any, values: any) => {
            if (error != null) {
                return;
            };

            this.setState({spin:true});
            const {username, password} = values;

            const res = await login('http://localhost:8080/api/v1/auth/login', username, password);
            const json = await res.json();

            this.setState({spin:false});

            if (json.code === 20000) {
                message.success("登录成功");
                window.sessionStorage.setItem('token', json.payload);
                window.location.href = '/#/app';
            } else {
                message.error('用户名或密码错误');
            }
        })
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        return <Row gutter={24}>
            <Col xs={{span: 20, offset: 2}} sm={{span:16, offset:4}} md={{span:12,offset:6}} lg={{span:8, offset:8}} xl={{span:4, offset:10}} className='login-wrapper'>
                <h2 style={{textAlign:'center'}}>登录</h2>
                <Divider />
                <Spin spinning={this.state.spin}>
                    <Form onSubmit={ this.doLogin }>
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
                        <Button block={true} htmlType="submit" type='primary' >登录</Button>
                    </Form>
                </Spin>
            </Col>
        </Row>
    }
}

export default Form.create()(LoginForm);
