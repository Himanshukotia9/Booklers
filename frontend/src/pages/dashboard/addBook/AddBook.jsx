// AddBook.jsx
import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useAddBookMutation } from '../../../redux/features/books/booksApi'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../../firebase/firebase.config'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function AddBook() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddBookMutation()
    const [imageFileName, setImageFileName] = useState('')
    const [existingImagePath, setExistingImagePath] = useState('');
    
    const onSubmit = async (data) => {
 
        const newBookData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your book is uploaded successfully!",
                showConfirmButton: false,
                timer: 1000
              });
            reset();
            setImageFileName('')
            setImageFile(null);
            setExistingImagePath('');
            setTimeout(() => {
                navigate('/dashboard/manage-books')
            }, 1000);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.")   
        }
      
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setImageFile(file);

        try {
          if (existingImagePath) {
            const oldImageRef = ref(storage, existingImagePath);
            await deleteObject(oldImageRef);
          }
          const storageRef = ref(storage, `images/books/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          setImageFileName(downloadUrl);
          setExistingImagePath(`images/books/${file.name}`);
        } catch (error) {
          console.error("Error uploading image:", error);
            alert("Image upload failed. Please try again.");
        }
    }

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
}
