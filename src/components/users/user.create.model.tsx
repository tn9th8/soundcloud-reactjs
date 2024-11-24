import { useState } from 'react';
// import '../../styles/table.css';
import { Input, Modal, notification } from 'antd';
import './users.scss';
import { TUser } from './users.table';

type TProps = {
    accessToken: string;
    reloadList: () => void;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const UserCreateModel = (props: TProps) => {
    const { accessToken, reloadList, isModalOpen, setIsModalOpen } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [age, setAge] = useState<number | undefined>(undefined);
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');

    //modal
    const create = async (data: TUser) => {
        const res = await fetch('http://localhost:8044/api/v1/admin/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        const jsonRes = await res.json();

        if (jsonRes?.data) {
            notification.success({
                message: 'Created successfully'
            });
            await reloadList();
            setIsModalOpen(false);
        } else {
            notification.error({
                message: 'Sorry, an exception occurred',
                description: jsonRes.message.join('\n')
            });
        }
        return jsonRes;
    }

    const handleOk = async () => {
        const data = { name, email, phone, password, role: '672702a9a7b11823367b7206', age, gender, avatar };
        await create(data);
        handleCancel();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setRole('');
        setAge(undefined);
        setGender('');
        setAvatar('');
    };

    return (
        <Modal
            title="Add an new user"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel} maskClosable={false}>
            <div>
                <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(event) => setName(event?.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event?.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event?.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event?.target.value)} />
                </div>
                <div>
                    <label>Role:</label>
                    <Input
                        value={role ? 'NORMAL_CLIENT' : 'NO_ROLE'}
                        onChange={(event) => setRole(event?.target.value)} />
                </div>
                <div>
                    <label>Age:</label>
                    <Input
                        value={age}
                        onChange={(event) => setAge(+event?.target.value)} />
                </div>
                <div>
                    <label>Gender:</label>
                    <Input
                        value={gender}
                        onChange={(event) => setGender(event?.target.value)} />
                </div>
                <div>
                    <label>Avatar:</label>
                    <Input
                        value={avatar}
                        onChange={(event) => setAvatar(event?.target.value)} />
                </div>
            </div>
        </Modal>
    );
};
export default UserCreateModel;