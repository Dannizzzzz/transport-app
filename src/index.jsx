import ReactDom from "react-dom/client";
import AntdConfig from "./layouts/AntdConfig";
import RouterConfig from "./routes/RouterConfig";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<AntdConfig><RouterConfig /></AntdConfig>)