import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const WebsiteContext = createContext();

// Create Provider Component
export function WebsiteProvider({ children }) {
  const [logo, setLogo] = useState("Logo");
  const [about, setAbout] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);
  const[aboutus,setAboutus]=useState("")
  const[dblogo,setDblogo]=useState("")
  const [carousel, setCarousel] = useState([]);

  console.log("context", logo);

  const updateAboutus = async (aboutus) => {
    console.log("adminupdated data", aboutus);
    const res = await axios.post("http://localhost:5000/update", { aboutus });
    console.log("About us updated");
    if (res.status === 200) {
      console.log("About us updated");
    }

  }
  const updateLogo = async (logoFile) => {
    try {
      if (!logoFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("logo", logoFile); // Key should match the backend `req.file` field

      const res = await axios.post("http://localhost:5000/logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      console.log("res", res);
      if (res.status === 200) {
        console.log("Logo updated successfully:", res.data);
      }
    } catch (error) {
      console.error("Error updating logo:", error);
    }
  };


  const uploadCarousel = async () => {
    if (carouselImages.length < 4 || carouselImages.includes(undefined)) {
      alert("Please select all 4 images.");
      return;
    }

    const formData = new FormData();
    carouselImages.forEach(file => formData.append("carousel", file));

    try {
      const res = await axios.post("http://localhost:5000/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Carousel updated successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  //fetch last recordd
   const fetchLastRecord = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lastrecord");
      const data = await response.data;
      console.log("lastrecord", data)
      if (response.status === 200) {
        setAboutus(data.description);
        console.log("description", data.description); 

        console.log("Last record fetched successfully:", data);
      }
      return data;
    } catch (error) {
      console.error("Error fetching last record:", error);
    }
  }

  const fetchLastLogo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fetchLogo", {
        responseType: "blob", // Fetch as binary image
      });

      console.log("Full Response:", response);
      console.log("Blob size received:", response.data.size);

      if (response.status === 200 && response.data.size > 0) {
        const imageUrl = URL.createObjectURL(response.data);
        setDblogo(imageUrl);
      } else {
        console.error("Received invalid image data.");
      }
    } catch (error) {
      console.error("Error fetching last logo:", error);
    }
  };

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fetchCarouselImages");
      console.log("response carousel", response);
  
      if (response.status === 200) {
        const imageArray = JSON.parse(response.data.image); // Parse JSON string
        console.log("array carousel",imageArray)
        setCarousel(imageArray);
      } else {
        console.error("Error fetching carousel images");
      }
    } catch (error) {
      console.error("Error fetching carousel images", error);
    }
  };

    // const fetchCarouselImages = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/fetchCarouselImages");
    //     console.log("response carousel", response);
    
    //     if (response.status === 200) {
    //       const imageArray = JSON.parse(response.data.image); // Parse JSON string
    //       console.log("array carousel", imageArray);
    
    //       // Check image size using Blob
    //       const imagesWithSize = await Promise.all(
    //         imageArray.map(async (src) => {
    //           try {
    //             const imageResponse = await fetch(src); // Fetch full image
    //             const blob = await imageResponse.blob(); // Convert to Blob
    //             const size = blob.size; // Get size in bytes
    //             return { src, size };
    //           } catch (error) {
    //             console.error("Error fetching image size:", error);
    //             return { src, size: "Unknown" };
    //           }
    //         })
    //       );
  
  //       console.log("Image sizes:", imagesWithSize);
  //       setCarousel(imageArray);
  //     } else {
  //       console.error("Error fetching carousel images");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching carousel images", error);
  //   }
  // };
  



  return (
    <WebsiteContext.Provider value={{ logo, setLogo, about, setAbout, updateAboutus, updateLogo, setCarouselImages, uploadCarousel,fetchLastRecord,aboutus,fetchLastLogo,dblogo,carousel,fetchCarouselImages }}>
      {children}
    </WebsiteContext.Provider>
  );
}

// Export Context
export default WebsiteContext;
