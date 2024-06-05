import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';


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
        </Route>
      </Routes>
    </>
  )
};

export default App;

