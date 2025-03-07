import React, { use, useContext, useEffect } from 'react'
import WebsiteContext from '../context/WebsiteContext'
import aboutusimg from '../../assets/aboutus.jpg'


function Aboutus() {
  const { about, fetchLastRecord, aboutus } = useContext(WebsiteContext);

  useEffect(() => {
    fetchLastRecord();

  }, [])


  return (
    <div className='mb-2'>
      <section className=" py-12 px-10 flex flex-col justify-between  md:flex-row  items-center">
        <div className=' w-full md:w-120'>
        <div className=" mx-auto text-left">

          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          {/* <p className="text-gray-600 mx-auto">{about||`We are a passionate team dedicated to delivering high-quality products and services. 
          Our mission is to provide innovative solutions that enhance customer experiences  
          and drive success in the digital world.`}
          
        </p> */}

          <p className="text-gray-600 mx-auto">{aboutus || `We are a passionate team dedicated to delivering high-quality products and services. 
          Our mission is to provide innovative solutions that enhance customer experiences  
          and drive success in the digital world.`}

          </p>
          </div>
          </div>
          <div className=' w-100 h-60 rounded-2xl'>
              <img src={aboutusimg} alt="img" className='rounded-2xl'/>
          </div>
       
      </section>
    </div>
  )
}

export default Aboutus