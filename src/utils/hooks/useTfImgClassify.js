import React, { useState } from 'react'

import '@tensorflow/tfjs'
import * as mobilenet from "@tensorflow-models/mobilenet"

export default function useTfImgClassify() {

    const [isLoading, setisLoading] = useState(false)
    const [predictionsResult, setPredictionsResult] = useState([])
    
    function predict (image) {
       // const image = imageReference.current;

        setisLoading(true)

        mobilenet.load().then((model) => {
            // classify the image

            model.classify(image).then((predictions) => {
                setPredictionsResult(predictions)
                // console.log("Predictions: ");
                // console.log(predictions);
                setisLoading(false)
            })
        })
    }

    return [predict, predictionsResult, setPredictionsResult, isLoading];
}
