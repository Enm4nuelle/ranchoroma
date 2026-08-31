"use client";

import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';

const buildSlides = (imgs, itemsPerSlide) => {
    return imgs.map((_, index) => {
        let group = [];
        for (let i = 0; i < itemsPerSlide; i++) {
            group.push(imgs[(index + i) % imgs.length]);
        }
        return group;
    });
};

export const Carrousel = (props) => {
    // Estado inicial calculado desde props (sin tocar window), así el primer
    // render (y el HTML prerrenderizado) ya trae las imágenes reales, no un carrusel vacío.
    const [numItemsOnSlide, setNumItemsOnSlide] = useState(3);
    const [slides, setSlides] = useState(() => buildSlides(props.data.imgs, 3));

    const detectScrollClients = () => {
        let startWidthWindow = window.innerWidth;
        let itemsPerSlide = startWidthWindow < 661 ? 1 : startWidthWindow < 1025 ? 2 : 3;
        setNumItemsOnSlide(itemsPerSlide);
        setSlides(buildSlides(props.data.imgs, itemsPerSlide));
    };

    useEffect(() => {
        detectScrollClients(); // ajusta al tamaño real apenas monta en cliente
        window.addEventListener("resize", detectScrollClients);
        return () => {
            window.removeEventListener("resize", detectScrollClients);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={"carrousel"} aria-label={props.data.ariaLabel}>
            <Carousel
                fade
                indicators={false}
            >
                {
                    slides.map((slide, slideIndex) => (
                        <Carousel.Item key={slideIndex}>
                            <div className="carrousel-item">
                                {
                                    slide.map((img, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={img.src}
                                            alt={img.title}
                                            className={"carrousel-img carrousel-img-width" + numItemsOnSlide.toString()}
                                            loading="lazy"
                                        />
                                    ))
                                }
                            </div>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </section>
    );
};

export default Carrousel;
