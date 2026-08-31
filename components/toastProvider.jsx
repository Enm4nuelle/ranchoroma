"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={false}
            pauseOnHover
            draggable
            theme="dark"
        />
    );
}