import React from "react";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import { RiShareLine } from "react-icons/ri";

const LandingFeatures = () => {
  return (
    <div className='text-center p-10 max-w-7xl mx-auto'>
      <h2 className='text-5xl font-bold mb-4 max-sm:text-3xl'>
        People use <span className='text-blue-500'>EncryptShare</span> for
      </h2>
      <p className='text-xl font-bold text-gray-600 max-sm:text-lg'>
        Send your files and photos{" "}
        <span className='text-blue-500 uppercase'>SECURELY</span> with
        EncryptShare <span className='text-blue-500 uppercase'>ANYTIME</span>{" "}
        and <span className='text-blue-500 uppercase'>ANYWHERE</span> in the
        world.
      </p>
      <ul className='grid grid-cols-3 items-center justify-center py-10 max-lg:grid-cols-1'>
        <li className='flex items-center flex-col gap-y-3'>
          <MdOutlineSecurity className='text-7xl text-blue-500' />
          <h2 className='text-4xl font-bold'>High Security</h2>
          <p>
            Our secure file system is built with high-level security protocols
            to prevent DDoS attacks, brute-force attempts, and unauthorized
            access, ensuring your data remains safe and resilient against
            threats.
          </p>
        </li>
        <li className='flex items-center flex-col gap-y-3'>
          <IoIosSpeedometer className='text-7xl text-blue-500' />
          <h2 className='text-4xl font-bold'>Speed Transfer</h2>
          <p>
            Our secure file system uses MongoDB for high-speed performance and
            seamless scalability. It protects against DDoS, brute-force attacks,
            and ensures encrypted, reliable access.
          </p>
        </li>
        <li className='flex items-center flex-col gap-y-3'>
          <RiShareLine className='text-7xl text-blue-500' />
          <h2 className='text-4xl font-bold'>Easy Share</h2>
          <p>
            Our secure file system offers high-speed performance with MongoDB
            and effortless file sharing. It ensures encrypted access while
            protecting against DDoS and brute-force attacks.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default LandingFeatures;
