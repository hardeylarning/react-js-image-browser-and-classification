
import React from 'react'
import { motion } from 'framer-motion'

export default function Home() {
    return (
        <div className="flex h-screen">
            <motion.h1 
            // initial={{opacity: 0, y: -400}}
            // animate={{scale: 1.5, y: 0, opacity:1, 
            //     transition: {duration:1.5},
            //     rotate: 360}}

            className="m-auto text-3xl"> Welcome Home</motion.h1>
        </div>
    )
}
