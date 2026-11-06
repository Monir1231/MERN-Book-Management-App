import { useEffect } from "react"
import { useBooks } from "../../context/Bookcontext"
import BookGrid from "./BookGrid"
import CategoriesNav from "./CategoriesNav"
import SortBooks from "./SortBooks"
import Pagination from "./Pagination"
import { baseUrl } from "../../utils/baseUrl"
import axios from "axios"



const Shop = () => {
    const { books, currentBook, isLoading, error,filters,pagination,fatchBooks,clearCurrentBooks,updateFilters } = useBooks()

    const handleDelete = async (id) =>{
      try {
        console.log("book delete",id)
        await axios.delete(`${baseUrl}/books/${id}`) 
       alert("book delete succedful")
       fatchBooks()
      } catch (error) {
        console.log("error deleting book",error)
      }
    }

    useEffect(()=>{
       fatchBooks()
    },[filters,fatchBooks])

    const handleCategoryChange = (category)=>{
      updateFilters({
        genre:category === "All Collections"?'' : category,
        page:1
      })
    }

    const handlePageChange = (newPage) =>{
      updateFilters({
        page:newPage
      })
    }

    const handleSortChange = (sortconfig) =>{
    updateFilters({
       sortBy: sortconfig.sortBy,
       order: sortconfig.order,
       page:1
    })
    }

        const categories = [
        'All Collections',
        'Fiction',
        'Adventure',
        'Romance',
        'Dystopian',
        'Historical',
        'Non-Fiction',
      ];
 console.log(pagination)
  return (
    <div className=" container mx-auto px-4 py-12 min-h-screen ">
   
    <div className=" flex justify-between items-center flex-wrap border-b border-gray-200 pb-4">
       <CategoriesNav categories={categories}
        activeCategory={filters.genre || "All Collections"}
        onCategoryChange={handleCategoryChange}
       />
       <div className=" p-4 flex justify-end">
        <SortBooks CurrentSort={{
       sortBy: filters.sortBy,
       order: filters.order,
        }}
          onSortChange={handleSortChange}
        />
       </div>
    </div>

    {/* result summary */}
    <div className="py-3 text-gray-600 px-4">Showing {pagination.totalBooks >0 ? (pagination.currentPage -1) * filters.limit + 1 : 0}-<span>{Math.min(pagination.currentPage * filters.limit,pagination.totalBooks)}</span> of {pagination.totalBooks} books
    </div>
    {/* card  */}
     <div className=" ">
      <BookGrid books={books} isLoading={isLoading} error={error} onDeleteBook={handleDelete}/>
     </div>
     
     {/* pagination */}

     <div>
      {pagination.totalpages > 1 && (<Pagination
        totalpages={pagination.totalpages}
        currentPage={pagination.currentPage}
        onPageChange={handlePageChange}
      />)}

     </div>
     
    </div>
  )
}

export default Shop