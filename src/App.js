import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AllRoute from './Component/AllRoutes/AllRoute';
import Header from './Component/Header/Header';
import { useEffect } from 'react';
import { loadUser } from './Redux/AuthReducer/action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(window.performance.navigation.type===1){
      dispatch(loadUser())
    }
  },[])



  const isAuth = useSelector((state) => state.authReducer.isAuth);
  console.log(isAuth);

  return (
    <div className="App">
      {isAuth && <Header />} 
      <AllRoute/>
    </div>
  );
}

export default App;
