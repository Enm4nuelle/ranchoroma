"use client";

//desarrollado por césar enmanuelle gonzales medina 10/07/2026. de hecho todo esta hecho por mi
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
//import FiltersJsonData from "../data/filters.json";
//import ProductsJsonData from "../data/products.json";
import ScrollAnimation from "./scrollAnimation";

export const FilterProducts = ({ initialType, initialProducts, tipo, ...props }) => {
    //Actualtype contiene al filtro actual que se le aplicará a esta página
    //ActualProducts tiene la lista de los productos que coinciden con el tipo de ActualType
    //productsFiltered contiene una lista de los productos que cumplen con las condiciones de los filtros
    //ActualFilters contiene todos los filtros aplicables a la página, los que se sacan de filters.json
    //filtersFiltered contiene los filtros que se muestran actualmente en pantalla
    const [actualType] = useState(initialType);
    const [actualProducts] = useState(initialProducts);
    const [productsFiltered, setProductsFiltered] = useState(initialProducts);
    const [actualFilters, setActualFilters] = useState([]);
    const [filtersFiltered, setFiltersFiltered] = useState([]);

    //console.log("INITIAL PRODUCTS:", initialProducts);
    //console.log("PRODUCTS FILTERED:", productsFiltered);

    //numPagination es la página actual de la paginación
    //const [numPagination, setNumPagination] = useState(1);

    //variables para ver si es mobile o no, así se muestra el filter normal o el del modal
    //false para 
    const [resolution, setResolution] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    //Logica de llenado de datos iniciales

    //aca se arma el filtro para los filtros tipos numericos
    //valueRange es lowRange en caso no haya valueRange
    const getLabelFilterNumber = (valueRange, type, unity, secondValueRange = "") => {
        let auxLabelFilterNumber = "";
        if(!secondValueRange){//hay valueRange y type
            switch (type){
                case "more":
                    auxLabelFilterNumber = "> " + valueRange + " " + unity;
                    break;
                case "equal":
                    auxLabelFilterNumber = "= " + valueRange + " " + unity;
                    break;
                case "less":
                    auxLabelFilterNumber = valueRange + " " + unity + " <";
                    break;
                default:
                    break;
            }
        }else{
            auxLabelFilterNumber = valueRange +  " a " + secondValueRange + " " + unity;
        }
        return auxLabelFilterNumber;
    }

    useEffect(() => {
        if (!initialType || !initialProducts) return;

        const getActualFilters = (filterConfig, products) => {
            let auxActualFilters = [];
            //hay 3 tipos de posibles filtros. El númerico que se valida con el atributo isFilterNumber. Dentro de los
            //numericos hay 3 tipos más, "more" que significa que filtrará los valores mayores. Si type es "less" será
            //con valores menores, si es type "equal" solo filtrará los valores iguales. Si en no tiene el atributo
            //"valueRange" tendrá "lowRange" y "highRange" donde será un filtro entre esos valores.
            //Otro puede ser una lista de Strings, donde cada string será una categoría del filtro, siempre que no se repitan
            //otro puede ser solo un valor, donde cada valor será una categoría siempre que no se repitan
            //el objeto de los filtros mostrará el mismo orden que se registro en el filters.json en rangesNumber. Así que
            //si se puso desacomodado se verá desacomodado aunque el filtro seguirá funcionando
            //Todas las comparaciones serán usando >= o <=. Así que si se quiere evitar que salgan cosas como que un producto
            //entre en mayor a 40 y en el rango de 20 a 40 por ejemplo, se debe cambiar los extremos
            //si se quiere saber las unidades de un atributo numerico, poner "unity" antes del attributeName. Ejemplo unityweightOnWork
            filterConfig.filters.forEach((filter, index) => {
                let auxFilter = {};
                auxFilter.name = filter.name;
                auxFilter.attributeName = filter.attributeName;
                if (filter.isFilterNumber) {//filtro numerico
                    auxFilter.isFilterNumber = true;
                    //encontrar la unidad del atributo. Se asume que al hacer los datos todos tienen la misma unidad
                    auxFilter.unityAttribute = products[0]["unity" + filter.attributeName];
                    auxFilter.filters = [];
                    filter.rangesNumber.forEach((rangeNumber, i) => {
                        let auxRangeNumber = {};
                        if (rangeNumber.valueRange) {//tiene un tipo less, more, equal
                            auxRangeNumber.labelFilter = getLabelFilterNumber(rangeNumber.valueRange, rangeNumber.type, auxFilter.unityAttribute);
                            auxRangeNumber.valueRange = rangeNumber.valueRange;
                            auxRangeNumber.type = rangeNumber.type;
                        } else {
                            auxRangeNumber.labelFilter = getLabelFilterNumber(rangeNumber.lowRange, "", auxFilter.unityAttribute, rangeNumber.highRange);
                            auxRangeNumber.highRange = rangeNumber.highRange;
                            auxRangeNumber.lowRange = rangeNumber.lowRange;
                        }
                        auxRangeNumber.checked = false;
                        auxRangeNumber.isAppear = true;
                        auxFilter.filters.push(JSON.parse(JSON.stringify(auxRangeNumber)));
                    });
                    auxActualFilters.push(JSON.parse(JSON.stringify(auxFilter)));
                } else {//filtro de varios valores (por coincidencia)
                    auxFilter.isFilterNumber = false;
                    auxFilter.filters = [];
                    let auxListFilters = new Set();
                    products.forEach(prod => {
                        const val = prod[filter.attributeName];
                        if (Array.isArray(val)) {
                            val.forEach(el => auxListFilters.add(el));
                        } else if (val !== undefined) {
                            auxListFilters.add(val);
                        }
                    });
                    auxListFilters.forEach(listFilter => {
                        auxFilter.filters.push({
                            labelFilter: listFilter,
                            value: listFilter,
                            checked: false,
                            isAppear: true
                        });
                    });
                    auxActualFilters.push(auxFilter);
                }
            });
            return auxActualFilters;
        };

        const auxFilters = getActualFilters(initialType, initialProducts);
        setActualFilters(auxFilters);
        setFiltersFiltered(auxFilters);
    }, [initialType, initialProducts]);

    //Lógica del manejo de filtros

    const onChangeFilter = (indexFilter, indexSubFilter) =>{
        //si es true, significa que está marcado y pasa a desmarcar, entonces todos los demás filtros de su grupo vuelven a ser visibles
        //si es false, significa que estaba desmarcado y pasa a marcar, entonces todos los demás filtros de su grupo no se muestran
        const checked = filtersFiltered[indexFilter].filters[indexSubFilter].checked;

        setFiltersFiltered(prev => {
            const newFilters = [...prev];
            newFilters[indexFilter] = {
                ...newFilters[indexFilter],
                filters: [...newFilters[indexFilter].filters]
            };
            for (let i = 0; i < newFilters[indexFilter].filters.length; i++) {
                newFilters[indexFilter].filters[i] = {
                    ...newFilters[indexFilter].filters[i],
                    isAppear: checked ? true : (i === indexSubFilter)
                };
            }
            newFilters[indexFilter].filters[indexSubFilter] = {
                ...newFilters[indexFilter].filters[indexSubFilter],
                checked: !checked
            };
            return newFilters;
        });
        //console.log(filtersFiltered);
        //console.log(productsFiltered);
    }
    useEffect(() => {
        const auxProductsFiltered = [];
        //console.log(actualProducts);
        //console.log(filtersFiltered);
        for(let i = 0; i < actualProducts.length; i++){
            const product = actualProducts[i];
            let cumpleTodosLosGrupos = true;
            for(let j = 0; j < filtersFiltered.length; j++){
                const grupo = filtersFiltered[j];
                //Se obtienen los subfiltros activos de este grupo de filtros
                const filtrosActivos = grupo.filters.filter(f => f.checked);
                //Si no hay ningún subfiltro marcado, este grupo no filtra y se pasa a la siguiente iteración para ver el siguiente grupo de filtros
                if (filtrosActivos.length === 0) {
                    continue;
                }
                let cumpleGrupo = false;
                for(let k = 0; k < filtrosActivos.length; k++){
                    const filtro = filtrosActivos[k];
                    if (grupo.isFilterNumber){
                        const valueInProduct = product[grupo.attributeName];
                        switch (filtro.type){
                            case "more":
                                if(valueInProduct >= filtro.valueRange){
                                    cumpleGrupo = true;
                                }
                                break;
                            case "less":
                                if(valueInProduct <= filtro.valueRange){
                                    cumpleGrupo = true;
                                }
                                break;
                            case "equal":
                                if(valueInProduct === filtro.valueRange){
                                    cumpleGrupo = true;
                                }
                                break;
                            default:
                                if(valueInProduct >= filtro.lowRange && valueInProduct <= filtro.highRange){
                                    cumpleGrupo = true;
                                }
                        }
                    }else{
                        const valueInProduct = product[grupo.attributeName];
                        if(Array.isArray(valueInProduct)){
                            if(valueInProduct.includes(filtro.value)){
                                cumpleGrupo = true;
                            }
                        }else{
                            if(valueInProduct === filtro.value){
                                cumpleGrupo = true;
                            }
                        }
                    }
                    if(cumpleGrupo){
                        break;
                    }
                }
                // Si este grupo no cumplió con los filtros, el producto ya no se muestra
                if(!cumpleGrupo){
                    cumpleTodosLosGrupos = false;
                    break;
                }
            }
            if(cumpleTodosLosGrupos){
                auxProductsFiltered.push(product);
            }
        }
        setProductsFiltered(auxProductsFiltered);
    }, [filtersFiltered, actualProducts]);

    const detectResize = () => {
        //console.log("esta resizeando filter products", window.innerWidth);
        let actualWidth = window.innerWidth;
        if(actualWidth < 992){
            setResolution(true); //se acomoda en mobile
        }else{
            setResolution(false); //se acomoda en pc
            setShowModal(false);
        }
    }

    useEffect(()=>{
        let actualWidth = window.innerWidth;
        if(actualWidth < 992){
            setResolution(true); //se acomoda en mobile
        }else{
            setResolution(false); //se acomoda en pc
            setShowModal(false);
        }
        window.addEventListener("resize", detectResize);
        return () => {
            window.removeEventListener("resize", detectResize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //renderizado de los filtros
    const renderFilters = () => {
        return (
            <ul className="filterProducts-mainPart-filter-filters">
                {
                    filtersFiltered.map((filter, i)=>(
                        <li className="filterProducts-mainPart-filter-filters-item" key={(filter.name + i)}>
                            {
                                props.data.isMainH1 ?
                                <h2 className="filterProducts-mainPart-filter-filters-item-title">{filter.name}</h2>
                                :
                                <h3 className="filterProducts-mainPart-filter-filters-item-title">{filter.name}</h3>
                            }
                            {
                                filter.filters.map((filt, j)=>(
                                    <div
                                        className="filterProducts-mainPart-filter-filters-item-option"
                                        style={{
                                            display: (!filt.isAppear) ? "none" : ""
                                        }}
                                        key={j}
                                    >
                                        <label className="filterProducts-mainPart-filter-filters-item-option-label">
                                            <input
                                                className="filterProducts-mainPart-filter-filters-item-option-checkbox"
                                                checked={filtersFiltered[i].filters[j].checked}
                                                onChange={()=>{onChangeFilter(i, j)}}
                                                type="checkbox"
                                            />
                                            <p className="filterProducts-mainPart-filter-filters-item-option-text">
                                                {filt.labelFilter}
                                            </p>
                                        </label>
                                    </div>
                                ))
                            }
                            {
                                i === actualFilters.length - 1 ?
                                    ""
                                :
                                    <div className="filterProducts-mainPart-filter-divider" aria-hidden="true"></div>   
                            }
                        </li>
                    ))
                }
            </ul>
        );
    }

    //anular el scroll en mobiles cuando se scrolleo hasta el final del modal
    useEffect(() => {
        if(showModal){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal]);


    return (
        <section className={"filterProducts " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="filterProducts-header">
                    {
                        props.data.isMainH1 ?
                        <h1 className="filterProducts-header-title">
                            {actualType.title}
                        </h1>
                        :
                        <h2 className="filterProducts-header-title">
                            {actualType.title}
                        </h2>
                    }
                    <div className="filterProducts-header-divider" aria-hidden="true"></div>
                    <p className="filterProducts-header-description">
                        {actualType.description}
                    </p>
                </div>
            </ScrollAnimation>
            <div
                className="filterProducts-mainPart"
                style={{
                    flexDirection: resolution ? "column" : ""
                }}
            >
                {
                    resolution ?
                        <div className="filterProducts-mainPart-filterModal">
                            <p className="filterProducts-mainPart-filterModal-title">{props.data.titleFilters}</p>
                            <i
                                className={"filterProducts-mainPart-filterModal-buttonModal " + (props.data.iconMobileFilter)}
                                onClick={() => setShowModal(true)}
                                aria-hidden="true"
                            ></i>
                        </div>
                    :
                    <div className="filterProducts-mainPart-filter">
                        <div className="filterProducts-mainPart-filter-header">
                            <p className="filterProducts-mainPart-filter-header-title">
                                {props.data.titleFilters}
                            </p>
                            <div className="filterProducts-mainPart-filter-divider" aria-hidden="true"></div>
                        </div>
                        {renderFilters()}
                    </div>
                }
                <div className="filterProducts-mainPart-products">
                    {/* Logica de la paginación, por ahora no se hará porque no hay suficientes tipos de productos para que valga de algo
                    <div className="filterProducts-mainPart-products-header">
                        <p className="filterProducts-mainPart-products-numResults">{productsFiltered.length + " " + props.data.labelNumProductsFiltered}</p>
                        <div className="filterProducts-mainPart-products-header-pagination">
                            <i className={"filterProducts-mainPart-products-header-pagination-leftArrow " + props.data.iconArrowsPaginationLeft}></i>
                            <p className="filterProducts-mainPart-products-header-pagination-text">
                                {
                                    numPagination + " - " +
                                    (props.data.numProductsPagination < actualProducts.length ? props.data.numProductsPagination : actualProducts.length) +
                                    " de " +  actualProducts.length
                                }
                            </p>
                            <i className={"filterProducts-mainPart-products-header-pagination-rigthArrow " + props.data.iconArrowsPaginationRight}></i>
                        </div>
                    </div>*/
                    }
                    <ul className="filterProducts-mainPart-products-items">
                        {
                            productsFiltered.length > 0  ?
                                productsFiltered.map((product, index) =>(
                                    <li className="filterProducts-mainPart-products-items-item" key={product.nameProduct + index}>
                                        {
                                            props.data.isMainH1 ?
                                            <h2 className="filterProducts-mainPart-products-items-item-title">
                                                {product.nameProduct}
                                            </h2>
                                            :
                                            <h3 className="filterProducts-mainPart-products-items-item-title">
                                                {product.nameProduct}
                                            </h3>
                                        }
                                        <img
                                            className="filterProducts-mainPart-products-items-item-img"
                                            src={product.img}
                                            alt={product.nameProduct}
                                            loading="lazy"
                                        />
                                        <dl className="filterProducts-mainPart-products-items-item-principalSpecs">
                                            {
                                                product.principalSpecifications.map((spec, ind)=>(
                                                    <div className="filterProducts-mainPart-products-items-item-principalSpecs-spec" key={spec.nameSpecification + ind}>
                                                        <dt className="filterProducts-mainPart-products-items-item-principalSpecs-spec-title">
                                                            {spec.nameSpecification}
                                                        </dt>
                                                        <dd className="filterProducts-mainPart-products-items-item-principalSpecs-spec-description">
                                                            {spec.value + " " + spec.unity}
                                                        </dd>
                                                    </div>
                                                ))
                                            }
                                        </dl>
                                        <Link
                                            className="filterProducts-mainPart-products-items-item-button"
                                            href={actualType.href + "/" + product.nameHref}
                                        >
                                            {props.data.buttonMoreDetails}
                                        </Link>
                                        {
                                            /*Para el futuro desarrollo del checkbox de Comparar Modelos */
                                        }
                                    </li>
                                ))
                            :
                            <p className="filterProducts-mainPart-products-items-textNoItems">
                                {props.data.noItemsFilter}
                            </p>
                        }
                    </ul>
                </div>
            </div>
            {
                showModal ?
                <div className="filterProducts-modal-container">
                    <div
                        className="filterProducts-modal"
                        onClick={() => {
                            setShowModal(false)
                        }}
                    >
                        <div className="filterProducts-modal-header">
                            {
                                props.data.isMainH1 ?
                                <h2 className="filterProducts-modal-header-title">{props.data.titleFilters}</h2>
                                :
                                <h3 className="filterProducts-modal-header-title">{props.data.titleFilters}</h3>
                            }
                            <i
                                className={"filterProducts-modal-header-icon " + (props.data.iconCloseModal)}
                                onClick={() => setShowModal(false)}
                                aria-hidden="true"
                            ></i>
                        </div>
                        <div
                            onClick={(e)=>{e.stopPropagation()}}
                            className="filterProducts-modal-content"
                        >
                            {renderFilters()}
                        </div>
                    </div>
                </div>
                :
                ""
            }
        </section>
    )
}
export default FilterProducts;