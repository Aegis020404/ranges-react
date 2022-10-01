import React, {useEffect} from 'react';
import cl from "../../styles/Range.module.css";
import {useState} from 'react';

const MaskInput = ({disabled, dangerColor, setValues, value, getMax, getMin, id, values, setDangerColor}) => {
    const [mask, setMask] = useState('')
    useEffect(() => {
        setMask(() => {
            let val = values.find(el => el.id === id).defaultValue
            if(!val) return ''
            return new Intl.NumberFormat('ru-RU').format(val)
        })

    }, [values])
    return (
        <input
            disabled={disabled}
            style={{color: dangerColor}}
            className={cl.value}
            value={mask}
            onChange={(e) => {
                let convert =e.target.value ? +e.target.value.match(/\d+/g).join`` : 0
                setMask(() =>  new Intl.NumberFormat('ru-RU').format(convert))
                setValues(state =>
                    state.map(el => el.id === id ? ({
                        ...el,
                        defaultValue: value.id !== 1 ? convert >= el.max ? ~~el.max :
                            convert : convert >= getMax ? ~~getMax : convert
                    }) : el)
                )

                setDangerColor(() => convert >= value.min && value.id !== 1 ?
                    '#575757' : value.id !== 1 ? 'red' : e.target.value >= getMin ? '#575757' : 'red')


            }}/>
    );
};

export default MaskInput;
