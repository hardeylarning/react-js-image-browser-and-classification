import React, { useState, useLayoutEffect, useEffect } from 'react'
import Image from './image';
import useFetchImage from '../utils/hooks/useFetchImage';
import useScroll from '../utils/hooks/useScroll';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import useDebounce from '../utils/hooks/useDebounce';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';


export default function Images() {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState(null)
    const [images, setImages, errors, isLoading]= useFetchImage(page, searchTerm);
    const [counter, setCounter] = useState(0)
    

    const [showPreview, setShowPreview] = useState(false)
    function ShowImage(){
        return (
            <AnimateSharedLayout>
                <InfiniteScroll 
                    dataLength={images.length}
                    next={() => setPage(page + 1)}
                    hasMore={true}
                    className="flex flex-wrap">
                    {
                        images.map((image, index) => (
                            <motion.div className="w-1/6 mb-3 p-0 border flex justify-center"
                                key = {index}
                                layoutId={image.urls.regular}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}>
                                <Image 
                                show= {() => setShowPreview(image.urls.regular)}
                                image = {image.urls.regular} 
                                handleRemove = {handleRemove} 
                                index = {index} 
                                 />
                            </motion.div>    
                            ))
                    }

                </InfiniteScroll>

                <AnimatePresence>
                    {
                        showPreview && (
                        <motion.section
                            layoutId={showPreview}
                            exit={{opacity:0, rotate:360, transition: {duration: 1.5}}}
                            className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-40" 
                            onClick={() => setShowPreview(false)}>
                                <div className="bg-white">
                                    <img  src={showPreview} className="rounded-xl"  width="300"   />
                                </div>
                        </motion.section>)
                    }
                </AnimatePresence>
            </AnimateSharedLayout>
        ) 
        
        
    }

    function handleRemove(index) {

        setImages([...images.slice(0, index),
        ...images.slice(index + 1, images.length)])
    }

    // function handleAdd () {
    //   //  let tempImage = "./src/images/top_learner.png"

    //   if (newImageUrl !== "") {
    //     setImages([...images, newImageUrl])

    //     setNewImageUrl("")
    //   }
    // }

    // function handleChange (e) {
    //     setNewImageUrl(e.target.value);
    // }

    // const inputRef = useRef(null);
    //const varRef = useRef(images.length);
    

    // useEffect(() => {
    //     inputRef.current.focus();
    //     console.log(process.env);
    //    //todo
    // }, [])
    useLayoutEffect(() => {
        setCounter(images.length);
    })

    const debounce = useDebounce();

    function handleInput(e) {
        //console.log(e.target.value);
        const text = e.target.value;
        debounce(() => setSearchTerm(text));
        
        
    }

    return  (
        <section>
            <div className="my-5">
                <input type="text" onChange={handleInput} 
                className="w-full border rounded-md shadow-md p-2" 
                placeholder="Search Photos Here" />
            </div>
            {
                errors.length > 0 && (
                    <div className="flex h-screen">
                        <p className="m-auto">{errors[0]}</p>
                    </div>
                ) 
            }
            <h1>{counter} Images</h1>
                <ShowImage />

            { isLoading && <Loading />}
            {/* {
                errors.length > 0 ? null : (
                    <div>
                        <button className="bg-blue-600 p-2 rounded-md text-white" 
                        onClick={() => setPage(page + 1)}>
                            Load More</button>
                    </div>
                )
            } */}
                {/* <div className="flex mt-5 w-full">
                    <input ref={inputRef} type="text" id="inputBox" value={newImageUrl} onChange={handleChange} className="p-2 border w-full mr-2 border-gray-600 shadow-md rounded" />
                    <button onClick={handleAdd} disabled={newImageUrl === ""} className={`p-2 text-white rounded ${
                        newImageUrl !== "" ? "bg-green-600" : "bg-green-200"
                    }`}>Add New</button>
                </div>  */}
            
        </section>
        
    )
}


// export default class Images extends Component {
//     constructor(props){
//         super(props);
//         this.state = {interval: null}
//     }
//     componentDidMount(){
//         this.setState({
//             interval: setInterval(() =>{
//             console.log("Hello")
//         }, 1000)}) 
//     }
//     componentWillUnmount(){
//         console.log('Image Component Unmounted')
//         clearInterval(this.state.interval)
//     }

//     render() {
//         return (
//             <img src="./images/top_learner.png" />
//         );
//     }
// }
