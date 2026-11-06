

const CategoriesNav = ({categories,activeCategory,onCategoryChange}) => {
  return (
    <div className=' p-4'>
     <nav className='flex items-center flex-wrap space-x-8 overflow-x-hidden'>
       {categories.map((categorie)=>(
       
        <button onClick={() => onCategoryChange(categorie)} key={categorie} className={`whitespace-nowrap cursor-pointer py-2 px-1 border-b-2 text-sm font-medium transition-colors ${categorie === activeCategory ? ' border-amber-500 text-amber-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{categorie}</button>
      ))}
     </nav>
    </div>
  )
}

export default CategoriesNav