import * as React from 'react';
import moment from 'moment';
import { Button, Col, DatePicker, Form, Input, message, PageHeader, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { createApp } from '../../redux/actions';

const AppCreator: React.FC<any> = (props: any) => {

    const { getFieldDecorator } = props.form
    const [ spin, setSpin ] = React.useState(false);


    const disabledDate = (current: moment.Moment | undefined) => {
        // Can not select days before today and today
        return current === undefined || current < moment().endOf('day');
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { form } = props;
        form.validateFields(async (error: any, values: any) => {
            if (error != null) {
                return;
            }

            setSpin(true);
            const res = await createApp(values.app, values.expiredAt.toDate().getTime().toString(), values.desc);
            setSpin(false);

            if (res.code === 40009) {
                form.resetFields(['app'])
                message.error('应用名已存在');
                return;
            }


            if (res === null || res.code !== 20000) {
                message.error('创建应用失败');
                return;
            }

            message.success('创建成功');
            form.resetFields();
            props.appendApp(res.payload);
        });
    }


    return <div>
        <PageHeader title="添加应用" />
        <Row gutter={24}>
            <Col span={6} offset={9}>
                <div className='login-wrapper' style={{marginTop: 48}}>
                    <Spin spinning={spin}>
    <Form  onSubmit={handleSubmit}>
                            <Form.Item label="应用名称">
                                {getFieldDecorator('app',{rules:[{required:true, message:'请填写应用名称'}]})(<Input placeholder='应用名称' size="large" />)}
                            </Form.Item>

                            <Form.Item label="过期日期">
                                {getFieldDecorator('expiredAt',{rules:[{required:true, message:'请选择应用过期日期'}]})(
                                    <DatePicker
                                        disabledDate={disabledDate}
                                        placeholder="请选择过期日期"
                                        style={{width: '100%'}}
                                        showToday={false}
                                        size="large" />)}
                            </Form.Item>
                            <Form.Item label="应用描述">
                                {getFieldDecorator('desc',{rules:[{required:true, message:'请填写应用描述'}]})(<Input placeholder='应用描述' size="large" />)}
                            </Form.Item>
                            <Button size="large" block={true} htmlType='submit' type="primary">保存</Button>
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
