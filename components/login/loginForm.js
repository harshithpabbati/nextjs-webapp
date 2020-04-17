import React, {useEffect, useState} from 'react';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import dataFetch from '../../utils/dataFetch';
import { TokenAuth as query } from '../../utils/mutations';
import cmsLogo from "../../static/images/cms_logo.png";

const cookies = new Cookies();

const LoginForm = props => {
    const router = useRouter();
    const [cookiesSet, setCookies] = useState(false);
    const [authFail, setAuthFail] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const token = cookies.get('token');
      if (token != null) {
          setCookies(true);
      }
    });

    const login = async (variables) => await dataFetch({ query, variables });

    const onFinish = values => {
        login(values).then(response => {
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                cookies.set('token', response.data.tokenAuth.token, { path: '/' });
                cookies.set('refreshToken', response.data.tokenAuth.refreshToken, { path: '/' });
                cookies.set('username', values.username, { path: '/' });
                setCookies(true);
                router.push('/');
            } else {
                setAuthFail(true);
                setLoading(false);
            }
        });
    };

    const errorMessage = (<div className="alert alert-danger">Please enter vaild credentials</div>);

    const onFinishFailed = errorInfo => {
        console.error(errorInfo);
    };

    return !loading ? (
        <Card className="login-card">
            <img src={cmsLogo} className="w-100 my-4"  alt='CMS Logo'/>
            {authFail ? errorMessage : null}
            <Form
                className="login-form"
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="remember" valuePropName="checked"
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-block login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    ) : <h1>Loading</h1>;
};

export default LoginForm;
