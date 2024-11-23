import { useEffect, useState } from 'react';
import '../../styles/table.css'

type TUser = {
    _id: any,
    name: string,
    email: string,
    age: number,
    gender: string
};

const TableComponent = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getData();

    }, []);

    const login = async () => {
        const res = await fetch('http://localhost:8044/api/v1/admin/auth/signin', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                username: 'super@menshop.com',
                password: '123456'
            })
        });
        const jsonRes = await res.json();
        return jsonRes;
    };

    const getData = async () => {
        const loginRes = await login();

        const res = await fetch('http://localhost:8044/api/v1/admin/users/active', {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${loginRes.data.accessToken}`,
            },
            method: 'GET',
        });
        const jsonRes = await res.json();
        setUserList(jsonRes.data);
    };

    return (
        <div>
            <h2>User Table</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(userList) && userList.map((user: TUser, index) => {
                        return (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    );
};

export default TableComponent;