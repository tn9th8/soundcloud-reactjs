import { useEffect, useState } from 'react';
// import '../../styles/table.css';
import { Button, notification, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import UserCreateModel from './user.create.model';
import UserUpdateModel from './user.update.model';
import './users.scss';

export type TUser = {
    name: string,
    phone: string,
    email: string,
    password: string,
    role: string
    age: number | undefined,
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

export type Metadata = {
    limit: number,
    page: number,
    items: number,
    pages: number
};

const UsersTable = () => {
    const accessToken = localStorage.getItem('accessToken') as string;

    const [userList, setUserList] = useState([]);
    const [meta, setMeta] = useState<Metadata>({ limit: 6, page: 1, items: 0, pages: 0 });
    const [reload, setReload] = useState({ limit: 6, page: 1 });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<TCurrentUser | undefined>(undefined);

    useEffect(() => {
        getList();
    }, [reload]);

    const getList = async () => {
        const res = await fetch(`http://localhost:8044/api/v1/admin/users/active?page=${meta.page}&limit=${meta.limit}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'GET',
        });
        const jsonRes = await res.json();
        setUserList(jsonRes.data);
        setMeta(jsonRes.metadata);
    };

    const disable = async (record: TCurrentUser) => {
        const res = await fetch(`http://localhost:8044/api/v1/admin/users/disable/${(record as any)._id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'PATCH',
        });
        const jsonRes = await res.json();

        if (jsonRes?.data) {
            notification.success({
                message: 'Disable successfully'
            });
            await getList();
        } else {
            notification.error({
                message: 'Sorry, an exception occurred',
                description: jsonRes.message,//JSON.stringify(jsonRes.message)
            });
        }
        return jsonRes;
    };

    const columns: ColumnsType<TCurrentUser> = [ //TableProps<TCurrentUser>['columns'] = [
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
                    }}>edit</Button>

                    <Popconfirm
                        placement="topRight"
                        title={`Are you sure to disable ${record.name} ?`}
                        description={'choose confirm button to disable'}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => disable(record)}
                    >
                        <Button type="primary" danger>disable</Button>
                    </Popconfirm>
                </Space >
            ),
        },
    ];

    const gotoPage = (page: number, pageSize: number) => {
        setMeta({ ...meta, page, limit: pageSize });
        setReload({ page, limit: pageSize });
    };

    return (
        <div>
            <div className='table-name'>
                <h2>User Table</h2>
                <Button type="primary"
                    onClick={() => setIsCreateModalOpen(true)}>add new</Button>
            </div>

            <Table<TCurrentUser>
                columns={columns}
                dataSource={userList}
                rowKey={'_id'}
                pagination={{
                    current: meta.page,
                    pageSize: meta.limit,
                    total: meta.items,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: gotoPage,
                    showSizeChanger: true,
                    pageSizeOptions: ['6', '14', '26'],
                }}
            />

            <UserCreateModel
                accessToken={accessToken}
                reloadList={getList}
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
            />

            <UserUpdateModel
                accessToken={accessToken}
                reloadList={getList}
                isModalOpen={isUpdateModalOpen}
                setIsModalOpen={setIsUpdateModalOpen}
                payload={currentRecord}
                setPayload={setCurrentRecord}
            />
        </div >
    );
};

export default UsersTable;