import { Outlet } from "react-router-dom";
import "./index.less";
const BaseLayouts = (props) => {
  return (
    <>
      <h3>BaseLayouts</h3>
      <Outlet></Outlet>
    </>
  );
};
export default BaseLayouts;