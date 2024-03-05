import React from 'react'

function About({ selectedCard, AddedToCart }) {
    // console.log(selectedCard);
    
return (
    <div>
        {selectedCard ? (
            <div className='flex'>
                <img src={selectedCard.img} alt={selectedCard.name} className="mt-8 p-4 w-1/2 " />
                <div className=" mt-8 p-8 flex flex-col ">
                    <p className='text-3xl'>{selectedCard.name}</p>
                    <p className="text-xl">{selectedCard.desc}</p>
                    <p className='text-xl'>Price: {selectedCard.price}</p>
                    <p className='text-xl'>Rating: {selectedCard.rating}</p>
                    
                    <button  
                        onClick={() => AddedToCart(selectedCard)}  
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
                    >Add To Bag</button>
                </div>
            </div>
        ) : (
            <div>
                    <div className='items-center p-4'>
                    <img src="https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_640.jpg" alt="" />
                    </div>
                <div className="flex items-center ">
                <div className="text-center ">
                <h2 className="text-2xl font-bold mb-2">Billi</h2>
                <p className="text-lg">Asmaan me dekhti billi </p>
                    </div>
                    </div>
            </div>
                )};
    </div>
    )
};

export default About