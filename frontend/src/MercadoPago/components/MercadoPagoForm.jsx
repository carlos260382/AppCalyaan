import React, { useState, useEffect } from "react";
import useScript from "../hooks/useScript.js";
import { formConfig } from "./formConfig";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useParams } from "react-router-dom";
import styles from '../../style/MercadoPagoForm.module.css'
//import useMercadoPago from "../hooks/useMercadoPago.js";
//import { useSelector } from 'react-redux';
//import OrderScreen from "../../screens/OrderScreen.js";

//import axios from "../../../node_modules/axios/index.js";

const INITIAL_STATE = {
    cvc: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    focus: "cardNumber",
    cardholderName: "",
    cardNumber: "",
    identificationType: "",
    identificationNumber: "",
    issuer:"",
    installments:""
    
};


export default function MercadoPagoForm(props) {
    console.log ('este son las props',props)
    const { id } = useParams();
    console.log('este es el id', id)    
    const [state, setState] = useState(INITIAL_STATE);
    const resultPayment = useMercadoPago();
  
    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.dataset.name || e.target.name]: e.target.value,
        });
        console.log('este es el stado', state)
    };

    const handleInputFocus = (e) => {
        setState({ ...state, focus: e.target.dataset.name || e.target.name });
    };

    function useMercadoPago() {
         
        const [resultPayment, setResultPayment] = useState(undefined);
     
        //const orderDetails = useSelector((state) => state.orderDetails);
        //const { order, loading, error } = orderDetails;
    
        // const userSignin = useSelector((state) => state.userSignin);
        // const { userInfo } = userSignin;
    
        const { MercadoPago } = useScript(
            "https://sdk.mercadopago.com/js/v2",
            "MercadoPago"
        );
            
       
        useEffect(() => {
            if (MercadoPago) {
                const mp = new MercadoPago('TEST-b1149716-091a-44cc-82d0-20f7cf7075e8');
               
                const cardForm = mp.cardForm({
                    amount: "100000.5",
                    autoMount: true,
                    form: formConfig,
                    callbacks: {
                        onFormMounted: (error) => {
                            if (error)
                                return console.warn(
                                    "Form Mounted handling error: ",
                                    error
                                );
                        },
    
                        onSubmit: (event) => {
                            event.preventDefault();
    
                            const {
                                paymentMethodId: payment_method_id,
                                issuerId: issuer_id,
                                cardholderEmail: email,
                                amount,
                                token,
                                installments,
                                identificationNumber,
                                identificationType,
                            } = cardForm.getCardFormData();
                            
                            fetch(
                                `http://localhost:5000/process-payment`,
                                {
                                    // entry point backend
                                    method: "POST",
                                    headers: {
                                         "Access-Control-Allow-Origin": "*",
                                        //  "Access-Control-Request-Method":
                                        //  "GET, POST, DELETE, PUT, OPTIONS",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        token,
                                        orderId: id,
                                        issuer_id,
                                        payment_method_id,
                                        transaction_amount: amount,
                                        installments:installments,
                                        description: "Descripción del producto",
                                        payer: {
                                            email,
                                            identification: {
                                                type: identificationType,
                                                number: identificationNumber,
                                            },
                                        },
                                    }),
                                }
                            )
                                .then((res) => res.json())
                                .then((data) => setResultPayment(data) )
                                .catch((err) => {
                                    setResultPayment(err);
                                });
                                //props.history.push(`/order/${id}`)
                                  
                        },
                        onFetching: (resource) => {
                            console.log("Fetching resource: ", resource);
                            // Animate progress bar
                            const progressBar =
                                document.querySelector(".progress-bar");
                            progressBar.removeAttribute("value");
    
                            return () => {
                                progressBar.setAttribute("value", "0");
                            };
                        },
                    },
                });
            }
            
        }, [MercadoPago]);
        console.log('resultado pago', resultPayment)
       
        return resultPayment;
        
    }
    //dispatch(payOrder(orderId, resultPayment))
    




    return (
        <div className= {styles.container}>
            <Card
                cvc={state.cvc}
                expiry={state.cardExpirationMonth + state.cardExpirationYear}
                name={state.cardholderName}
                number={state.cardNumber}
                focused={state.focus}
                identificationType= {state.identificationType}
                identificationNumber={state.identificationNumber}
                brand={state.issuer}
                paymentMethodId={state.paymentMethodId}

                //orderId={orderId}
            />
            <div className={styles.form}>
            <form id="form-checkout">
                <div className="form-control">
                    <input
                        type="tel"
                        name="cardNumber"
                        id="form-checkout__cardNumber"
                        placeholder= "Número de la tarjeta"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="tel"
                        name="cardExpirationMonth"
                        id="form-checkout__cardExpirationMonth"
                        placeholder= "Mes de vencimiento"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="tel"
                        name="cardExpirationYear"
                        id="form-checkout__cardExpirationYear"
                        placeholder= "Año de vencimiento"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="tel"
                        name="cvc"
                        id="form-checkout__securityCode"
                        placeholder= "Código de seguridad"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="cardholderName"
                        id="form-checkout__cardholderName"
                        placeholder= "Titular de la tarjeta"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="email"
                        name="cardholderEmail"
                        id="form-checkout__cardholderEmail"
                        placeholder= "E-mail"
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <select
                        name="issuer"
                        id="form-checkout__issuer"
                        placeholder= "Banco emisor"
                        on= 'true'
                        onChange={handleInputChange}
                    ></select>
                    <select
                        name="identificationType"
                        id="form-checkout__identificationType"
                        placeholder= "Tipo de documento"
                        onChange={handleInputChange}
                    ></select>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="identificationNumber"
                        id="form-checkout__identificationNumber"
                        placeholder= "Número de documento"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-control">
                    <select
                        name="installments"
                        id="form-checkout__installments"
                        placeholder= "Cuotas"
                        onChange={handleInputChange}
                    ></select>
                </div>
                <div className="form-control">
                    <button type="submit" id="form-checkout__submit">
                        Pagar
                    </button>
                </div>
                <progress value="0" className="progress-bar">
                    Cargando...
                </progress>
            </form>
            {resultPayment && <p>{JSON.stringify(resultPayment)}</p>}
           
        </div>
        </div>
    );
}
