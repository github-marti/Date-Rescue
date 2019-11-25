import React from "react";
// import ReactDOM from "react-dom"
import { useStoreContext } from "../../utils/GlobalState";

function Nav() {
  // const [post] = useStoreContext();
  return (
<ul className="nav nav-tabs">
  <li className="nav-item">
    <a className="nav-link active" href="www.google.com">Create-A-Date</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="www.google.com">View a past date</a>
  </li>

</ul>

  );
}
// useStoreContext.render(<Nav />, document.getElementById("root"))
export default Nav;
