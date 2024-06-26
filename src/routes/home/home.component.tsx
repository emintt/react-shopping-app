import { Outlet } from "react-router-dom";
import CategoryMenu from "../../components/category-menu/category-menu.component";

const Home = () => {

  return (
    <>
      <CategoryMenu />
      <Outlet />
    </>
  )
};

export default Home;
