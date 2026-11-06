import { Outlet } from "react-router";
import Navbar from "./componentes/Navbar";
import { BookProvder } from "./context/Bookcontext";

function App() {
  return (
    <>
      <BookProvder>
        <Navbar />
        <main className=" min-h-[calc(100vh-100px)] mt-16">
          <Outlet />
        </main>
        <footer />
      </BookProvder>
    </>
  );
}

export default App;
