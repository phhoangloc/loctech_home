import React from 'react'


const About = () => {
    return (
        <div className='w-full'>
            <div className="h-18"></div>
            <div className='uppercase text-center text-2xl font-bold opacity-50 text-two'>ABOUT</div>
            <div className="h-6"></div>
            <div className='w-full max-w-40 aspect-square bg-three rounded-[50%] m-auto'></div>
            <div className="h-3"></div>
            <div className='uppercase text-center font-serif font-bold tracking-wider'>LOCPHAM</div>
            <div className='text-center text-sm opacity-50'>admin</div>
            <div className="h-6"></div>
            <div className="text-sm opacity-75 text-center">
                {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            </div>
        </div>
    )
}

export default About