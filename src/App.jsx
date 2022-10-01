import cl from './styles/App.module.css'
import Range from "./components/Range";
import {useSelector} from "react-redux";
import {useState} from "react";
import MiniTitle from "./components/UI/MiniTitle";

function App() {
    const {disabled, list} = useSelector(state => state.range)
    const [values, setValues] = useState(list)
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
        <div className={cl.results}>
            <div className={cl.result}>
                <MiniTitle text='Сумма договора лизинга'/>
                <div className={cl.price}></div>
            </div>
            <div className={cl.result}>
                <MiniTitle text='Ежемесячный платеж от'/>
                <div className={cl.price}></div>
            </div>

        </div>



    </div>
  );
}

export default App;
