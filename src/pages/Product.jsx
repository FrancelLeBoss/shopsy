import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Image1 from "../assets/women/women.png";
import Image2 from "../assets/women/women2.jpg";
import Image3 from "../assets/women/women3.jpg";
import Image4 from "../assets/women/women4.jpg";
import Image5 from "../assets/women/women3.jpg";

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

  return (
    <div className='container flex gap-4 mt-2'>
        {/* partie gauche(photos) */}
        <div className='flex-1 flex gap-1'>
            <div className='flex flex-col gap-1'>
                {product.colors.map((color, index) => (
                    <div key={index} className='h-[122px] w-[122px] rounded cursor-pointer'>
                        <img src={color} className='h-full w-full rounded' alt="" 
                        onMouseEnter={() => setSelectedColor(color)}
                        />
                    </div>
                ))}
            </div>
            <div className='h-[496px] w-[488px]'>
                <img src={selectedColor} className='h-full w-full rounded' alt="" />
            </div>
        </div>
        {/* partie droite, details */}
        <div className='flex-1'></div>
    </div>
  )
}

export default Product