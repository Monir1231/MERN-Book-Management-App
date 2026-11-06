import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Pagination = ({totalpages, currentPage,onPageChange}) => {

  const getpageNumber = ()=>{
    const pages = []
    if(totalpages <= 7){
      for(let i =1 ; i <= totalpages;i ++){
        pages.push(i)
      }
    }
    return pages
    
  }


  return (
    <div className=" flex items-center justify-center space-x-2 mt-8">
      <button onClick={()=>onPageChange(currentPage-1)} disabled={currentPage === 1} className=" px-3 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-300"><FaChevronLeft/></button>
        { getpageNumber().map((page,index)=>(
           <button onClick={()=> onPageChange(page)} className={`px-4 py-1 rounded-lg border ${currentPage === page ? 'bg-amber-500 text-white border-amber-500' : ' border-gray-500 text-gray-700 hover:bg-gray-100'} `} key={index}>{page}</button>
        ))}
        <button onClick={()=>onPageChange(currentPage + 1)} disabled={currentPage === totalpages} className="px-3 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-300"><FaChevronRight/></button>
    </div>
  )
}

export default Pagination