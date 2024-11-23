const SecondComponent = () => {
    /**
     * variable
     * group 1:
     * - number,
     * - string
     * group 2:
     * - object,
     * - array,
     * - boolean, => render nothing
     * - nullish (null, undefine) => render nothing
     */
    const name = "Phạm Bách Chiến";
    const age = 20

    const arr = [1, 2, 3, 4];
    const obj = { first: 1, second: 2 };
    //tsx: html + js => 1 block
    return (
        <div>
            {/* style={ viết về 1 js trong html {viết về 1 biến obj} } */}
            <h1 style={{
                color: 'green',
                border: '4px solid orange',
                borderRadius: '6px'
            }}>Hi, {name}, {age} tuổi</h1>

            <h2>{JSON.stringify(arr)}</h2>
            <h2>{JSON.stringify(obj)}</h2>

            <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="cho Bach Chien sorry nha"
                className="photo"
            />

            <ul>
                <li>Invent new trac lights </li>
                <li>Rehearse a movie scene </li>
                <li>Improve the spectrum technology </li>
            </ul>
        </div>
    )
}

export default SecondComponent