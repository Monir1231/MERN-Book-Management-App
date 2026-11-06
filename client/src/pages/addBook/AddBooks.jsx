
import { useForm } from "react-hook-form"
import axios from 'axios'

const AddBooks = () => {
    const {register,handleSubmit} = useForm()

     const onSubmit = async(data)=>{
   try {
    const price = parseFloat(data.price)
    data.price = price
     const response = await axios.post(`http://localhost:3000/books`,data)
     console.log(response.data)
     alert("book added succedful")
   } catch (error) {
   alert("book add filed",error)
   }
  }

  return (
     <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-5xl">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            {...register('title')}
            placeholder='Book title'
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            {...register('author')}
             placeholder='Book author'
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Published Year</label>
          <input
            type="number"
            {...register('publishedYear')}
             placeholder='year'
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            {...register('genre')}
             placeholder='genre'
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price')}
             placeholder='price'
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register('description')}
             placeholder='descripation'
             rows={4}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            {...register('imageUrl')}
             placeholder='image'
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default AddBooks