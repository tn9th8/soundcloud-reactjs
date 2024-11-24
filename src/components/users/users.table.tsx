import { useEffect, useState } from 'react';
// import '../../styles/table.css';
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import UserCreateModel from './user.create.model';
import './users.scss';
import UserUpdateModel from './user.update.model';

export type TUser = {
    name: string,
    phone: string,
    email: string,
    password: string,
    role: string
    age: number,
    gender: string,
    avatar: string,
};

export type TCurrentUser = {
    id: any,
    name: string,
    phone: string,
    roles: string[],
    age: number | undefined,
    gender: string,
    avatar: string,
};

const UsersTable = () => {
    const [userList, setUserList] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<TCurrentUser | undefined>(undefined);

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyNzA2MTk4M2QxNmY0YzI0ZTZhZjc3IiwibmFtZSI6IkknbSBhIHN1cGVyIGFkbWluIiwiZW1haWwiOiJzdXBlckBtZW5zaG9wLmNvbSIsInBob25lIjoiMDAwMDk4OTg5OCIsInJvbGVzIjpbIjY3MjcwMWFhMmY4ZDgwYWEzMmRiYmIyOCIsIjY3MjcwMDI4ODgyNDg5OTIxMzkyYjk3NCJdfSwiaWF0IjoxNzMwNjk1Mzg3LCJleHAiOjEwMzcwNjk1Mzg3fQ.G6TloCCNJdlszPCKVGFEaGeZY2_nmxyiZjQocxr4F4Q';
    useEffect(() => {
        getData();
    }, []);

    // const login = async () => {
    //     const res = await fetch('http://localhost:8044/api/v1/admin/auth/signin', {
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         method: 'POST',
    //         body: JSON.stringify({
    //             username: 'super@menshop.com',
    //             password: '123456'
    //         })
    //     });
    //     const jsonRes = await res.json();
    //     return jsonRes;
    // };

    const getData = async () => {
        const res = await fetch('http://localhost:8044/api/v1/admin/users/active', {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'GET',
        });
        const jsonRes = await res.json();
        setUserList(jsonRes.data);
    };

    const columns: TableProps<TCurrentUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        setCurrentRecord(record);
                        setIsUpdateModalOpen(true);
                    }}>Edit</Button>
                    <Button type="primary" danger>Delete</Button>
                </Space >
            ),
        },
    ];

    return (
        <div>
            <div className='table-name'>
                <h2>User Table</h2>
                <Button type="primary" size='large'
                    onClick={() => setIsCreateModalOpen(true)}>Add new</Button>
            </div>

            <Table<TCurrentUser> columns={columns} dataSource={userList} rowKey={'_id'} />

            <UserCreateModel
                accessToken={accessToken}
                reloadList={getData}
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
            />

            <UserUpdateModel
                accessToken={accessToken}
                reloadList={getData}
                isModalOpen={isUpdateModalOpen}
                setIsModalOpen={setIsUpdateModalOpen}
                payload={currentRecord}
                setPayload={setCurrentRecord}
            />
        </div >
    );
};

export default UsersTable;