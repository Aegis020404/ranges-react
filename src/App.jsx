import cl from './styles/App.module.css'
import Range from "./components/Range";
import {useSelector} from "react-redux";
import {useState} from "react";

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



    </div>
  );
}

export default App;
