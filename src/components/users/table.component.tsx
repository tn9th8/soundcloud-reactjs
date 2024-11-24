import { useEffect, useState } from 'react';
// import '../../styles/table.css';
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import UserModel from './user.model';
import './users.scss';

type TUser = {
    _id: any,
    name: string,
    email: string,
    age: number,
    gender: string
};

const columns: TableProps<TUser>['columns'] = [
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
        render: () => (
            <Space size="middle">
                <a>Invite</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const TableComponent = () => {
    const [userList, setUserList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const showModal = () => {
        setIsModalOpen(true);
    };

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




    return (
        <div>
            <div className='table-name'>
                <h2>User Table</h2>
                <Button type="primary" size='large' onClick={showModal}>Add new</Button>
            </div>
            <Table<TUser> columns={columns} dataSource={userList} rowKey={'_id'} />
            <UserModel
                accessToken={accessToken}
                getData={getData}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div >
    );
};

export default TableComponent;