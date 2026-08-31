"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ScrollAnimation from "./scrollAnimation";
import JsonData from "../data/data.json";

export const FormSendInfo = (props) => {
    const [placeFly, setPlaceFly] = useState("");
    const [aproxDate, setAproxDate] = useState("");
    const [numPeople, setNumPeople] = useState("");
    const [numberWhatsapp, setNumberWhatsapp] = useState("");

    const [datePickerIsFocused, setDatePickerIsFocused] = useState(false);

    const onChangePlaceFly = (event) => {
        setPlaceFly(event.target.value);
    }
    const onChangeAproxDate = (event) => {
        setAproxDate(event.target.value);
    }
    const onChangeNumPeople = (event) => {
        setNumPeople(event.target.value);
    }
    const onChangeNumberWhatsapp = (event) => {
        setNumberWhatsapp(event.target.value);
    }

    const sendInformation = async () => {
        if (
            placeFly.trim() === "" ||
            aproxDate.trim() === "" ||
            numPeople.trim() === "" ||
            numberWhatsapp === ""
        ) {
            //console.log("falta llenado de datos");
            return false;
        }

        const formData = new FormData();
        formData.append("access_key", JsonData.keyWeb3Form);
        formData.append(props.data.formLabelDestino, placeFly);
        formData.append(props.data.formLabelFecha, aproxDate);
        formData.append(props.data.formLabelNumeroPersonas, numPeople);
        formData.append(props.data.formLabelWhatsapp, numberWhatsapp);

        //console.log(formData);
        //console.log([...formData]);
        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {
                toast(props.data.messageSuccess);
                // Opcional: limpiar formulario aquí
                setPlaceFly("");
                setAproxDate("");
                setNumPeople("");
                setNumberWhatsapp("");
            } else {
                console.error("Error Web3Forms:", data);
                toast(props.data.messageErrorSend);
            }
        } catch (error) {
            console.error("Error enviando formulario:", error);
            toast(props.data.messageErrorSend);
        }
    };
    const intervalAnimationItem = props.data.delayItemsAnimation ?? 0;
    
    let delayAnimationItems = [];
    for(let i = 0; i < props.data.achievments.length; i++){
        delayAnimationItems.push(intervalAnimationItem * (i + 1));
    }

    return (
        <section className="formSendInfo" id={props.data.nameId}>
            <div className={"formSendInfo-achievments " + (props.data.dontHaveForm ? "formSendInfo-achievmentsCenter" : "         ")}>
                <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                    <p className="formSendInfo-achievments-subTitle">
                        {props.data.subTitle}
                    </p>
                </ScrollAnimation>
                <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                    <h2 className="formSendInfo-achievments-title">
                        {props.data.title}
                    </h2>
                </ScrollAnimation>
                <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                    <div className="formSendInfo-achievments-divider" aria-hidden="true"></div>
                </ScrollAnimation>
                <ul className="formSendInfo-achievments-list">
                    {
                        props.data.achievments.map((item, index)=>(
                            <ScrollAnimation animation={item.typeAnimation} pixelsDisplacement={item.pixelsAnimation} duration={props.data.durationItemsAnimation} delay={delayAnimationItems[index]} key={item.textFirstPart + index}>
                                <li className="formSendInfo-achievments-list-achievment">
                                    <div>
                                        <i className={"formSendInfo-achievments-list-achievment-icon " + item.icon} aria-hidden="true"></i>
                                        <p className="formSendInfo-achievments-list-achievment-text1">
                                            {item.textFirstPart}
                                        </p>
                                    </div>
                                    <p className="formSendInfo-achievments-list-achievment-text2">
                                        {item.textSecondPart}
                                    </p>
                                </li>
                            </ScrollAnimation>
                        ))
                    }
                </ul>
            </div>
            {
                props.data.dontHaveForm ?
                ""
                :
                <ScrollAnimation animation={props.data.typeAnimationForm} pixelsDisplacement={props.data.pixelsAnimationForm} duration={props.data.durationAnimationForm} delay={props.data.delayAnimationForm}>
                    <div
                        className="formSendInfo-form"
                        style={{
                            backgroundImage: props.data.imgBackgroundForm ? `url(${props.data.imgBackgroundForm})` : "none"
                        }}
                    >
                        <form className="formSendInfo-form-container" onSubmit={(e) => { e.preventDefault(); sendInformation(); }}>
                            <p className="formSendInfo-form-subTitle">
                                {props.data.subTitleForm}
                            </p>
                            <h2 className="formSendInfo-form-title">
                                {props.data.titleForm}
                            </h2>
                            <div className="formSendInfo-form-inputs">
                                <div className="formSendInfo-form-inputs-group">
                                    <label htmlFor="formSendInfo-placeFly" className="sr-only">
                                        {props.data.formLabelDestino ?? props.data.placeholderDestino}
                                    </label>
                                    <input
                                        id="formSendInfo-placeFly"
                                        name="placeFly"
                                        value={placeFly}
                                        className="formSendInfo-form-inputs-input formSendInfo-form-inputs-placeFly"
                                        onChange={(e) => onChangePlaceFly(e)}
                                        placeholder={props.data.placeholderDestino}
                                    />
                                </div>
                                <div className="formSendInfo-form-inputs-group">
                                    <label htmlFor="formSendInfo-aproxDate" className="sr-only">
                                        {props.data.formLabelFecha ?? props.data.placeholderFecha}
                                    </label>
                                    <input
                                        id="formSendInfo-aproxDate"
                                        name="aproxDate"
                                        value={aproxDate}
                                        type={datePickerIsFocused || aproxDate ? "date" : "text"}
                                        className="formSendInfo-form-inputs-input formSendInfo-form-inputs-aproxDate"
                                        onChange={(e) => onChangeAproxDate(e)}
                                        placeholder={props.data.placeholderFecha}
                                        onFocus={() => setDatePickerIsFocused(true)}
                                        onBlur={() => setDatePickerIsFocused(false)}
                                    />
                                </div>
                                <div className="formSendInfo-form-inputs-group">
                                    <label htmlFor="formSendInfo-numPeople" className="sr-only">
                                        {props.data.formLabelNumeroPersonas ?? props.data.placeholderNumeroPersonas}
                                    </label>
                                    <input
                                        id="formSendInfo-numPeople"
                                        name="numPeople"
                                        value={numPeople}
                                        type="number"
                                        inputMode="numeric"
                                        min="1"
                                        className="formSendInfo-form-inputs-input formSendInfo-form-inputs-numPeople"
                                        onChange={(e) => onChangeNumPeople(e)}
                                        placeholder={props.data.placeholderNumeroPersonas}
                                    />
                                </div>
                                <div className="formSendInfo-form-inputs-group">
                                    <label htmlFor="formSendInfo-whatsapp" className="sr-only">
                                        {props.data.formLabelWhatsapp ?? props.data.placeholderWhatsapp}
                                    </label>
                                    <input
                                        id="formSendInfo-whatsapp"
                                        name="whatsapp"
                                        value={numberWhatsapp}
                                        type="tel"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        className="formSendInfo-form-inputs-input formSendInfo-form-inputs-whatsapp"
                                        onChange={(e) => onChangeNumberWhatsapp(e)}
                                        placeholder={props.data.placeholderWhatsapp}
                                    />
                                </div>
                            </div>
                            <div className="formSendInfo-form-lowPart">
                                <button
                                    type="submit"
                                    className={props.data.buttonSendInformation.type === "primary" ? "buttonPrimary" : "buttonSecondary"}
                                >
                                    {props.data.buttonSendInformation.text}
                                </button>
                                <div className="formSendInfo-form-lowPart-otherOption">
                                    <h3 className="formSendInfo-form-lowPart-otherOption-title">{props.data.titleOtherOption}</h3>
                                    <div className="formSendInfo-form-lowPart-otherOption-whatsapp">
                                        <i className={"formSendInfo-form-lowPart-otherOption-whatsapp-icon " + props.data.iconWhatsapp} aria-hidden="true"></i>
                                        <a 
                                            href={`https://wa.me/${props.data.numberWhatsapp.replace(/\D/g, '')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="formSendInfo-form-lowPart-otherOption-whatsapp-number"
                                        >
                                            {props.data.numberWhatsapp}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </ScrollAnimation>
            }
        </section>
    )
}
export default FormSendInfo;