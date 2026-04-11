'use client'

import { TypeAnimation } from 'react-type-animation';

export default function Typinganimation(){
    return (
        <TypeAnimation className='text-xl lg:text-5xl font-extrabold inline-block lg:py-5'
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'The fastest way to showcase your projects...',
                1500, // wait 1s before replacing "Mice" with "Hamsters"
                'The fastest way to explore communities projects...',
                1500,
            ]}
            wrapper="span"
            speed={30}
            repeat={Infinity}
        />
    );
};