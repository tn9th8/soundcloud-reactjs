import { HomeOutlined, PlayCircleOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link to={'/'}>Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={'/users'}>Users</Link>,
        key: 'users',
        icon: <TeamOutlined />,
    },
    {
        label: 'Tracks',
        key: 'tracks',
        icon: <PlayCircleOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    { label: 'Option 1', key: 'setting:1' },
                    { label: 'Option 2', key: 'setting:2' },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    { label: 'Option 3', key: 'setting:3' },
                    { label: 'Option 4', key: 'setting:4' },
                ],
            },
        ],
    },
    {
        key: 'alipay',
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Link
            </a>
        ),
    },
];

const LayoutAdminComponent = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Outlet />
        </div>
    );
};

export default LayoutAdminComponent;
