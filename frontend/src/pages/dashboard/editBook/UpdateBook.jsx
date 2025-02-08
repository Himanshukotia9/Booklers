// UpdateBook.jsx
import React, { useEffect, useState } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBookByIdQuery } from "../../../redux/features/books/booksApi";
import Loader from "../../../component/Loader";
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from "../../../utils/baseURL";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase/firebase.config";


export default function UpdateBook() {
    
    const {id} = useParams();
    const {data: bookData, isLoading, isError, refetch} = useFetchBookByIdQuery(id)
    const { register, handleSubmit, setValue, reset } = useForm();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileName] = useState("");
    const [oldImageUrl, setOldImageUrl] = useState("");
  

    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('description', bookData.description);
            setValue('category', bookData?.category);
            setValue('trending', bookData.trending);
            setValue('oldPrice', bookData.oldPrice);
            setValue('newPrice', bookData.newPrice);
            setValue('coverImage', bookData.coverImage)
            setOldImageUrl(bookData.coverImage);
        }
    },[bookData, setValue])

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        const storageRef = ref(storage, "images/books/" + file.name);
        // Upload new image
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        setImageFileName(downloadUrl);  
        // Delete old image if exists
        if (oldImageUrl) {
          const oldImageRef = ref(storage, oldImageUrl);
          deleteObject(oldImageRef)
            .then(() => console.log("Old image deleted successfully"))
            .catch((error) => console.error("Error deleting old image:", error));
        }
      }
    };

    const onSubmit = async(data) => {
        const updateBookData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: imageFileName || bookData.coverImage,
        };
        try {
            await axios.put(`${getBaseUrl()}/api/books/edit/${id}`,updateBookData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your book is updated successfully!",
                showConfirmButton: false,
                timer: 1000
            });
            await refetch();
            setTimeout(() => {
                navigate('/dashboard/manage-books');
            }, 2000);
        } catch (error) {
            console.error("Failed to update book");
            alert("Failed to update book");
        }
    }

    if(isLoading) return <Loader/>
    if(isError) return <p>Error fetching book data</p>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          step="0.01"
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          step="0.01"
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {oldImageUrl && (
            <p className="text-sm text-gray-500">
              Current Image: <a href={oldImageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}
