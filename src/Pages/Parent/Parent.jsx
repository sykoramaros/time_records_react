import React, {useState} from 'react';
import Child from "../../Components/Child/Child";
import TimeSelect from "../../Components/TimeSelect/TimeSelect";

const Parent = () => {
    const [jeKliknuto, setJeKliknuto] = useState(false);
    const [jeNajeto, setJeNajeto] = useState(false);

    const handleJeKliknuto = () => {
        if (jeKliknuto) {
            setJeKliknuto(false)
            setJeNajeto(false)
        } else if (jeNajeto) {
            setJeNajeto(false)
        } else {
            setJeKliknuto(true)
            setJeNajeto(false)
        console.log(jeKliknuto)
        }

    }

    const handleJeNajeto = () => {
        if (jeKliknuto) {
            setJeKliknuto(false)
        } else if (jeNajeto) {
            setJeNajeto(false)
        } else {
            setJeNajeto(true)
            console.log(jeNajeto)
        }
    }

    return (
        <div>


    <Child
        kliknuti={handleJeKliknuto}
        najeti={handleJeNajeto}
    />
            { jeKliknuto && <h1>Kliknuto</h1> }
            { jeNajeto && <h1>Najeto</h1> }

            <TimeSelect />
        </div>
    );
    

};

export default Parent;