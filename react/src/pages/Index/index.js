import React from 'react'
import { Layout } from 'antd'
import MySider from './MySider'
import {addPane} from './MySider'
import MyHeader from './MyHeader'
import MyContent from './MyContent'
import { getUser } from '@/store/actions'
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tabs, menu } from '../tabs'

const { Header, Sider, Content } = Layout;

const store = connect(
    (state) => ({ user: state.user }),
    (dispatch) => bindActionCreators({ getUser }, dispatch)
)

@store
class Index extends React.Component {
    //因为这些状态在不同组件中使用了，所以这里使用了状态提升（这里也可以用状态管理,为了学习这里就使用状态提升）
    state = {
        collapsed: false,  //侧边栏的折叠和展开
        panes: [],    //网站打开的标签页列表
        activeMenu: '',  //网站活动的菜单
        theme: localStorage.getItem('theme') || 'light',   //侧边栏主题
    };
    componentDidMount() {
        this.init()
    }
    componentWillUnmount() {
    }
    /**
     * 初始化用户信息和建立websocket连接
     */
    init = async () => {
        const uid = localStorage.getItem('uid')

        if (uid !== null) {
            await this.props.getUser({ uid })
        }
    }
    _setState = (obj) => {
        this.setState(obj)
    }
    render() {
        const { collapsed, panes, activeMenu, theme } = this.state
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed} theme={theme}>
                    <MySider
                        theme={theme}
                        panes={panes}
                        activeMenu={activeMenu}
                        onChangeState={this._setState} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <MyHeader
                            theme={theme}
                            collapsed={collapsed}
                            onChangeState={this._setState} />
                    </Header>
                    <Content>
                        <MyContent
                            panes={panes}
                            activeMenu={activeMenu}
                            onChangeState={this._setState} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index