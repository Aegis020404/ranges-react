import React, {useEffect, useRef, useState} from 'react';
import cl from '../styles/Range.module.css'
import InputMask from "react-input-mask";
import {IMaskInput} from "react-imask";

const Range = ({disabled, setValues, values, id}) => {
    let value = values.find(el => id === el.id)
    const input = useRef()
    const [dangerColor, setDangerColor] = useState('#575757')
    const getMax = (value) => value.max * values[0].defaultValue
    const getMin = (value) => value.min * values[0].defaultValue
    let [sliderTrack, setSliderTrack] = useState('red')
    const convertVal = (val) => val.defaultValue.match(/\d+/g).join` `
    useEffect(() => {
        let percent
        if (value.id !== 1) {
            percent = (value.defaultValue - value.min) * 100 / (value.max - value.min)
        } else {
            if (value.desc(value.defaultValue, values[0].defaultValue) > value.max)
                setValues(state => state.map(el => el.id === values.id ? {...el, defaultValue: values[0].max} : el))
            let hashMinValue = getMin(value)
            percent = (value.defaultValue - hashMinValue) * 100 / (getMax(value) - hashMinValue)
        }
        setSliderTrack(() => ` linear-gradient(to right, #FF9514 ${percent}% , #E1E1E1 ${percent}% )`)
        setDangerColor(() => value.defaultValue >= value.min && value.id !== 1 ?
            '#575757' : value.id !== 1 ? 'red' : value.defaultValue >= getMin(value) ? '#575757' : 'red')
    }, [values])
    return (
        <div className={cl.range}>
            <div className={cl.title}>{value.title}</div>
            <div className={cl.rangeWrapInput}>
                <div
                    className={cl.desc + ' ' + value.classDesc}>{value.desc(value.defaultValue, values[0].defaultValue)}</div>
                <input disabled={disabled}
                       style={{color: dangerColor}}
                       min={1}
                       max={40}
                       className={cl.value}
                       // value={value.defaultValue}
                        value={new Intl.NumberFormat('ru-RU').format(value.defaultValue)}
                       onChange={(e) => {
                    setDangerColor(() => e.target.value >= value.min && value.id !== 1 ?
                        '#575757' : value.id !== 1 ? 'red' : e.target.value >= getMin(value) ? '#575757' : 'red')
                    setValues(state =>
                        state.map(el => el.id === id ? ({
                            ...el,
                            defaultValue: value.id !== 1 ? +e.target.value >= el.max ? ~~el.max :
                                    e.target.value.match(/\d+/) :
                                +e.target.value >= getMax(value) ? ~~getMax(value) : e.target.value.match(/\d+/)
                        }) : el)
                    )
                }}/>
                <div className={cl.offsetInput}>
                    <input min={value.id === 1 ? getMin(value) : value.min}
                           max={value.id === 1 ? getMax(value) : value.max}
                           style={{background: sliderTrack}}
                           ref={input}
                           step={value.step}
                           disabled={disabled} value={value.defaultValue} type="range" onChange={(e) => {
                        if (value.id !== 0) {
                            setValues(state =>
                                state.map(el => el.id === id ? ({...el, defaultValue: ~~e.target.value}) : el)
                            )
                        } else {
                            setValues(state =>
                                state.map(el => el.id === id ? ({...el, defaultValue: ~~e.target.value}) : el)
                                    .map(el => el.id === 1 ? ({
                                        ...el,
                                        defaultValue: el.defaultValue >= getMax(el) ? getMax(el) :
                                            el.defaultValue <= getMin(el) ? getMin(el) :
                                                el.defaultValue

                                    }) : el)
                            )
                        }
                    }} className={cl.rangeInput}/>
                </div>
            </div>
            {/*<InputMask className={cl.value} mask={[/\d/]} ></InputMask>*/}
            {/*    <input*/}
            {/*        value={new Intl.NumberFormat('ru-RU').format(value.defaultValue)}*/}
            {/*        className={cl.value}*/}
            {/*        */}
            {/*    />*/}
        </div>
    );
};

export default Range;
