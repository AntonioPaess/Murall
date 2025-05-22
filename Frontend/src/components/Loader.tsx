import React from 'react'

const LoaderMurall = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        </div>
    )
}

export default LoaderMurall