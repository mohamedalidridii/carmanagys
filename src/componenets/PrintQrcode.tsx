"use client"
import React from 'react';


const PrintQrcode = () => {
    const handlePrint = () => {
        window.print();
    };

    return (<>
        <button onClick={handlePrint}>Imprimer</button>
    </>
    );
};

export default PrintQrcode;