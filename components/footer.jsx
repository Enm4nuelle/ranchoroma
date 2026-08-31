"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import JsonData from "../data/data.json";
import { usePathname } from "next/navigation";

export const Footer = (props) => {
    const pathname = usePathname();
    const [email, setEmail] = useState("");

    const onClickSendLetter = async (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            //console.log("falta llenado del email en le footer");
            return false;
        }

        const formData = new FormData();
        formData.append("access_key", JsonData.keyWeb3Form);
        formData.append("Email", email);

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
                setEmail("");
            } else {
                console.error("Error Web3Forms:", data);
                toast(props.data.messageError);
            }
        } catch (error) {
            console.error("Error enviando formulario:", error);
            toast(props.data.messageError);
        }
    }
    if(props.data.allPagesMantain){
        return <></>;
    }else{
        //console.log(pathname);
        if(props.data.pageMantain === pathname){
            return <></>;
        }
    }
    return (
        <footer
            className={"footer " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            style={props.data.backgroundImg ? { backgroundImage: `url(${props.data.backgroundImg})`}: {}}
        >
            <div className="footer-firstPart">
                <div className="footer-firstPart-companyInfo">
                    <img
                        src={props.data.imgLogo}
                        alt={props.data.altImgLogo}
                        className="footer-firstPart-companyInfo-img"
                    />
                    <p className="footer-firstPart-companyInfo-description">
                        {props.data.description}
                    </p>
                    <div className="footer-firstPart-socials">
                        <h3 className="footer-firstPart-contacts-title">
                            {props.data.titleNetworks}
                        </h3>
                        <ul className="footer-firstPart-socials-list">
                            {
                                props.data.socialNetworks.map((social, index)=>(
                                    <li key={index} className="footer-firstPart-socials-list-item">
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                        >
                                            <i
                                                className={"footer-firstPart-contacts-list-item-icon " + social.icon}
                                                aria-hidden="true"
                                            ></i>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="footer-firstPart-services">
                    <h3 className="footer-firstPart-services-title">
                        {props.data.titleServices}
                    </h3>
                    <ul className="footer-firstPart-services-list">
                        {
                            props.data.services.map((service, index)=>(
                                <li className="footer-firstPart-services-list-item" key={service.text + index}>
                                    {
                                        service.icon ?
                                            <i className={"footer-firstPart-services-list-item-icon " + service.icon}></i>
                                        :
                                        ""
                                    }
                                    <p className="footer-firstPart-services-list-item-text">{service.text}</p>
                                </li> 
                            ))
                        }
                    </ul>
                </div>
                <div className="footer-firstPart-contacts">
                    <h3 className="footer-firstPart-contacts-title">
                        {props.data.titleContacts}
                    </h3>
                    <ul className="footer-firstPart-contacts-list">
                        {
                            props.data.contacts.map((contact, index)=>(
                                <li className="footer-firstPart-contacts-list-item" key={contact.text + index}>
                                    {
                                        contact.icon ?
                                            <i className={"footer-firstPart-contacts-list-item-icon " + contact.icon}></i>
                                        :
                                        ""
                                    }
                                    {
                                        contact.items ?
                                            <div className="footer-firstPart-contacts-list-item-text-link-container">
                                            {contact.items.map((item, idx) => {
                                                return (
                                                    contact.type ?
                                                    <a
                                                        href = {
                                                            contact.type === "phone" ?
                                                                ("tel:" + item.text.replace(/\s/g, "")) :
                                                            contact.type === "email" ?
                                                                ("mailto:" + item.text) :
                                                            ""
                                                        }
                                                        key={item.text + idx}
                                                        className="footer-firstPart-contacts-list-item-text-link"
                                                    >
                                                        <p className="footer-firstPart-contacts-list-item-text">{item.text}</p>
                                                    </a>
                                                    :
                                                    <p className="footer-firstPart-contacts-list-item-text" key={item.text + idx}>{item.text}</p>
                                                )
                                            })}
                                            </div>
                                        :
                                        contact.type ?
                                            <a
                                                href = {
                                                    contact.type === "phone" ?
                                                        ("tel:" + contact.text.replace(/\s/g, "")) :
                                                    contact.type === "email" ?
                                                        ("mailto:" + contact.text) :
                                                    ""
                                                }
                                                className="footer-firstPart-contacts-list-item-text-link"
                                            >
                                                <p className="footer-firstPart-contacts-list-item-text">{contact.text}</p>
                                            </a>
                                        :
                                            <p className="footer-firstPart-contacts-list-item-text">{contact.text}</p>
                                    }
                                </li> 
                            ))
                        }
                    </ul>
                </div>
                <div className="footer-firstPart-sendLetter">
                    <h3 className="footer-firstPart-sendLetter-title">
                        {props.data.sendLetter.title}
                    </h3>
                    <p className="footer-firstPart-sendLetter-description">{props.data.sendLetter.description}</p>
                    <form className="footer-firstPart-sendLetter-form" onSubmit={(e)=>{onClickSendLetter(e)}}>
                        <label htmlFor="footer-email-input" className="visually-hidden">
                            Correo electrónico para suscripción
                        </label>
                        <input
                            id="footer-email-input"
                            placeholder={props.data.sendLetter.placeholderEmail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="footer-firstPart-sendLetter-form-input"
                            type="email"
                            required
                        />
                        <button
                            type="submit"
                            className="footer-firstPart-sendLetter-form-icon-container"
                            aria-label="Enviar suscripción al boletín"
                        >
                            <i className={"footer-firstPart-sendLetter-form-icon " + props.data.sendLetter.icon} aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer-secondPart">
                <p className="footer-secondPart-copyright">{props.data.copyrightText}</p>
                <p className="footer-secondPart-brandText">{props.data.brandText}</p>
            </div>
        </footer>
    )
}
export default Footer;