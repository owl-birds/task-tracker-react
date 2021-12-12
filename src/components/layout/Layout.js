import MainNav from "./MainNav";
import classes from "./Layout.module.css";
const Layout = (props) => {
  return (
    <>
      <header className={classes.header}>
        <MainNav />
      </header>
      <main className={classes.main}>{props.children}</main>
    </>
  );
};
export default Layout;
