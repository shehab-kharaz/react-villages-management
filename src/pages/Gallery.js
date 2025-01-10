import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_IMAGES, ADD_IMAGE } from "../queries/villageQueries";
import { uploadImageToCloudinary } from "../services/cloudinaryService"
import "../styles/gallery.css";

function Gallery() {
  const { loading, error, data } = useQuery(GET_IMAGES);
  const [addImage] = useMutation(ADD_IMAGE);

  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleImageSubmit = async () => {
    try {
      if (!imageUrl || !description) {
        alert("Please provide image and description.");
        return;
      }

      const cloudinaryUrl = await uploadImageToCloudinary(imageUrl);
      await addImage({
        variables: {
          url: cloudinaryUrl,
          description: description,
        },
      });

      setImageUrl('');
      setDescription('');
    } catch (error) {
      console.error("Error adding image:", error.message);
    }
  };

  return (
    <main>
      <button 
        id="add-image-btn" 
        onClick={() => document.getElementById("image-upload").click()}
      >
        Add New Image
      </button>
      <input
        type="file"
        id="image-upload"
        style={{ display: "none" }}
        onChange={e => {
          const file = e.target.files[0];
          setImageUrl(file);  
        }}
      />
      
      {imageUrl && (
        <div>
          <input
            type="text"
            value={description}
            placeholder="Enter Image Description"
            onChange={e => setDescription(e.target.value)}
          />
          <button onClick={handleImageSubmit}>Submit Image</button>
        </div>
      )}

      <div className="gallery-container">
        {data.images.map(image => (
          <figure key={image.id} className="image-figure">
            <img src={image.url} alt="gallery item" />
            <figcaption>{image.description || "No description available"}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}

export default Gallery;
