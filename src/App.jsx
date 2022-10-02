import cl from './styles/App.module.css'
import Range from "./components/Range";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import MiniTitle from "./components/UI/MiniTitle";

function App() {
    const {disabled, list} = useSelector(state => state.range)
    const [values, setValues] = useState(list)
    const [sum, setSum] = useState('')
    const [sumMonth, setSumMonth] = useState(0)
    useEffect(() => {
        const monthPay = (values[0].defaultValue - values[1].defaultValue) *
            ((0.035 * Math.pow((1 + 0.035), values[2].defaultValue)) / (Math.pow((1 + 0.035), values[2].defaultValue) - 1));
        setSumMonth(Intl.NumberFormat('ru-RU').format(~~monthPay))
        let s = 0.1 + +values[2].defaultValue * monthPay
        setSum(
            Intl.NumberFormat('ru-RU').format(~~s)
        )
    }, [values])

    const postData = async () => {
        console.log(values[0].defaultValue )
        console.log(values[1].defaultValue )
        console.log( values[2].defaultValue)
        console.log(sum )
        console.log(sumMonth )
        await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: values[0].defaultValue ,
                initial : values[1].defaultValue,
                months: values[2].defaultValue,
                // amount: sum,
                // monthlyPayment: sumMonth
            })
        })
    }

    return (
        <div className={cl.app}>
            <div className={cl.title}>Рассчитайте стоимость автомобиля в лизинг</div>
            <div className={cl.ranges}>
                {
                    list.map(el =>
                        <Range
                            key={el.id}
                            disabled={disabled}
                            setValues={setValues}
                            values={values}
                            id={el.id}
                        />
                    )
                }
            </div>
            <div className={cl.wrapRes}>
                <div className={cl.results}>
                    <div className={cl.result}>
                        <MiniTitle text='Сумма договора лизинга'/>
                        <div className={cl.price}>{sum}₽</div>
                    </div>
                    <div className={cl.result}>
                        <MiniTitle text='Ежемесячный платеж от'/>
                        <div className={cl.price}>{sumMonth}₽</div>
                    </div>
                </div>
                <button className={cl.btn} onClick={postData}>Оставить заявку</button>
            </div>

        </div>
    );
}

export default App;