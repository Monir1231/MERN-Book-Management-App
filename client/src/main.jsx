import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import EditBook from "./pages/editBook/EditBook.jsx";
import BookDetils from "./pages/bookDetils/BookDetils.jsx";
import AddBooks from "./pages/addBook/AddBooks.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
       <Route path="/" element={<App/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/books" element={<Shop />} />
         <Route path="/books/:id" element={<BookDetils />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/add" element={<AddBooks />} /> 
       </Route>
      
    </Routes>
  </BrowserRouter>,

)
