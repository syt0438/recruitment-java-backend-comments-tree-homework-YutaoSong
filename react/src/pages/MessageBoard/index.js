import React, { Component } from 'react';
import { Comment, Divider, Button, Card, message, Tooltip, Input, notification, Spin } from 'antd'
import { get, put } from '../../utils/ajax'
import moment from 'moment'
import { connect } from 'react-redux'
import './style.less'

const TextArea = Input.TextArea

function createMarkup(html) {
    return { __html: html };
}

const store = connect(
    (state) => ({ user: state.user })
)

@store
class MessageBoard extends Component {
    state = {
        messages: [],   //留言列表
        isShowEditor: false,
        parentId: '',//回复第几条的父级id
        replyContent: '',  //回复内容
        replyUser: null, //回复的对象
        expandIds: [],  //展开的id列表
        placeholder: '',  //回复的placeholder
        loading: false,
    }
    componentDidMount() {
        this.getMessages()
    }
    componentDidUpdate(prevProps) {
        //修改用户信息时，重新加载
        if (this.props.user !== prevProps.user) {
            const { current, pageSize } = this.state.pagination
            this.getMessages(current, pageSize)
        }
    }
    /**
     * 留言输入框的onChange
     */
    handleMessageChange = (e) => {
        this.setState({
            publishMessage: e.target.value
        })

        let len = e.target.value.length
        let notifyLen = 200 - len;
        notifyLen = notifyLen >= 0 ? notifyLen : 0

        notification.open({
            key: "publishMsg",
            message: "您当前还可以输入" + notifyLen + "个字"
        })
    }
    /**
     * 回复输入框的onChange
     */
    handleReplyChange = (e) => {
        this.setState({
            replyContent: e.target.value
        })

        let len = e.target.value.length
        let notifyLen = 200 - len;
        notifyLen = notifyLen >= 0 ? notifyLen : 0

        notification.open({
            key: "replyMsg",
            message: "您当前还可以输入" + notifyLen + "个字"
        })
    }
    /**
     * 清空留言框
     */
    clearContent = () => {
        this.setState({
            publishMessage: ''
        })
    }
    /**
     * 关闭留言框
     */
    closeMessage = () => {
        this.setState({
            isShowEditor: false
        })
        this.clearContent()
    }
    /**
     * 获取留言列表
     */
    getMessages = async () => {
        this.setState({
            loading: true
        })
        const res = await get('/message/list', null)

        if (res.code !== 0) {
            this.setState({
                loading: false,
            })

            return
        }

        this.setState({
            messages: res.data || [],
            loading: false
        })
    }
    /**
     * 留言
     */
    sendMessage = async () => {
        const publishMessage = this.state.publishMessage

        if (!publishMessage) {
            message.warning('请先输入内容')

            return
        }

        const res = await put('/message', {
            msg: publishMessage
        })

        if (res.code === 0) {
            message.success('留言成功')

            this.clearContent()
            this.getMessages()
        } 
    }
    /**
     * 展开回复的textarea
     * @param {object} item 当前回复的对象
     * @param {number} pid  回复的父级id
     */
    showReply = (item, pid) => {
        this.setState({
            parentId: pid,
            replyContent: '',
            replyUser: item,
            placeholder: `${this.props.user.uid} @ ${item.uid}`
        })
    }
    /**
     * 关闭回复的texttarea
     */
    closeReply = () => {
        this.setState({
            parentId: '',
            replyContent: '',
            replyUser: '',
            placeholder: ''
        })
    }
    closeReplyNotification = () => {
        notification.close('replyMsg')
    }
    closePublishNotification = () => {
        notification.close('publishMsg')
    }
    /**
     * 确认回复
     */
    confirmReply = async (item) => {
        const replyContent = this.state.replyContent
        if (!replyContent) {
            message.warning('请输入回复内容')

            return
        }

        const param = {
            msg: replyContent,
            messageId: item.messageId || item.id,
            parentId: this.state.replyUser.id
        }

        const res = await put('/comment', param)

        if (res.code === 0) {
            message.success('回复成功')

            this.closeReply()
            this.getMessages()

            if (!this.state.expandIds.includes(item.id)) {
                this.setState({
                    expandIds: [...this.state.expandIds, item.id]
                })
            }
        }
    }

