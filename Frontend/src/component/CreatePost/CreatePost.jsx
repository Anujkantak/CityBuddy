import { useState } from "react";
import "./CreatePost.css";

import { useDispatch } from "react-redux";
import { createPost } from "../../store/slices/postSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [facility1, setFacility1] = useState("");
  const [facility2, setFacility2] = useState("");
  const [facility3, setFacility3] = useState("");
  const [images, setImages] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  const dispatch = useDispatch();
  const formHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);

    // Append facilities as array
    const facilities = [facility1, facility2, facility3].filter(Boolean); // remove empty ones
    facilities.forEach((f, i) => formData.append(`facilities[${i}]`, f));

    // Append address fields
    formData.append("street", street);
    formData.append("city", city);
    formData.append("pincode", pincode);
    formData.append("state", state);

    // Append multiple images
    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(createPost(formData));
  };

  return (
    <>
      <div className="create-container">
        <h1>Create Post</h1>
        <div className="createpost-input">
          <form className="form" onSubmit={formHandler}>
            <label for="title" className="kuch">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label for="category">Category</label>
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <label for="facility1">Facility 1</label>
            <input
              type="text"
              id="facility1"
              placeholder="Enter facility 1"
              value={facility1}
              onChange={(e) => setFacility1(e.target.value)}
            />

            <label for="facilities2">Facility 2</label>
            <input
              type="text"
              id="facilities2"
              placeholder="Enter facility 2"
              value={facility2}
              onChange={(e) => setFacility2(e.target.value)}
            />

            <label for="facilities3">Facility 3</label>
            <input
              type="text"
              id="facilities3"
              placeholder="Enter facility 3"
              value={facility3}
              onChange={(e) => setFacility3(e.target.value)}
            />

            <label for="street">street</label>
            <input
              type="text"
              id="street"
              placeholder="Enter street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />

            <label for="city">city</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <label for="pincode">pincode</label>
            <input
              type="number"
              id="pincode"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />

            <label for="state">state</label>
            <input
              type="text"
              id="state"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />

            <label for="image1">Image 1</label>
            <input
              type="file"
              id="image1"
              onChange={(e) => setImages([...images, e.target.files[0]])}
              placeholder="Image 1"
            />

            <label for="image2">Image 1</label>
            <input
              type="file"
              id="image2"
              onChange={(e) => setImages([...images, e.target.files[0]])}
              placeholder="Image 2"
            />

            <label for="image3">Image 1</label>
            <input
              type="file"
              id="image3"
              onChange={(e) => setImages([...images, e.target.files[0]])}
              placeholder="Image 3"
            />

            <label for="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <button>Upload</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
