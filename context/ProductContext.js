"use client";

import { createContext, useContext, useState } from 'react';

const ProductContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
    const [productInfo, setProductInfo] = useState({ nameProduct: null, urlImg: null });

    return (
        <ProductContext.Provider value={{ productInfo, setProductInfo }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct debe usarse dentro de un ProductProvider');
    }
    return context;
};