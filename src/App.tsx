import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';


const Shop = () => {
  return (
    <div>
      <div>
        <h1>I am the shop bar</h1>
      </div>
    </div>
  );
}

const App = () => {


  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} /> {/* shorthand for index=true, stating that it matches the path '/', index route  */}
          <Route path='shop' element={<Shop />} />
          <Route path='sign-in' element={<SignIn />} />
        </Route>
      </Routes>
    </>
  )
};

export default App;

