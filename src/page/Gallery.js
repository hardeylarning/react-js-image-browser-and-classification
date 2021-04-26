import React from 'react'
import Images from '../components/Images'

export default function Gallery() {
    return (
        <section className="flex justify-center">
            <div className="w-10/12">
                <div className="text-center">
                    <Images />
                {/* <button className="p-1 bg-blue-700 my-2 text-white" 
                onClick = {handleClick }>Toggle Image</button> */}
                </div>
            {/* {
                isShowing ? <Images /> : null
            } */}
            
            </div>
        </section>
    )
}
