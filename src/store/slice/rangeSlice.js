import {createSlice} from '@reduxjs/toolkit'
import cl from '../../styles/Range.module.css'
export const rangeSlice = createSlice({
    name: 'range',
    initialState: {
        list: [
            {
                min: 1000000,
                max: 6000000,
                id: 0,
                title: 'Стоимость автомобиля',
                defaultValue: 3300000,
                desc: () => '₽',
                classDesc: '',
                step:1000
            }, {
                min: 0.1,
                max: 0.6,
                id: 1,
                title: 'Первоначальный взнос',
                defaultValue: 420000,
                classDesc: cl.descTop,
                desc: (value, max) => Math.round( value * 100 / max ) + '%',
                step:1000
            }, {
                min:1,
                max:60,
                id: 2,
                title: 'Срок лизинга',
                defaultValue: 60,
                desc: () => 'мес.',
                classDesc: '' ,
                step:1
            },
        ],
        disabled: false,
    },
    reducers: {}
})


export default rangeSlice.reducer

