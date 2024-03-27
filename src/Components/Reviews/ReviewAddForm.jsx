import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const ReviewAddForm = ({username, reviews, setReviews}) => {
  const { teapot_id } = useParams()
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const URL = import.meta.env.VITE_BASE_URL;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
  const day = currentDate.getDate();
  // console.log(`${year}-${month}-${day}`);


  const [newReview, setNewReview] = useState({
    content: '',
    rating: '',
    user_id: user.id,
    created_at: `${year}-${month}-${day}`,
  })


  const handleSubmit = (event) => {
    event.preventDefault()
  
    const csrfToken = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN=")).split("=")[1]; 
    if(newReview.content.length > 0 && newReview.rating.length > 0) {
      fetch(`${URL}/api/teapots/${teapot_id}/reviews`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          "CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(newReview),
      })
      .then((res) => res.json())
      .then((data) => {
        setReviews([data, ...reviews])
      })
      .then(() => navigate(`/teapots/${teapot_id}`))
      .catch((error) => console.error('catch', error))
    } else {
      alert(`Invalid Inputs`)
      navigate(`/teapots/${teapot_id}`)
    }

    }
    const handleTextChange = (event) => {
      setNewReview({
        ...newReview,
        [event.target.id]: event.target.value,
      })
    }
  return (
    
    <div>
    {/* {children} */}
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Review:</label>
        <textarea
          id="content"
          type="text"
          name="content"
          value={newReview.content}
          placeholder="What do you think..."
          onChange={handleTextChange}
          required
        />
      </div>

      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          name="rating"
          min="1"
          max="5"
          step="1"
          value={newReview.rating}
          onChange={handleTextChange}
          required
        />
      </div>
      <br />
      <input type="submit" />
    </form>
    <Link to={`/teapots/${teapot_id}`}>Cancel</Link>
  </div>
  
  )
}

export default ReviewAddForm;