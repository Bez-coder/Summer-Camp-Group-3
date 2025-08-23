import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState({
    category: "",
    location: "",
    photos: [],
    video: "",
    title: "",
    type: "",
    condition: "",
    color: "",
    madeInEthiopia: false,
    description: "",
    price: "",
    bulkPrice: "",
    negotiable: "",
    phone: "",
    name: "",
    delivery: "",
    promotion: "none",
  });

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
