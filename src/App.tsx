import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils';
import { User } from 'firebase/auth';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';



const App = () => {
  // dispatch actions to root reducers, pass actions to every reducer
  // it never changes
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      if (user) {
        dispatch(setCurrentUser(user));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} /> {/* shorthand for index=true, stating that it matches the path '/', index route  */}
          <Route path='shop/*' element={<Shop />} />  {/* /* means thatwe have route that set up for that component */}
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  )
};

export default App;

