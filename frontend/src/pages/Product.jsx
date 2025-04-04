import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Image1 from "../assets/women/women.png";
import Image2 from "../assets/women/women2.jpg";
import Image3 from "../assets/women/women3.jpg";
import Image4 from "../assets/women/women4.jpg";
import Image5 from "../assets/women/women3.jpg";
import { new_price } from './KidsWair';
import { BsStarFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { FaRuler } from 'react-icons/fa';
import { GrDown, GrUp } from "react-icons/gr";

const ProductsData = [
  {
    id: 1,
    title: "Women Ethnic",
    img: Image1,
    colors: [Image1, Image2, Image3],
    color: "White",
    stars: 5,
    price: 470,
    short_desc: "This is perfect for winter",
    discount: 0,
    sub_categorie: "dress",
    gender: "girls",
  },
  {
    id: 2,
    title: "Women Western",
    img: Image2,
    colors: [Image2, Image4, Image1, Image3],
    color: "Red",
    stars: 4.5,
    price: 1200,
    short_desc: "This is perfect for winter",
    discount: 33,
    sub_categorie: "dress",
    gender: "girls",
  },
  {
    id: 3,
    title: "Goggles",
    img: Image3,
    colors: [Image3, Image5, Image2, Image1],
    color: "Brown",
    stars: 4.7,
    price: 430,
    short_desc: "This is perfect for winter",
    discount: 0,
    sub_categorie: "accessories",
    gender: "both",
  },
  {
    id: 4,
    title: "Printed T-Shirt",
    img: Image4,
    colors: [Image4, Image5, Image2, Image3],
    color: "Yellow",
    stars: 4.4,
    price: 600,
    short_desc: "This is perfect for winter",
    discount: 0,
    sub_categorie: "t-shirt",
    gender: "boys",
  },
  {
    id: 5,
    title: "Fashion T-Shirt",
    img: Image1,
    colors: [Image1, Image4, Image2, Image3],
    color: "Pink",
    stars: 4.5,
    price: 750,
    short_desc: "This is perfect for winter",
    discount: 0,
    sub_categorie: "t-shirt",
    gender: "girls",
  },
  {
    id: 6,
    title: "Fashion T-Shirt",
    img: Image2,
    colors: [Image2, Image5, Image1, Image3],
    color: "Pink",
    stars: 4.5,
    price: 700,
    short_desc: "This is perfect for winter",
    discount: 20,
    sub_categorie: "t-shirt",
    gender: "boys",
  },
  {
    id: 7,
    title: "Fashion T-Shirt",
    img: Image5,
    colors: [Image5, Image2, Image1, Image3],
    color: "Pink",
    stars: 4.5,
    price: 510,
    short_desc: "This is perfect for winter",
    discount: 40,
    sub_categorie: "t-shirt",
    gender: "both",
  },
  {
    id: 8,
    title: "Fashion T-Shirt",
    img: Image5,
    color: "Pink",
    colors: [Image5, Image4, Image1, Image3],
    stars: 4.5,
    price: 400,
    aosDelay: 800,
    short_desc: "This is perfect for winter",
    discount: 0,
    sub_categorie: "t-shirt",
    gender: "girls",
  },
  {
    id: 9,
    title: "Fashion T-Shirt",
    img: Image5,
    colors: [Image5, Image3, Image2, Image4],
    color: "Pink",
    stars: 4.5,
    price: 200,
    short_desc: "This is perfect for winter",
    discount: 10,
    sub_categorie: "t-shirt",
    gender: "both",
  },
  {
    id: 10,
    title: "Women Ethnic",
    img: Image1,
    colors: [Image1, Image4, Image2, Image3],
    color: "White",
    stars: 5,
    price: 300,
    short_desc: "This is perfect for winter",
    discount: 0,
    sub_categorie: "dress",
    gender: "girls",
  },
  {
    id: 11,
    title: "Women Ethnic",
    img: Image1,
    colors: [Image1, Image5, Image2, Image3],
    color: "White",
    stars: 5,
    price: 100,
    short_desc: "This is perfect for winter",
    discount: 30,
    sub_categorie: "dress",
    gender: "boys",
  },
];

const Product = () => {
    const { productId } = useParams();
    const product = ProductsData.find((product) => product.id === parseInt(productId));
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [displayReviews, setDisplayReviews] = useState(false);
    const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <div className='container flex gap-1 mt-2 py-2'>
        {/* partie gauche(photos) */}
          <div className='w-3/5 flex gap-3'>
              <div className='flex flex-col gap-1'>
                  {product.colors.map((color, index) => (
                      <div key={index} className='lg:h-[122px] lg:w-[122px] w-[64px] h-[64px] rounded cursor-pointer'>
                          <img src={color} className='h-full w-full rounded' alt="" 
                          onMouseEnter={() => setSelectedColor(color)}
                          />
                      </div>
                  ))}
              </div>
              <div className='lg:h-[496px] lg:w-[488px] h-[264px] w-[264px] rounded cursor-pointer'>
                  <img src={selectedColor} className='h-full w-full rounded' alt="" />
              </div>
          </div>
          {/* partie droite, details */}
          <div className='flex-1 flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                  <div className='lg:text-2xl text-xl font-semibold dark:text-gray-200'>{product.title}</div>
                  <p className='lg:text-lg text-base text-med text-gray-500 dark:text-gray-200'>{product.short_desc}</p>
                  <p className='lg:text-2xl text-xl text-gray-700 flex items-center gap-2 dark:text-gray-200'>
                    {product.discount>0? "$"+new_price(product.price, product.discount):"$"+product.price}
                   {product.discount>0 && <span className='lg:text-xl text-lg text-gray-400 line-through'> ${product.price}</span>}
                    {product.discount>0 &&<span className='lg:text-xl text-lg text-green-600'>Enjoy -{product.discount}% on this product</span>}
                  </p>
              </div>
              <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                      <div className='lg:text-lg text-base font-semibold'>Color:</div>
                      <div className='h-8 w-8 rounded-full border border-gray-300' style={{ backgroundColor: product.color }}></div>
                  </div>
                  <div className='flex items-center gap-2'>
                      <div className='lg:text-lg text-base font-semibold'>Rating:</div>
                      <div className='flex gap-1 items-center'>
                      <span className='text-yellow-500'>{product.stars}</span><BsStarFill className='text-yellow-500' />
                      </div>
                  </div>
                <div></div>
              </div>
              <div className='flex flex-col gap-4 '>
                <div className='flex justify-between items-center gap-2 lg:text-lg text-base font-semibold dark:text-gray-100 text-gray-700 w-2/3'>
                  <div className=''>Select Size</div>
                  <Link to={'/'} className='flex items-center gap-1'><FaRuler/> Size guide</Link>
                </div>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                  <div className='p-2 border border-primary rounded'>1</div>
                  <div className='p-2 border border-primary rounded'>1</div>
                  <div className='p-2 border border-primary rounded'>1</div>
                  <div className='p-2 border border-primary rounded'>1</div>
                </div>
                <div className='flex flex-col items-center gap-4'>
                  <button className='bg-secondary  hover:scale-105 text-gray-50 py-2 px-4 rounded-lg w-full'>Add to Cart</button>
                  <button className='text-secondary py-2 px-4 rounded-lg w-full border border-secondary hover:scale-105'>Add to Wishlist</button>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='text-gray-700 dark:text-gray-200 font-semibold'>Product details</div>
                  <p className='text-gray-500 dark:text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                  <div className='text-gray-700 dark:text-gray-200 cursor-pointer hover:text-primary dark:hover:text-primary'>More about the product</div>
                </div>
                <hr />
                <div className='flex items-center justify-between cursor-pointer' onClick={() => setDisplayReviews(!displayReviews)}>
                  <span className=''>Reviews()</span>
                  <div className='flex gap-1 items-center'>
                      <span className='text-yellow-500'>{product.stars}</span><BsStarFill className='text-yellow-500' />
                      <span> {displayReviews? <GrUp/> : <GrDown/>} </span>
                      </div>
                </div>
                {displayReviews && (
                  <div className='flex flex-col gap-2'>
                    <p className='text-gray-500 dark:text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                    <p className='text-gray-500 dark:text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                  </div>
                )}
                <hr />
              </div>
          </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-2xl p-5 font-semibold'>People wear this so nicely</div>
        <div></div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-2xl p-5 font-semibold'>You might be interested...</div>
        <div></div>
      </div>
    </div>
  )
}

export default Product