import React, {useEffect, useRef, useState} from 'react';
import cl from '../styles/Range.module.css'
import MaskInput from "./UI/MaskInput";
import MiniTitle from "./UI/MiniTitle";

const Range = ({disabled, setValues, values, id}) => {

    let value = values.find(el => id === el.id)
    const input = useRef()
    const [dangerColor, setDangerColor] = useState('#575757')
    const [getMax, setMax] = useState(values[1].max * values[0].defaultValue  )
    const [getMin, setMin] = useState(values[1].min * values[0].defaultValue  )
    let [sliderTrack, setSliderTrack] = useState('red')
    useEffect(() => {
        setMax(values[1].max * values[0].defaultValue)
        setMin(values[1].min * values[0].defaultValue)

        let percent
        if (value.id !== 1) {
            percent = (value.defaultValue - value.min) * 100 / (value.max - value.min)
        } else {
            if (value.desc(value.defaultValue, values[0].defaultValue) > value.max)
                setValues(state => state.map(el => el.id === values.id ? {...el, defaultValue: values[0].max} : el))
            let hashMinValue = getMin
            percent = (value.defaultValue - hashMinValue) * 100 / (getMax - hashMinValue)
        }
        setSliderTrack(() => ` linear-gradient(to right, #FF9514 ${percent}% , #E1E1E1 ${percent}% )`)
        setDangerColor(() => value.defaultValue >= value.min && value.id !== 1 ?
            '#575757' : value.id !== 1 ? 'red' : value.defaultValue >= getMin? '#575757' : 'red')
    }, [values])
    return (
        <div className={cl.range}>
            <MiniTitle text={value.title} />
            <div className={cl.rangeWrapInput}>
                <div
                    className={cl.desc + ' ' + value.classDesc}>{value.desc(value.defaultValue, values[0].defaultValue)}</div>

                <MaskInput disabled={disabled} setDangerColor={setDangerColor}
                           dangerColor={dangerColor} getMax={getMax} getMin={getMin}
                           setValues={setValues} value={value} id={id} values={values}
                />
                <div className={cl.offsetInput}>
                    <input min={value.id === 1 ? getMin : value.min}
                           max={value.id === 1 ? getMax : value.max}
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
                                        defaultValue: el.defaultValue >= getMax ? getMax :
                                            el.defaultValue <= getMin ? getMin :
                                                el.defaultValue

                                    }) : el)
                            )
                        }
                    }} className={cl.rangeInput}/>
                </div>
            </div>
        </div>
    );
};

export default Range;
