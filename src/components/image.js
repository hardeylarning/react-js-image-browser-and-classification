import React, {useState, useRef} from 'react'

import PropTypes from 'prop-types';
import useTfImgClassify from '../utils/hooks/useTfImgClassify';

 function Image({index, image, handleRemove, show}) {
    const [isHovering, setIsHovering] = useState(false)
    const imageReference = useRef()
    const [predict, predictionsResult, setPredictionsResult, isLoading] = useTfImgClassify()

    

    function crossClass() {
        return `absolute bg-dark right-0 ${isHovering ? "" : "hidden"} cursor-pointer opacity-25 hover:opacity-100`;
    }
    function crossPredict() {
        return `absolute bg-dark left-0 ${isHovering ? "" : "hidden"} cursor-pointer opacity-25 hover:opacity-100`;
    }
    return (
        <div className="flex">
            
            <div onMouseEnter = {() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)} 
            className="relative flex" 
            key={index}>
                {
                    (predictionsResult.length > 0 || isLoading) && (
                        <span className="absolute bg-gray-800 text-white rounded-lg left-0 ml-5 shadow-md px-2"
                        onClick={() => setPredictionsResult([])}>
                            {
                                isLoading && <p>Please wait...</p>
                            }
                            {
                            predictionsResult.map((prediction) => (
                                <div className='flex justify-between'>
                                    <p>{prediction.className}</p>
                                    <p>{Math.floor(prediction.probability * 100)}%</p>
                                </div>
                                ) )}</span>
                    )
                }
            <span className={crossPredict()} 
            onClick={() => predict(imageReference.current) } >&reg;</span>
            <span className={crossClass()} 
            onClick={() => handleRemove(index)}>&times;</span>
            <img onClick={show} src={image} ref={imageReference}  width="100%" crossOrigin="anonymous"  />
                        
            </div>

        
        </div>  
    )
}

Image.propTypes = {
    show: PropTypes.func,
    index: PropTypes.number,
    image: PropTypes.string,
    handleRemove: PropTypes.func
}


export default Image;
