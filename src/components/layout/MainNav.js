import { Link } from "react-router-dom";
import classes from "./Layout.module.css";
const MainNav = () => {
  return (
    <nav className={classes.nav}>
      <Link className={classes.link} to="/">
        Home
      </Link>
      <Link className={classes.link} to="/task-tracker">
        Task Tracker
      </Link>
    </nav>
  );
};
export default MainNav;
