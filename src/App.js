
import React, {useState, useEffect} from 'react';
import './styles/index.css';
// import Images from './components/Images';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import routes from './utils/routes/index';
import Header from './components/Header';
import firebase from "./config/firebase"
import Context from './context/AppContext';
import AuthRoute from './utils/routes/AuthRoute';
import GuestRoute from './utils/routes/GuestRoute';
import Loading from './components/Loading';
import NotFound from './page/404';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedRoute from './utils/routes/AnimatedRoute';


function App(){

    
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    

    useEffect(() => {
        setIsLoading(true)
        firebase.auth().onAuthStateChanged(
            user => {
                if(user){
                    setIsLoggedIn(true)
                    setUser(user)
                }

                else {

                    setUser({})
                    setIsLoggedIn(false)
                    setIsLoading(false)
                }
               // console.log(user);
            })
    }, [])

    // if (isLoading)  return <Loading />
    

    return (
           <Context.Provider value={[isLoggedIn, user]}>
            <Header />
            <AnimatePresence exitBeforeEnter initial={false}>
            <Switch key={location.pathname}>
                {
                    routes.map((route, index) => { 
                        if (route.protected === 'guest') {
                            // if (isLoggedIn) {
                            //     return <Redirect to='/' />
                            // }

                            return (
                                <GuestRoute 
                                key={index}
                                path={route.path}
                                exact={route.exact} >
                                    <route.component />
                                </GuestRoute>
                                )
                            
                        }
                        if (route.protected === 'auth') {
                            return (
                                <AuthRoute 
                                key={index}
                                path={route.path}
                                exact={route.exact}>

                                    <route.component />

                                </AuthRoute>
                                )
                            
                        }

                            return (
                            <AnimatedRoute 
                            key={index}
                            path={route.path}
                            exact={route.exact} >
                                    <route.component />
                                {/* <motion.div initial={{ x:200}} animate={{ x:0}}>    
                                </motion.div> */}

                            </AnimatedRoute>
                            )
                        
                    })
                } 
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            </AnimatePresence>
           </Context.Provider>
    )
}

// class App extends React.Component{
//     // constructor(datas){
//     //     console.log('App Constructor')
//     //     super(datas);

//     //     this.state = {detail: "Hello React from the State", isShowing: false};
//     // }

//     componentDidUpdate(){
//         console.log("App Updated")
//     }
//     // handleClick = () => {
//     //     this.setState({isShowing: !this.state.isShowing})
//     // }

//     // render(){
//     //     console.log('App Render')
//     //     return( <section className="flex justify-center">
//     //         <div className="w-1/2">
//     //             <div className="text-center">
//     //                 <div className="my-4">{this.state.detail}</div>
//     //                 <button className="p-1 bg-blue-700 my-2 text-white" 
//     //                 onClick = {this.handleClick }>Toggle Image</button>
//     //             </div>
//     //             {
//     //                 this.state.isShowing ? <Images /> : null
//     //             }
                
//     //         </div>
//     //     </section> );
//     // }
// }

export default App;