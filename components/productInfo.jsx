"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useProduct } from "@/context/ProductContext";
import ProductsJsonData from "../data/products.json";
import { useState, useMemo } from "react";
import ScrollAnimation from "./scrollAnimation";

export const ProductInfo = (props) => {
    //funcion para establecer lo que va a ir en el ProductContext
    const { setProductInfo } = useProduct();

    const {producto} = useParams();
    const [product, setProduct] = useState(null);
    const [delayAnimationBenefits, setDelayAnimationBenefits] = useState([]);

    useMemo(()=>{
        const getProducto = () => {
            for(let i = 0; i < ProductsJsonData.maquinarias.length; i++){
                //console.log(ProductsJsonData.maquinarias[i].nameHref);
                //console.log(producto);
                if(ProductsJsonData.maquinarias[i].nameHref === producto){
                    //console.log("entra");
                    setProduct(ProductsJsonData.maquinarias[i]);
                    const intervalAnimationItems = props.data.delayEachAnimationBenefit ?? 0;
                    let auxDelayAnimations = [];
                    if(ProductsJsonData.maquinarias[i].principalBenefits){
                        for(let j = 0; j < ProductsJsonData.maquinarias[i].principalBenefits.length; j++){
                            auxDelayAnimations.push(intervalAnimationItems * (j + 1));
                        }
                    }
                    setDelayAnimationBenefits(auxDelayAnimations);
                    break;
                }
            }
        }
        getProducto();
    }, [producto, props.data.delayEachAnimationBenefit]);

    if(!product){
        return (
            <div> Cargando ...</div>
        )
    }
    return (
        <section className={"productInfo " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="productInfo-photoPart">
                <ScrollAnimation animation={props.data.typeAnimationImg} pixelsDisplacement={props.data.pixelsAnimationImg} duration={props.data.durationAnimationImg} delay={props.data.delayAnimationImg}>
                    <div className="productInfo-photoPart-img-container">
                        <img
                            src={product.img}
                            alt={"Foto de " + product.nameProduct}
                            className="productInfo-photoPart-img"
                        />
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation={props.data.typeAnimationImgInfo} pixelsDisplacement={props.data.pixelsAnimationImgInfo} duration={props.data.durationAnimationImgInfo} delay={props.data.delayAnimationImgInfo}>
                    <div className="productInfo-photoPart-info">
                        {
                            props.data.isMainH1?
                            <h1 className="productInfo-photoPart-info-title">
                                {product.nameProduct}
                            </h1>
                            :
                            <h2 className="productInfo-photoPart-info-title">
                                {product.nameProduct}
                            </h2>
                        }
                        <Link
                            className="filterProducts-mainPart-products-items-item-button productInfo-photoPart-info-button"
                            onClick={()=>{
                                setProductInfo({ nameProduct: product.nameProduct, urlImg: product.img });
                            }}
                            href={props.data.hrefButton}
                        >
                            {props.data.buttonSearchPrice}
                        </Link>
                        <div className="productInfo-photoPart-info-divider" aria-hidden="true"></div>
                        <div className="productInfo-photoPart-info-principalSpecs">
                            {
                                props.data.isMainH1 ?
                                <h2 className="productInfo-photoPart-info-principalSpecs-title">
                                    {props.data.labelPrincipalSpecs}
                                </h2>
                                :
                                <h3 className="productInfo-photoPart-info-principalSpecs-title">
                                    {props.data.labelPrincipalSpecs}
                                </h3>
                            }
                            {
                                product.principalSpecifications.map((spec, index) =>(
                                    <div className="productInfo-photoPart-info-principalSpecs-spec" key={spec.nameSpecification + index}>
                                        <dt className="productInfo-photoPart-info-principalSpecs-spec-title">
                                            {spec.nameSpecification}
                                        </dt>
                                        <dd className="productInfo-photoPart-info-principalSpecs-spec-description">
                                            {spec.value + " " +  spec.unity}
                                        </dd>
                                    </div>    
                                ))
                            }
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
            <div className="productInfo-generalDescription">
                {
                    props.data.isMainH1 ?
                    <h2 className="productInfo-generalDescription-title">
                        {props.data.labelGeneralDescription}
                    </h2>
                    :
                    <h3 className="productInfo-generalDescription-title">
                        {props.data.labelGeneralDescription}
                    </h3>
                }
                <p  className="productInfo-generalDescription-description">
                    {product.generalDescription}
                </p>
            </div>
            <div className="productInfo-benefits">
                {
                    props.data.isMainH1 ?
                    <h2 className="productInfo-benefits-title">
                        {props.data.labelBenefits}
                    </h2>
                    :
                    <h3 className="productInfo-benefits-title">
                        {props.data.labelBenefits}
                    </h3>
                }
                <ul className="productInfo-benefits-boxes">
                    {
                        product.principalBenefits.map((benefit, index) => (
                            <ScrollAnimation animation={props.data.typeAnimationBenefits} pixelsDisplacement={props.data.pixelsAnimationBenefits} duration={props.data.durationAnimationBenefits} delay={delayAnimationBenefits[index]} key={benefit.title + index}>
                                <li className="productInfo-benefits-boxes-box">
                                    {
                                        props.data.isMainH1 ?
                                        <h3 className="productInfo-benefits-boxes-box-title">
                                            {benefit.title}
                                        </h3>
                                        :
                                        <h4 className="productInfo-benefits-boxes-box-title">
                                            {benefit.title}
                                        </h4>
                                    }
                                    <p className="productInfo-benefits-boxes-box-description">
                                        {benefit.description}
                                    </p>
                                </li>
                            </ScrollAnimation>
                        ))
                    }
                </ul>
            </div>
            <ScrollAnimation animation={props.data.typeAnimationDetails} pixelsDisplacement={props.data.durationAnimationDetails} duration={props.data.pixelsAnimationDetails} delay={props.data.delayAnimationDetails}>
                <div className="productInfo-details">
                    {
                        props.data.isMainH1 ?
                        <h2 className="productInfo-details-title">
                            {props.data.labelDetailsProduct + product.nameProduct}
                        </h2>
                        :
                        <h3 className="productInfo-details-title">
                            {props.data.labelDetailsProduct + product.nameProduct}
                        </h3>
                    }
                    <ul className="productInfo-details-items">

                        {product.maximumBrutePower ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelMaximumBrutePower}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.maximumBrutePower + " " + (product.unitymaximumBrutePower ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.weightOnWork ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelWeightOnWork}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.weightOnWork + " " + (product.unityweightOnWork ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.payload ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelPayload}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.payload + " " + (product.unitypayload ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.netPower ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelNetPower}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.netPower + " " + (product.unitynetPower ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.motorModel ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelMotorModel}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.motorModel + " " + (product.unitymotorModel ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.countryProcedence ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelCountryProcedence}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.countryProcedence + " " + (product.unitycountryProcedence ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.bucketCapacities ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelBucketCapacities}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.bucketCapacities + " " + (product.unitybucketCapacities ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.conveyornTurn ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelConveyorTurn}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.conveyornTurn + " " + (product.unityconveyornTurn ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.powerTrain ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelPowerTrain}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.powerTrain + " " + (product.unitypowerTrain ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.loaderCapacity ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelLoaderCapacity}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.loaderCapacity + " " + (product.unityloaderCapacity ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.backhoeBucketCapacity ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelBackhoeBucketCapacity}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.backhoeBucketCapacity + " " + (product.unitybackhoeBucketCapacity ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.moldboardWidth ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelMoldboardWidth}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.moldboardWidth + " " + (product.unitymoldboardWidth ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.vibrationFrequency ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelVibrationFrequency}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.vibrationFrequency + " " + (product.unityvibrationFrequency ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.fuelTankCapacity ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelFuelTankCapacity}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.fuelTankCapacity + " " + (product.unityfuelTankCapacity ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.hydraulicSystemFlow ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelHydraulicSystemFlow}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.hydraulicSystemFlow + " " + (product.unityhydraulicSystemFlow ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.maxDiggingDepth ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelMaxDiggingDepth}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.maxDiggingDepth + " " + (product.unitymaxDiggingDepth ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.maxDiggingReach ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelMaxDiggingReach}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.maxDiggingReach + " " + (product.unitymaxDiggingReach ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.maxDumpHeight ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelMaxDumpHeight}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.maxDumpHeight + " " + (product.unitymaxDumpHeight ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.tearOutForce ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelTearOutForce}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.tearOutForce + " " + (product.unitytearOutForce ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.breakoutForce ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelBreakoutForce}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.breakoutForce + " " + (product.unitybreakoutForce ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.tippingLoad ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelTippingLoad}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.tippingLoad + " " + (product.unitytippingLoad ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.travelSpeed ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelTravelSpeed}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.travelSpeed + " " + (product.unitytravelSpeed ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.groundPressure ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelGroundPressure}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.groundPressure + " " + (product.unitygroundPressure ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.turningRadius ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelTurningRadius}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.turningRadius + " " + (product.unityturningRadius ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.drawbarPull ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelDrawbarPull}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.drawbarPull + " " + (product.unitydrawbarPull ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.bladeCapacity ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelBladeCapacity}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.bladeCapacity + " " + (product.unitybladeCapacity ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.drumWidth ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelDrumWidth}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.drumWidth + " " + (product.unitydrumWidth ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.staticLinearLoad ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelStaticLinearLoad}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.staticLinearLoad + " " + (product.unitystaticLinearLoad ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.amplitude ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelAmplitude}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.amplitude + " " + (product.unityamplitude ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.emissionStandard ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelEmissionStandard}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.emissionStandard + " " + (product.unityemissionStandard ?? "")}
                                </p>
                            </li>
                        : ""}
                        {product.transmissionType ?
                            <li className="productInfo-details-items-item">
                                <p className="productInfo-details-items-item-label">{props.data.labelTransmissionType}</p>
                                <p className="productInfo-details-items-item-detail">
                                    {product.transmissionType + " " + (product.unitytransmissionType ?? "")}
                                </p>
                            </li>
                        : ""}
                    </ul>
                </div>
            </ScrollAnimation>
        </section>
    )
}
export default ProductInfo;