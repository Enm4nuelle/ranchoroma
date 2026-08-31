"use client";

import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useProduct } from "@/context/ProductContext";
import FormField from "./formField";
import JsonData from "../data/data.json";
import ScrollAnimation from "./scrollAnimation";

export const FormCotization = (props) => {
    const { productInfo } = useProduct();
    //comprobamos si viene desde la página de detalle producto y jalamos esa info
    const { nameProduct, urlImg } = productInfo;

    const getInitialValue = (field) => {
        if (field.type === "select") return 0;
        if (field.type === "checkboxGroup") return [];
        return "";
    };

    const isEmpty = (field, value) => {
        if (field.type === "select") {
            return Number(value) === 0;
        }
        if (field.type === "checkboxGroup") {
            return false;
        }
        return !value;
    };

    const fields = props.data.fields;

    // valores iniciales derivados del arreglo de campos, uno por cada "name"
    const initialValues = useMemo(() => {
        const values = {};
        fields.forEach((field) => {
            values[field.name] = getInitialValue(field);
        });
        return values;
    }, [fields]);

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const newErrors = {};
        let hasError = false;
        fields.forEach((field) => {
            if (field.required && isEmpty(field, values[field.name])) {
                newErrors[field.name] = true;
                hasError = true;
            } else if (field.exactLength && values[field.name].length !== field.maxLength){
                newErrors[field.name] = true;
                hasError = true;
            }
        });
        setErrors(newErrors);

        if (hasError) {
            return;
        }else{
            let auxValues = structuredClone(values);
            console.log("envio a backend", auxValues);

            const formData = new FormData();

            formData.append("access_key", JsonData.keyWeb3Form);

            console.log()
            fields.forEach((field)=>{
                if(field.type === "select"){
                    for(let i = 0; i < field.options.length; i++){
                        if(parseInt(field.options[i].value) === parseInt(values[field.name])){
                            formData.append(field.formLabel, field.options[i].text);
                            break;
                        }
                    }
                }else if(field.type === "checkboxGroup"){
                    let auxCheckBoxInfo = "";
                    for(let i = 0; i < values[field.name].length; i++){
                        for(let j = 0; j < field.options.length; j++){
                            if(parseInt(field.options[j].value) === parseInt(values[field.name][i])){
                                auxCheckBoxInfo = auxCheckBoxInfo + field.options[j].text + ",";
                                break;
                            }
                        }
                    }
                    formData.append(field.formLabel, auxCheckBoxInfo);
                }else{
                    formData.append(field.formLabel, values[field.name]);
                }
            });

            console.log([...formData]);

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
                } else {
                    console.error("Error Web3Forms:", data);
                    toast(props.data.messageErrorSend);
                }
            } catch (error) {
                console.error("Error enviando formulario:", error);
                toast(props.data.messageErrorSend);
            }
            fields.forEach((field) => {
                values[field.name] = getInitialValue(field);
            });
        }
    };

    // el campo "specifications" (u otro) puede marcarse con hideWhenProductRef:true
    // para ocultarse cuando ya venimos con producto de referencia, como en el original
    const visibleFields = fields.filter(
        (field) => !(field.hideWhenProductRef && nameProduct)
    );
    return (
        <section
            className={"formCotization " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            style={{ "width": props.data.width ? `min(${props.data.width}, 90%)` : "90%" }}
        >
            <div className="formCotization-header">
                <h1 className="formCotization-header-title">{props.data.title}</h1>
                <p className="formCotization-header-description">{props.data.description}</p>
            </div>
            {nameProduct && (
                <ScrollAnimation animation="left" pixelsDisplacement={80} duration={1000}>
                    <div className="formCotization-productReference-container">
                        <div className="formCotization-productReference">
                            <div className="formCotization-productReference-img-container">
                                <img
                                    src={urlImg}
                                    alt={nameProduct}
                                    className="formCotization-productReference-img"
                                    loading="lazy"
                                />
                            </div>
                            <span className="formCotization-productReference-name">{nameProduct}</span>
                        </div>
                    </div>
                </ScrollAnimation>
            )}

            <form className="formCotization-form" onSubmit={onSubmitForm}>
                {visibleFields.map((field) => (
                    <FormField
                        key={field.name}
                        field={{
                            ...field,
                            iconAlert: props.data.iconAlert,
                            errorMessage: (field.exactLength ? (props.data.errorMessageLength1stPart + field.maxLength + props.data.errorMessageLength2ndPart)
                                : props.data.errorMessage),
                        }}
                        value={values[field.name]}
                        error={!!errors[field.name]}
                        onChange={handleChange}
                    />
                ))}

                <p className="formCotization-form-textAlertForm">{props.data.alertForm}</p>

                <button className="filterProducts-mainPart-products-items-item-button">
                    {props.data.buttonSendForm}
                </button>
            </form>
        </section>
    )
}
export default FormCotization;