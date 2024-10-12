import { useState } from 'react';
import './App.css';

function App() {

  return (
    <>
      <div className="logo h-[250px] w-[300px] ">
       <div className='flex flex-col items-center p-[30px] gap-3'> <img src="https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png" alt="" className='w-12 bg-white rounded-full ' />
       <h1 className='text-lg font-bold'>LinkedIn AI Reply</h1></div>
       <div className='pl-[30px] pr-[30px] '>
        <p className='text-sm text-center font-normal'>Introducing LinkedIn AI Reply as ChatGPT Writer for LinkedIn.</p>
        <div className='mt-4 flex justify-center font-bold items-center'><button className='bg-blue-500 text-white pb-[6px] pt-[6px] w-52 rounded-md hover:bg-blue-600'>Get Started</button></div>
       </div>
      </div>
    </>
  );
}

export default App;
