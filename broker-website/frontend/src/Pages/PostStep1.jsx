import { useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import Seller_nav from "../Components/seller_nav";

function PostStep1() {
  const navigate = useNavigate();
  const { post, setPost } = usePost();

  const handleNext = () => {
    if (!post.category || !post.location || post.photos.length === 0) {
      alert("Please fill all required fields.");
      return;
    }
    navigate("/post_2");
  };

  return (
    <>
    <Seller_nav/>
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow rounded-lg space-y-8">
      <div>
        <label className="block font-medium mb-1">Category*</label>
        <select
          className="w-full border p-2 rounded"
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="baby_kids">Home & Kitchen</option>
          <option value="electronics"> Car </option>
          <option value="fashion">Mobile & Tech</option>
          <option value="fashion">Services</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Location*</label>
        <select
          className="w-full border p-2 rounded"
          value={post.location}
          onChange={(e) => setPost({ ...post, location: e.target.value })}
        >
          <option value="">Select Location</option>
          <option value="addis_ketema">Addis Ketema</option>
          <option value="bole">Bole</option>
          <option value="lideta">Lideta</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Photos*</label>
        <input
          type="file"
          multiple
          accept=".jpg,.png"
          className="w-full border p-2 rounded"
          onChange={(e) => setPost({ ...post, photos: e.target.files })}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Video Link (optional)</label>
        <input
          type="url"
          className="w-full border p-2 rounded"
          value={post.video}
          onChange={(e) => setPost({ ...post, video: e.target.value })}
        />
      </div>

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  </>
  );
  
}

export default PostStep1;
