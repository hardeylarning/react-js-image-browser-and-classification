import React, { useRef, useEffect, useState } from 'react'

import useTfImgClassify from '../utils/hooks/useTfImgClassify'

export default function TensorFlow() {

    const imageReference = useRef()    
    const [predict, predictionsResult, setPredictionsResult, isLoading] = useTfImgClassify()

    return (
        <div className="flex justify-center">
        <div className="w-1/3">
            <h1 className="text-2xl text-center mb-1">TensorFlow Example</h1>
            <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjE1Mzd8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNjE5MjU5OTQ4&ixlib=rb-1.2.1&q=80&w=1080" 
            ref={imageReference} width="500"
            crossOrigin='anonymous' alt="" />
            <div className="text-center my-2">
                {predictionsResult.length > 0 && (
                        
                    predictionsResult.map((prediction) => (
                        <div className='flex justify-between'>
                            <p>{prediction.className}</p>
                            <p>{Math.floor(prediction.probability * 100)}%</p>
                        </div>
                        ) )
                        
                )}
            <button className="p-2 rounded text-white bg-gray-900"
            onClick={() => predict(imageReference.current)}>
                {isLoading && "Loading..."}
                {!isLoading && "Predict Result"}
                </button>
            </div>
        </div>
        </div>
    )
}
