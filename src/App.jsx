import cl from './styles/App.module.css'
import Range from "./components/Range";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import MiniTitle from "./components/UI/MiniTitle";
function App() {
    const [disabled, setDisabled] = useState(false)
    const {list} = useSelector(state => state.range)
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
        setDisabled(() => true)
        await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: +values[0].defaultValue ,
                initial : +values[1].defaultValue,
                months: +values[2].defaultValue,
                amount: +sum.match(/\d+/g).join``,
                monthlyPayment: +sumMonth.match(/\d+/g).join``
            })
        }).finally(() => {
            setDisabled(() => false)
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
                <button disabled={disabled} className={cl.btn} onClick={postData}>Оставить заявку</button>
                {
                    disabled ? <button className={cl.btn}>
                        <svg width="25" height="25" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={cl.preloader}>
                            <path d="M13.8691 19.3825C11.9455 20.1121 9.83718 20.1976 7.86093 19.6261C5.88468 19.0546 4.14734 17.857 2.91009 16.2134C1.67285 14.5698 1.00256 12.569 1.00001 10.5118C0.99745 8.45459 1.66276 6.45212 2.89591 4.80546C4.12906 3.15879 5.86342 1.95691 7.83825 1.38051C9.81307 0.804109 11.9216 0.88433 13.847 1.60911C15.7723 2.3339 17.4103 3.66408 18.5148 5.39968C19.6193 7.13528 20.1305 9.18251 19.9716 11.2336" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button> : ''
                }

            </div>

        </div>
    );
}

export default App;
