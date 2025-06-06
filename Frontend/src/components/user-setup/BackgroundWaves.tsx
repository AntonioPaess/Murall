'use client';

import Image from 'next/image';
import React from 'react';

const BackgroundWaves: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
                src="/userSetupBackground.png"
                alt="Plano de fundo"
                fill
                className="object-cover opacity-40"
                priority
            />
        </div>
    );
};

export default BackgroundWaves;
