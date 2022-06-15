import React from 'react'
import { Form, Input, message } from 'antd'
import Promptbox from '@/components/PromptBox/index'
import { put} from '@/utils/ajax'

@Form.create()
class RegisterForm extends React.Component {
    state = {
        focusItem: -1,   //当前焦点聚焦在哪一项上
        loading: false   //注册的loding
    }
    /**
     * 返回登录面板
     */
    backLogin = () => {
        this.props.form.resetFields()
        this.props.toggleShow()
    }
    onSubmit = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.onRegister(values)
            }
        });
    }
    /**
     * 注册函数
     */
    onRegister = async (values) => {
        console.log(values)

        //如果正在注册，则return，防止重复注册
        if (this.state.loading) {
            return
        }
        this.setState({
            loading: true
        })
        const hide = message.loading('注册中...', 0)
        //加密密码
        const res = await put('/auth/register', {
            uid: values.registerUsername,
            pwd: values.registerPassword,
            email: values.registerEmail,
        })
        this.setState({
            loading: false
        })
        hide()
        if (res.code === 0) {
            message.success('注册成功')
        }
    }

    render() {
        const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form
        const { focusItem } = this.state
        return (
            <div>
                <h3 className="title">注册</h3>
                <Form hideRequiredMark>
                    <Form.Item
                        help={<Promptbox info={getFieldError('registerUsername') && getFieldError('registerUsername')[0]} />}
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 0 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
                        label={<span className='iconfont icon-User' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('registerUsername', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '用户名不能为空' },
                                { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
                                { min: 3, message: '用户名至少为5位' },
                                { max: 20, message: '用户名至多为20位' }
                            ]
                        })(
                            <Input
                                maxLength={16}
                                className="myInput"
                                autoComplete="new-password"  //禁用表单自动填充(不管用？)
                                onFocus={() => this.setState({ focusItem: 0 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                // onChange={(e) => this.checkName(e.target.value)}
                                placeholder="用户名"
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        help={<Promptbox info={getFieldError('registerEmail') && getFieldError('registerEmail')[0]} />}
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 0 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
                        label={<span className='iconfont icon-fenlei' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('registerEmail', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '邮箱不能为空' },
                                { pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱' },
                                { min: 6, message: '邮箱至少为6位' }
                            ]
                        })(
                            <Input
                                maxLength={16}
                                className="myInput"
                                autoComplete="new-password"  //禁用表单自动填充(不管用？)
                                onFocus={() => this.setState({ focusItem: 0 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                // onChange={(e) => this.checkName(e.target.value)}
                                placeholder="邮箱"
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        help={<Promptbox info={getFieldError('registerPassword') && getFieldError('registerPassword')[0]} />}
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 1 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
                        label={<span className='iconfont icon-suo1' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('registerPassword', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '密码不能为空' },
                                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&_#]{8,20}/, message: '密码必须是8-20位，且有一个大写，一个小写和一个特殊字符组成' },
                                { min: 8, message: '密码至少为8位' },
                                { max: 20, message: '密码至多为20位' }
                            ]

                        })(
                            <Input
                                maxLength={16}
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
                        help={<Promptbox info={getFieldError('confirmPassword') && getFieldError('confirmPassword')[0]} />}
                        style={{ marginBottom: 35 }}
                        wrapperCol={{ span: 20, pull: focusItem === 2 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 2 ? 1 : 0 }}
                        label={<span className='iconfont icon-suo1' style={{ opacity: focusItem === 2 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                { required: true, message: '请确认密码' },
                                {
                                    validator: (rule, value, callback) => {
                                        if (value && value !== getFieldValue('registerPassword')) {
                                            callback('两次输入不一致！')
                                        }
                                        callback()
                                    }
                                },
                            ]

                        })(
                            <Input
                                className="myInput"
                                type="password"
                                onFocus={() => this.setState({ focusItem: 2 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                placeholder="确认密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="btn-box">
                            <div className="loginBtn" onClick={this.onSubmit}>注册</div>
                            <div className="registerBtn" onClick={this.backLogin}>返回登录</div>
                        </div>
                    </Form.Item>
                </Form>
                <div className="footer"></div>
            </div>
        )
    }
}

export default RegisterForm