    renderTree = list => list.map(item => {
        const { parentId, replyContent, placeholder } = this.state

        //遍历树状数组，如果发现他有children则先套上<TreeNode>,再对他children中的元素做相同的操纵，直到children为空的元素停止，说明他们已经是最深的那一层了。	
        if (item.children) {
            return (
                <Comment key={item.id}
                    author={<span style={{ fontSize: 15 }}>{item.uid} @ {item.parentUid}</span>}
                    avatar={<img className='avatar-img-small' src='http://localhost:8080/images/default.png' alt='avatar' />}
                    content={<div className='info-box' dangerouslySetInnerHTML={createMarkup(item.msg)} />}
                    actions={this.renderActions(item, item.id)}
                >

                    {this.renderTree(item.children)}

                    {
                        parentId === item.id && (
                            <div style={{ width: '70%', textAlign: 'right' }}>
                                <TextArea
                                    rows={4}
                                    style={{ marginBottom: 10 }}
                                    value={replyContent}
                                    onChange={this.handleReplyChange}
                                    placeholder={placeholder}
                                    maxLength={200}
                                    onBlur={this.closeReplyNotification}
                                />
                                <Button size='small' onClick={this.closeReply}>取消</Button>&emsp;
                                <Button size='small' type='primary' onClick={() => this.confirmReply(item)}>回复</Button>
                            </div>
                        )
                    }

                </Comment>
            )
        }
    })

    renderActions = (item, pid) => {
        let actions = [
            <span>
                <Tooltip title="回复时间">
                    {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </Tooltip>
            </span>,
            <span style={styles.actionItem}>
                <Tooltip title="回复">
                    <span onClick={() => this.showReply(item, pid)}>
                        <span className='iconfont icon-commentoutline my-iconfont' />&nbsp;回复
                    </span>
                </Tooltip>
            </span>
        ]

        return actions
    }
    render() {
        const { isShowEditor, messages, parentId, replyContent, publishMessage, placeholder, loading } = this.state

        return (
            <div style={{ padding: 24 }}>
                <Card bordered={false} bodyStyle={{ paddingTop: 0 }}>
                    <div>
                        {
                            isShowEditor ? (
                                <div style={{ marginTop: 10 }}>
                                    <TextArea
                                        rows={4}
                                        style={{ marginBottom: 10 }}
                                        value={publishMessage}
                                        onChange={this.handleMessageChange}
                                        placeholder=''
                                        maxLength={200}
                                        onBlur={this.closePublishNotification}
                                    />
                                    <Button type='primary' onClick={this.sendMessage}>发表</Button>&emsp;
                                    <Button onClick={this.closeMessage}>取消</Button>
                                </div>
                            ) : <Button onClick={() => this.setState({ isShowEditor: true })}>我要留言</Button>
                        }
                    </div>
                    <Divider />
                    <Spin spinning={loading} style={{ position: 'fixed', top: '50%', left: '50%' }} />
                    <div className='message-list-box'>
                        {
                            Array.isArray(messages) && messages.map((item, index) => (
                                <Comment
                                    key={item.id}
                                    author={<span style={{ fontSize: 16 }}>{item.uid}</span>}
                                    avatar={<img className='avatar-img' src='http://localhost:8080/images/default.png' alt='avatar' />}
                                    content={<div className='info-box braft-output-content' dangerouslySetInnerHTML={createMarkup(item.msg)} />}
                                    actions={this.renderActions(item, item.id)}
                                    datetime={`第${messages.length - index}楼`}
                                >
                                    {this.renderTree(item.children)}

                                    {
                                        parentId === item.id && (
                                            <div style={{ width: '70%', textAlign: 'right' }}>
                                                <TextArea
                                                    rows={4}
                                                    style={{ marginBottom: 10 }}
                                                    value={replyContent}
                                                    onChange={this.handleReplyChange}
                                                    placeholder={placeholder}
                                                    maxLength={200}
                                                    onBlur={this.closeReplyNotification}
                                                />
                                                <Button size='small' onClick={this.closeReply}>取消</Button>&emsp;
                                                <Button size='small' type='primary' onClick={() => this.confirmReply(item)}>回复</Button>
                                            </div>
                                        )}
                                </Comment>
                            ))
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

const styles = {
    actionItem: {
        fontSize: 14
    }
}

export default MessageBoard;