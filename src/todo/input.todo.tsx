import { useState } from "react";

type TProps = {
    name: string,
    password: number,
    meta: {
        gender: string,
        address: string
    },
    handlePush: (item: string) => void;
}

const InputTodo = (props: TProps) => {
    const [item, setItem] = useState('');

    const handlePush = (item: string) => {
        props.handlePush(item);
        setItem('');
    }

    return (
        <div>
            <h2>I'm {props.name}, {props.meta.gender} years old, now is living at {props.meta.address}</h2>

            <label >Add a todo item:</label>&nbsp; &nbsp;
            <input
                type="text"
                value={item}
                onChange={(event) => {
                    setItem(event.target.value);
                }}
            /><br /><br />
            <button onClick={() => handlePush(item)}>Submit</button>

        </div>
    )
};

export default InputTodo;