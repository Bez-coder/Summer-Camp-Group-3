import { usePost } from "../context/PostContext";
import Seller_nav from "../Components/seller_nav";

function Post2() {
  const { post, setPost } = usePost();

  const handleSubmit = () => {
    console.log("Submitting post:", post);
    // Later: send to backend or Firebase
    alert("Post submitted!");
  };

  return (
    <>
    <Seller_nav/>
    <div className="max-w-2xl mx-auto p-8 bg-gray-100 shadow rounded-lg space-y-8">
      <div>
        <label className="block  mb-1 font-bold">Title*</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Type"
          className="border p-2 rounded"
          value={post.type}
          onChange={(e) => setPost({ ...post, type: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={post.condition}
          onChange={(e) => setPost({ ...post, condition: e.target.value })}
        >
          <option value="">Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <input
          type="text"
          placeholder="Color"
          className="border p-2 rounded"
          value={post.color}
          onChange={(e) => setPost({ ...post, color: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={post.madeInEthiopia}
          onChange={(e) => setPost({ ...post, madeInEthiopia: e.target.checked })}
        />
        <label className="font-bold">Made in Ethiopia</label>
      </div>

      <textarea
        className="w-full border p-2 rounded"
        rows={4}
        placeholder="Description"
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={post.price}
          onChange={(e) => setPost({ ...post, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Bulk Price"
          className="border p-2 rounded"
          value={post.bulkPrice}
          onChange={(e) => setPost({ ...post, bulkPrice: e.target.value })}
        />
      </div>

      <select
        className="w-full border p-2 rounded"
        value={post.negotiable}
        onChange={(e) => setPost({ ...post, negotiable: e.target.value })}
      >
        <option value="">Negotiable?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Phone"
          className="border p-2 rounded"
          value={post.phone}
          onChange={(e) => setPost({ ...post, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={post.name}
          onChange={(e) => setPost({ ...post, name: e.target.value })}
        />
      </div>

      <input
        type="text"
        placeholder="Delivery Options"
        className="w-full border p-2 rounded"
        value={post.delivery}
        onChange={(e) => setPost({ ...post, delivery: e.target.value })}
      />

      <select
        className="w-full border p-2 rounded"
        value={post.promotion}
        onChange={(e) => setPost({ ...post, promotion: e.target.value })}
      >
        <option value="none">No Promo (Free)</option>
        <option value="top7">TOP - 7 Days (ETB 330)</option>
        <option value="top30">TOP - 30 Days (ETB 330)</option>
                <option value="boost">Boost Premium - 1 Month (ETB 2020)</option>
      </select>

      {/* Submit Button */}
      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-700"
        onClick={handleSubmit}
      >
        Submit Ad
      </button>
    </div>
    </>
  );
}

export default Post2;
