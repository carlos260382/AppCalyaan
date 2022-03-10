import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTurn } from '../actions/turnAction.js'
//import Cookie from 'universal-cookie';



const Calendar = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
console.log('informacion de usuario', userInfo)
    //const cookies = new Cookie();

    //var day = new Date();
    //var hour =
      //  day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();

    const [turn, setTurn] = useState({
        seller: userInfo,        
        day: '',
        hour: '',
    });

    const handleChange = (e) => {
        setTurn({
            ...turn,
            [e.target.name]: e.target.value,
        });
        console.log('este es el turno', turn)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch (createTurn(turn))
        // let res = await fetch(
        //     `api/turn/${userInfo}`,
        //     {
        //         method: 'POST',
        //         headers: { Authorization: `Bearer ${userInfo?.token}` },
        //         body: JSON.stringify(turn),
        //     }
        // );
        // const data = await res.json();
        // console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
           
            <div>
                <label>Selecciona la Fecha</label>
                <input type="date" name="day" onChange={handleChange} />
            </div>

            <div>
                <label>Selecciona la Hora</label>
                    
                <select name="hour" onChange={handleChange}>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="15:00 PM">15:00 PM</option>
                    <option value="16:00 PM">16:00 PM</option>
                    <option value="17:00 PM">17:00 PM</option>
                    <option value="18:00 PM">18:00 PM</option>
                </select>
               
            </div>
            <input type="submit" value="Enviar Turno" />
        </form>
    );
};

export default Calendar;
