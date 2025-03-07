import { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WebsiteContext from "../context/WebsiteContext";
import axios from "axios";

export default function Carousel() {
  const [images, setImages] = useState([]); // Corrected variable name
  const [currentIndex, setCurrentIndex] = useState(0);
  const { fetchCarouselImages, carousel } = useContext(WebsiteContext);

  const imagesDefualt = [
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1c26da03bd93c9f5.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/bd58703899c70c72.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1c26da03bd93c9f5.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/bd58703899c70c72.jpg?q=20",
  ];
  // Fetch images from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/carousel")
      .then((response) => {
        if (response.data && response.data.images.length>0) {
          setImages(response.data.images); // Store fetched images
        }else{
          setImages(imagesDefualt);
        }
      })
      .catch((error) => {
        console.error("Error fetching carousel images:", error);
      });
  }, []);


  useEffect(() => {
    console.log("Carousel images:", images);
  }, [images]); // Logs images when they update

  // Ensure images exist before rendering
  if (images.length === 0) {

    return <p className="text-center">No images available</p>;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mx-auto">
      {/* Ensure images array is not empty before accessing currentIndex */}
      {images.length > 0 && (
        <>
          <img
            src={`http://localhost:5000${images[currentIndex]}`} // Append base URL
            alt="Carousel"
            className="w-full h-50 rounded-lg shadow-md"
          />

          {/* Left Button */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Button */}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute  bottom-2 flex justify-center space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
