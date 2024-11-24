import { Input, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import './users.scss';
import { TCurrentUser } from './users.table';

type TProps = {
    accessToken: any;
    reloadList: any;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    payload: TCurrentUser | undefined;
    setPayload: (value: TCurrentUser | undefined) => void
}

const UserUpdateModel = (props: TProps) => {
    const { accessToken, reloadList, isModalOpen, setIsModalOpen, payload, setPayload } = props;

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [roles, setRoles] = useState<string[]>([]);
    const [age, setAge] = useState<number | undefined>(undefined);
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (payload != null) {
            setId((payload as any)._id)
            setName(payload.name);
            setPhone(payload.phone);
            setRoles(payload.roles);
            setAge(payload.age);
            setGender(payload.gender);
            setAvatar(payload.avatar);
        };
    }, [payload]);

    //modal
    const update = async (data: TCurrentUser) => {
        const res = await fetch('http://localhost:8044/api/v1/admin/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'PATCH',
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
        const data = { id, name, phone, roles: ['672702a9a7b11823367b7206'], age, gender, avatar };
        await update(data);
        handleCancel();
    };

    const handleCancel = () => {
        setPayload(undefined);
        setIsModalOpen(false);
        setId('');
        setName('');
        setPhone('');
        setRoles([]);
        setAge(undefined);
        setGender('');
        setAvatar('');
    };

    return (
        <Modal
            title="Edit a current user"
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
                    <label>Phone:</label>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event?.target.value)} />
                </div>
                <div>
                    <label>Roles:</label>
                    <Input
                        value={roles ? 'NORMAL_CLIENT' : 'NO_ROLE'}
                        onChange={(event) => setRoles(event?.target.value as any)} />
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
export default UserUpdateModel;