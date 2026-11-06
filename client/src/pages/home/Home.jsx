import Hero from "../../componentes/Hero"
import { useBooks } from "../../context/Bookcontext"
import Shop from "../shop/Shop"

const Home = () => {
 
  const {books,currentBook,isLoading,error} = useBooks()
 console.log(books)
  
  return (
    <div>
      <Hero/>
      <Shop/>
    </div>
  )
}

export default Home