import "../styles/gallery.css"

function Gallery(){
  return(
    <main>
      <button id="add-image-btn">Add New Image</button>
      <div className="gallery-container"></div>
      <input type="file" id="image-upload" style={{ display: 'none' }}></input>
    </main>
  )
}

export default Gallery;