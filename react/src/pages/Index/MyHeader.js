import React from 'react'
import screenfull from 'screenfull'
import { Icon, message, Menu, Avatar } from 'antd'
import ColorPicker from '@/components/ColorPicker/index'
import { logout, isAuthenticated } from '@/utils/session'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import LoadableComponent from '@/utils/LoadableComponent'

import MyIcon from '../../components/MyIcon'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// const EditInfoModal = LoadableComponent(import('./EditInfoModal'))
// const EditPasswordModal = LoadableComponent(import('./EditPasswordModal'))

const store = connect(
    (state) => ({ user: state.user })
)

@withRouter @store
class MyHeader extends React.Component {
    constructor(props) {
        super(props);
        const userTheme = JSON.parse(localStorage.getItem('user-theme'))
        let color = '#13C2C2'
        if (userTheme) {
            window.less.modifyVars(userTheme)
            color = userTheme['@primary-color']
        }
        this.state = {
            isFullscreen: false,    //控制页面全屏
            color: color
            // infoVisible: false,     //控制修改用户信息的模态框
            // passwordVisible: false   //控制修改密码的模态框
        }
    }
    /**
     * 切换侧边栏的折叠和展开
     */
    toggleCollapsed = () => {
        this.props.onChangeState({
            collapsed: !this.props.collapsed
        })
    }
    /**
     * 切换全屏
     */
    toggleFullscreen = () => {
        if (screenfull.enabled) {
            screenfull.toggle().then(() => {
                this.setState({
                    isFullscreen: screenfull.isFullscreen
                })
            });
        }
    }
    /**
     * 切换主题
     */
    changeColor = (color) => {
        window.less.modifyVars({
            '@primary-color': color,
        }).then(() => {
            localStorage.setItem('user-theme', JSON.stringify({ '@primary-color': color }))
            this.setState({
                color
            })
            message.success('更换主题颜色成功')
        })
    }
    /**
     * 重置主题
     */
    resetColor = () => {
        this.changeColor('#13C2C2')
    }
    /**
     * 退出登录
     */
    onLogout = () => {
        logout()   //清空cookie
        this.props.history.push('/login')
    }
    onLogin = () => {
        this.props.history.push('/login')
    }
    changeTheme = () => {
        const theme = this.props.theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', theme)
        this.props.onChangeState({
            theme
        })
    }

    render() {
        const { isFullscreen, color } = this.state
        const { user, theme } = this.props

        let menuItemGroup;

        let token = isAuthenticated();
        let noToken = token === null || token === undefined || token === '';

        if (noToken) {
            menuItemGroup = <MenuItemGroup title="游客中心">
                                <Menu.Item key={2} onClick={this.onLogin}><Icon type="logout" />登录</Menu.Item>
                            </MenuItemGroup>
        } else {
            menuItemGroup =
                <MenuItemGroup title="用户中心">
                    <Menu.Item key={2} onClick={this.onLogout}><Icon type="logout" />退出登录</Menu.Item>
                </MenuItemGroup>
        }

        return (
            <div style={{ background: '#fff', padding: '0 16px' }}>
                <Icon
                    style={{ fontSize: 18 }}
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggleCollapsed}
                />
                <div style={styles.headerRight}>
                    <div style={styles.headerItem}>
                        <ColorPicker color={color} onChange={this.changeColor} />
                    </div>
                    <div style={styles.headerItem}>
                        <MyIcon type={theme === 'dark' ? 'icon-yueliang1' : 'icon-taiyang'} style={{ fontSize: 24 }} onClick={this.changeTheme} />
                    </div>
                    <div style={styles.headerItem}>
                        <Menu mode="horizontal" selectable={false}>
                            <SubMenu title=
                                {   <div style={styles.avatarBox}>
                                        <Avatar size='square' src='http://localhost:8080/images/default.png' />
                                        &nbsp;<span>{!noToken ? user.uid + ' & ' : '游客'} {!noToken && user.email}</span></div>}>

                                {menuItemGroup}
                                <MenuItemGroup title="设置中心">
                                    <Menu.Item key={3} onClick={this.toggleFullscreen}><Icon type={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} />切换全屏</Menu.Item>
                                    <Menu.Item key={4} onClick={this.resetColor}><Icon type="ant-design" />恢复默认主题</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    headerRight: {
        float: 'right',
        display: 'flex',
        height: 64,
        marginRight: 50
    },
    headerItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
    },
    avatarBox: {
        display: 'flex',
        alignItems: 'center',
    }
}

export default MyHeader