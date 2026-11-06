import ShopCard from "./ShopCard"


const BookGrid = ({books,isLoading,error,onDeleteBook}) => {
  if(error) return <div>Error:{error}</div>
  return (
    <div >
      {isLoading ? (<div>Loding...</div>): books.length === 0? (<div>No Books found</div>):(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" >{books.map((book)=>(
         <ShopCard key={book._id} book={book} onDelete={onDeleteBook}/>
        ))}</div>
      )}
    
    </div>
  )
}

export default BookGrid