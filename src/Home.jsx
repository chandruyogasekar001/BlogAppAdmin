import Admin from "./Admin";
import BlogAdmin from "./BlogAdmin";
import Login from "./Login";

export default function Home({setTab}){
    const handleLogin = () => {
        setTab(false);
      };
    return(
      <>
      <button onClick={handleLogin}>Logout</button>
      <Admin></Admin>
      <BlogAdmin></BlogAdmin>
      </>
    );
}