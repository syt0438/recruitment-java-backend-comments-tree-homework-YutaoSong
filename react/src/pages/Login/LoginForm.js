import React from 'react'
import { Form, Input, Checkbox } from 'antd'
import Promptbox from '@/components/PromptBox/index'
import { post } from '@/utils/ajax'
import { authenticateSuccess } from '@/utils/session'
import { withRouter } from 'react-router-dom'


@withRouter @Form.create()
class LoginForm extends React.Component {
    state = {
        focusItem: -1,   //当前焦点聚焦在哪一项上
    }
    componentDidMount() {
    }
    /**
     * 转换面板为注册面板
     */
    goRegister = () => {
        this.props.form.resetFields()
        this.props.toggleShow()
    }
    onSubmit = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.onLogin(values)
            }
        });
    }
    /**
     * 表单验证成功后的登录函数
     */
    onLogin = async (values) => {

        values.remembered = values.remembered === undefined ? false : values.remembered;

        const res = await post('/auth/login', {
            uid: values.username,
            pwd: values.password,
            remembered: values.remembered
        })

        if (res.code !== 0) {
            return
        }
        
        localStorage.setItem('uid', res.data.uid)
        localStorage.setItem('remembered', values.remembered)

        authenticateSuccess(res.data.token)

        this.props.history.push('/')
    }
    render() {
        const { getFieldDecorator, getFieldError } = this.props.form
        const { focusItem, code } = this.state
        return (
            <div>
                <h3 className="title">登录</h3>
                <Form hideRequiredMark>
                    <Form.Item
                        help={<Promptbox info={getFieldError('username') && getFieldError('username')[0]} />}
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 0 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
                        label={<span className='iconfont icon-User' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('username', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '请输入用户名' },
                                { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
                            ]
                        })(
                            <Input
                                className="myInput"
                                onFocus={() => this.setState({ focusItem: 0 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                placeholder="用户名"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        help={<Promptbox info={getFieldError('password') && getFieldError('password')[0]} />}
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 1 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
                        label={<span className='iconfont icon-suo1' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }]
                        })(
                            <Input
                                className="myInput"
                                type="password"
                                onFocus={() => this.setState({ focusItem: 1 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                placeholder="密码"
                            />
                        )}
                    </Form.Item>


                    <Form.Item
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 1 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
                        label={<span className='iconfont icon-yanzhengmatianchong' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('remembered', {
                            validateFirst: true,
                            rules: [
                            ]
                        })(
                            <Checkbox
                                name='remembered'
                                className='iconfont'
                            >
                                Remember Me
                            </Checkbox>
                        )}
                    </Form.Item>


                    <Form.Item>
                        <div className="btn-box">
                            <div className="loginBtn" onClick={this.onSubmit}>登录</div>
                            <div className="registerBtn" onClick={this.goRegister}>注册</div>
                        </div>
                    </Form.Item>
                </Form>

                <div className="footer"></div>
            </div>
        )
    }
}


export default LoginForm