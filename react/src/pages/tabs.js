import React from 'react'
import LoadableComponent from '../utils/LoadableComponent'
const MessageBoard = LoadableComponent(import('./MessageBoard/index'), true);


const menu = [
    {
        name: '留言板',
        icon: 'message',
        key: 'MessageBoard'
    }
]

const tabs = {
    MessageBoard: <MessageBoard />,
}

export {
    menu,
    tabs
}