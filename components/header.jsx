"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Jsondata from "../data/data.json";

export const Header = (props) => {
    const url= `https://wa.me/${props.data.buttonContact.number}?text=${encodeURIComponent(props.data.buttonContact.defaultMessage)}`;
    const pathname = usePathname();
    const isInMain = pathname === "/";

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [headerSolid, setHeaderSolid] = useState(false);
    const [localLinks, setLocalLinks] = useState([]);

    const handleMainLinkClick = (link, index) => {
        if (link.sublinks) {
            setOpenIndex(openIndex === index ? null : index);
            return;
        }
    };
    const checkIfOnPage = (link, isSublink, sublink) => {
        //codigo para pintar el dropdown. solo funciona hasta 2 de profundidad (ventas/marca)
        if(isSublink){
            //console.log(sublink);
            if(pathname === sublink.href){
                return true;
            }
            return false;
        }
        if(link.href === pathname){ //queremos resaltar aqui solo los links, los sublinks es arriba
            return true;
        }else{//validamos si estamos queriendo resaltar un sublink
            if(!link.sublinks){
                return false;
            }
            let paths = pathname.split("/")
            let firstPathSublink = link.sublinks[0].href.split("/");
            //console.log("/" + paths[1]);
            //console.log(firstPathSublink);
            if("/" + paths[1] === "/" + firstPathSublink[1]){
                return true;
            }else{
                return false;
            }
        }
        
    }
    const isTransparent = isInMain && props.data.isTransparentAtStart && !headerSolid;
    const detectScroll = () => {
        setHeaderSolid(window.scrollY >= (props.data.headerHeight * 1.5));
    }

    useEffect(()=>{
        window.addEventListener("scroll", detectScroll);
        return () => {
            window.removeEventListener("scroll", detectScroll);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        let auxLocalsLinks = [];
        for(let i = 0; i < Jsondata.pages.length; i++){
            let auxLocalLink = {};
            if(Jsondata.pages[i].showInMenu){
                auxLocalLink.href = Jsondata.pages[i].href;
                auxLocalLink.text = Jsondata.pages[i].title;
                auxLocalsLinks.push(auxLocalLink);
            }
        }
        setLocalLinks(auxLocalsLinks);
    },[props]);

    if(props.data.allPagesMantain){
        return <></>;
    }else{
        //console.log(pathname);
        if(props.data.pageMantain === pathname){
            return <></>;
        }
    }
    return (
        <header className={"header " + (isTransparent ? "header-transparent" : "header-noTransparent")}>
            <div className="header-logo">
                <Link href="/" className="header-logo-link">
                    <img
                        src={isTransparent ? props.data.imgLogoTransparent : props.data.imgLogo}
                        alt="Logo"
                        className="header-logo-img"
                    />
                </Link>
            </div>

            <button
                type="button"
                className="header-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menú"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <nav className="header-links" aria-label="Navegación principal">
                {props.data.links.map((link, index) =>
                    link.sublinks ? (
                        // Item con submenú: no navega directo, se queda como div "toggle"
                        <div
                            key={"header-links" + index}
                            className={
                                "header-links-item " +
                                (checkIfOnPage(link) ? "header-links-item-selected" : "")
                            }
                        >
                            <h4 className={"header-links-item-text " + (isTransparent ? "header-links-item-text-transparent" : "")}>
                                {link.text}
                            </h4>
                            <i className={"header-links-item-icon " + props.data.iconSubLinks}></i>
                            <div className="header-dropdown">
                                {link.sublinks.map((sub, i) =>
                                    sub.anotherPage ? (
                                        // Sublink externo: <a> real, se abre en pestaña nueva
                                        <a
                                            key={"header-subLinks" + link.text + i}
                                            href={sub.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={
                                                "header-dropdown-item " +
                                                (checkIfOnPage(link, true, sub) ? "header-sublinks-item-selected" : "")
                                            }
                                        >
                                            {sub.text}
                                        </a>
                                    ) : (
                                        // Sublink interno: Link de Next.js
                                        <Link
                                            key={"header-subLinks" + link.text + i}
                                            href={sub.href}
                                            className={
                                                "header-dropdown-item " +
                                                (checkIfOnPage(link, true, sub) ? "header-sublinks-item-selected" : "")
                                            }
                                        >
                                            {sub.text}
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    ) : link.anotherPage ? (
                        // Item de nivel superior externo: <a> real
                        <a
                            key={"header-links" + index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                                "header-links-item " +
                                (checkIfOnPage(link) ? "header-links-item-selected" : "")
                            }
                        >
                            <h4 className={"header-links-item-text " + (isTransparent ? "header-links-item-text-transparent" : "")}>
                                {link.text}
                            </h4>
                        </a>
                    ) : (
                        // Item de nivel superior interno: Link de Next.js
                        <Link
                            key={"header-links" + index}
                            href={link.href}
                            className={
                                "header-links-item " +
                                (checkIfOnPage(link) ? "header-links-item-selected" : "")
                            }
                        >
                            <h4 className={"header-links-item-text " + (isTransparent ? "header-links-item-text-transparent" : "")}>
                                {link.text}
                            </h4>
                        </Link>
                    )
                )}
                {localLinks.map((link, index) => (
                    <Link
                        key={"header-links-local" + index}
                        href={`/${link.href}`}
                        scroll={false}
                        className="header-links-item"
                        onClick={(e) => {
                            if (pathname === "/") {
                                e.preventDefault();
                                document.getElementById(link.href)?.scrollIntoView({ behavior: "smooth" });
                            }
                            // si no estamos en "/", dejamos que Link navegue normal a /#id
                        }}
                    >
                        <h4 className={"header-links-item-text " + (isTransparent ? "header-links-item-text-transparent" : "")}>
                            {link.text}
                        </h4>
                    </Link>
                ))}

                {props.data.buttonContact ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-link-buttonContact"
                    >
                        <i className={"header-link-buttonContact-icon " + props.data.buttonContact.icon}></i>
                        <div className="header-link-buttonContact-text">
                            <h2 className="header-link-buttonContact-text-title">{props.data.buttonContact.title}</h2>
                            <p className="header-link-buttonContact-text-description">{props.data.buttonContact.description}</p>
                        </div>
                    </a>
                ) : ""}
            </nav>

            <nav className={`header-mobile-menu ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Navegación móvil">
                {props.data.links.map((link, index) => (
                    <div key={"header-mobile-" + index} className="header-mobile-item">
                        {link.sublinks ? (
                            // Con submenú: sigue siendo botón (solo togglea, no navega)
                            <button
                                type="button"
                                className={
                                    "header-mobile-item-toggle " +
                                    (checkIfOnPage(link) ? "header-links-item-selected-mobile" : "")
                                }
                                onClick={() => handleMainLinkClick(link, index)}
                            >
                                <span>{link.text}</span>
                                <i className={"header-links-item-icon " + props.data.iconSubLinks}></i>
                            </button>
                        ) : (
                            // Sin submenú: navega, debe ser <Link> (no puede ser <button> dentro de <a>)
                            <Link
                                href={link.href}
                                className={
                                    "header-mobile-item-toggle header-mobile-link-only " +
                                    (checkIfOnPage(link) ? "header-links-item-selected-mobile" : "")
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span>{link.text}</span>
                            </Link>
                        )}

                        {link.sublinks ? (
                            <div className={`header-mobile-sublinks ${openIndex === index ? "is-open" : ""}`}>
                                {link.sublinks.map((sub, i) => (
                                    <Link
                                        key={"header-mobile-subLinks" + link.text + i}
                                        href={sub.href}
                                        className={
                                            "header-mobile-sublink " +
                                            (checkIfOnPage(link, true, sub) ? "header-links-item-selected-mobile" : "")
                                        }
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {sub.text}
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </nav>
        </header>
    );
};

export default Header;