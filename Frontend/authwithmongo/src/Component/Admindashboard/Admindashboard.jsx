import React, { useContext, useState } from 'react'
import websiteContext from '../context/WebsiteContext'

function Admindashboard() {
    const { setLogo, setAbout, updateAboutus, updateLogo ,setCarouselImages, uploadCarousel} = useContext(websiteContext)
    const [logo, setNewLogo] = useState("Logo");
    const [about, setNewAbout] = useState("");
    const [newCarouselImages, setNewCarouselImages] = useState([]);

    console.log(logo);
    const handleLogoChange = async (e) => {
        e.preventDefault();
        setLogo(logo)
        await updateLogo(logo);
    };

    const updateAbout = async () => {
        setAbout(about)
        setNewAbout("");
        if(about==null){
            alert("Please enter the about us text")
        }else{
            await updateAboutus(about);
        }
       
    }

    const handleFileChange = (e, index) => {
        const files = [...newCarouselImages]; // Copy existing images
        files[index] = e.target.files[0];  // Update the selected file at index
        setNewCarouselImages(files);
        setCarouselImages(files);
    };
    
    return (
        <div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1: Update Logo */}
                    <div className="bg-white shadow-md p-4 rounded-lg relative">
                        <h3 className="text-lg font-bold mb-2">Update Header Logo</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewLogo(e.target.files[0])}
                            className="border p-2 w-full mb-2"
                        />          <button onClick={handleLogoChange} className="bg-blue-500 text-white px-4 py-2 w-full  rounded-2xl ">Update</button>
                    </div>

                    {/* Card 2: Update Carousel */}
                    <div className="bg-white shadow-md p-4 rounded-lg relative">
                        <h3 className="text-lg font-bold mb-2">Update Carousel Image</h3>
                        {[0, 1, 2, 3].map((index) => (
                            <input
                                key={index}
                                type="file"
                                accept="image/*"
                                className="border p-2 w-full mb-2"
                                onChange={(e) => handleFileChange(e, index)}
                            />
                        ))}

                        <button onClick={uploadCarousel} className="bg-green-500 text-white mt-3 px-4 py-2 w-full rounded-2xl">
                            Update
                        </button> 
                        </div>

                    {/* Card 3: Update About Us */}
                    <div className="bg-white shadow-md p-4 rounded-lg relative">
                        <h3 className="text-lg font-bold mb-2">Update About Us</h3>
                        <textarea placeholder="Update About Us text" value={about} onChange={(e) => setNewAbout(e.target.value)} className="border p-2 w-full mb-2" />
                        <button onClick={updateAbout} className="bg-yellow-500 text-white px-4 py-2 w-full  rounded-2xl  ">Update</button>
                    </div>

                    {/* Card 4, 5, 6: Empty for Future Updates */}
                    <div className="bg-gray-200 shadow-md p-4 rounded-lg flex items-center justify-center text-gray-500">Empty Card</div>
                    <div className="bg-gray-200 shadow-md p-4 rounded-lg flex items-center justify-center text-gray-500">Empty Card</div>
                    <div className="bg-gray-200 shadow-md p-4 rounded-lg flex items-center justify-center text-gray-500">Empty Card</div>
                </div>
            </div>


        </div>
    )
}

export default Admindashboard