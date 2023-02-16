import React, { useState } from "react";

// Passing down the necessary props from the Feed component
const CreatePost = ({setPosts, token}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title,  content: content, photo: photo }),
    });

    if (response.status !== 201) {
      console.log("new post not created")
    } else {
      console.log("new post created")
        let data = await response.json()
        window.localStorage.setItem("token", data.token)
        // Clearing the input form for title and content after submission
        setTitle("")
        setContent("")
        setPhoto("")
        let responseTwo = await fetch("/posts", {
          headers: {
            // token is now the token returned from the fetch request
            Authorization: `Bearer ${data.token}`,
          }
        })
        let dataTwo = await responseTwo.json();
        // As we are using setPosts function/hook to change state, feed is re-rendered
        setPosts(dataTwo.posts)
        window.localStorage.setItem("token", dataTwo.token)
    }
  };

   const handleTitleChange = (event) => {
     setTitle(event.target.value);
   };

  const handlePostChange = (event) => {
    setContent(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value);
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="title">
          Title
        </label>

        <input
          className="form-control"
          placeholder="Title"
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        ></input>

        <label className="form-label" htmlFor="content">
          Content:
        </label>

        <textarea
          className="form-control"
          placeholder="Content"
          id="content"
          name="content"
          type="text"
          rows="3"
          cols="50"
          value={content}
          onChange={handlePostChange}
        ></textarea>

        <label label className="form-label" htmlFor="photo">
          Image:
        </label>

        <input
          className="form-control"
          type="file"
          id="photo"
          name="photo"
          value={photo}
          onChange={handlePhotoChange}
        ></input>

        <button className="btn btn-primary" id="submit" type="submit">
          Create post
        </button>
      </form>
    </div>
  );
};
export default CreatePost;
