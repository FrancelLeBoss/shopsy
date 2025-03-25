import React, { useState, useEffect } from "react";
import Image1 from "../assets/women/women.png";
import Image2 from "../assets/women/women2.jpg";
import Image3 from "../assets/women/women3.jpg";
import Image4 from "../assets/women/women4.jpg";
import Image5 from "../assets/women/women3.jpg";
import { FiFilter } from "react-icons/fi";
import { BiDownArrowAlt } from "react-icons/bi";
const ProductsData =[
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
    },
  ]  
const ITEMS_PER_PAGE = 6

export const KidsWair = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  //const totalPages = Math.ceil(ProductsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //const displayedProducts = ProductsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const [productHovered, setProductHovered] = useState(-1);
  const [photoHovered, setPhotoHovered] = useState(null)
  const [filtered,setFiltered] = useState(null)
  const [filteredProduct, setFilteredProduct] = useState(ProductsData)
  const [selected, setSelected] = useState(null);
  const totalPages = Math.ceil((filtered ? ProductsData.filter(product => product.sub_categorie === filtered.value).length : ProductsData.length) / ITEMS_PER_PAGE);
  const new_price = (_price, percentage) => {
    return _price - (_price * (percentage / 100));
    };
    const displayedProducts = () => {
        if (filtered) {
            return ProductsData.filter(product => product.sub_categorie === filtered.value);
        }
        return ProductsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }
    const categoryCounts = ProductsData.reduce((acc, product) => {
        acc[product.sub_categorie] = (acc[product.sub_categorie] || 0) + 1;
        return acc;
      }, {});
      
      useEffect(() => {
        setCurrentPage(1); // Remettre à la première page après filtrage
    }, [filtered]);

  return (
    <div className="bg-gray-100 min-h-screen pb-4">
      {/* Header */}
      <div className="bg-primary/40 py-3">
        <div className="text-xl text-secondary text-center font-semibold">
          KIDS WEAR
        </div>
      </div>
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 font-medium">Home / Kids Wear</div>

        {/* Title & Sorting */}
        <div className="flex justify-between items-center mt-3">
          <h1 className="text-3xl font-medieum">Find everything you need for your children</h1>
          <div className="flex items-center gap-4 text-lg font-normal">
            <button
              className="flex items-center gap-2 cursor-pointer hover:bg-primary/60 bg-gray-200 px-3 py-1 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
              <FiFilter />
            </button>
            <button className="cursor-pointer group flex items-center px-3 py-1 gap-2 transition-all duration-200 rounded-md hover:text-secondary">
              <span>Sort By</span>
              <BiDownArrowAlt className="group-hover:rotate-180" />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex mt-4">
          {/* Sidebar Filtres */}
          {showFilters && (
            <div className="flex flex-col gap-4 w-1/4 p-4 border-r border-gray-300 bg-white shadow-md rounded-md">
                <div className="">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <ul className="mt-2 space-y-2 text-gray-700 fon">
                        <li className={`cursor-pointer hover:text-primary ${
                                selected === 't-shirt' ? 'text-primary' : ''
                            }`} onClick={()=>{
                            if(filtered?.value != 't-shirt'){
                                setFiltered({type:'sub_categorie', value:'t-shirt'})
                                setSelected('t-shirt');
                            }
                            else{
                                setFiltered(null)
                                setSelected(null);
                            }
                            }}>
                            T-Shirts ({categoryCounts["t-shirt"] || 0})
                        </li>
                        <li className={`cursor-pointer hover:text-primary ${
                                selected === 'dress' ? 'text-primary' : ''
                            }`} onClick={()=>{
                            if(filtered?.value != 'dress'){
                                setFiltered({type:'sub_categorie', value:'dress'})
                                setSelected('dress');
                            }
                            else{
                                setFiltered(null)
                                setSelected(null);
                            }
                            }}>
                            Dresses ({categoryCounts["dress"] || 0})
                        </li>
                        <li className={`cursor-pointer hover:text-primary ${
                                selected === 'accessories' ? 'text-primary' : ''
                            }`} onClick={()=>{
                            if(filtered?.value != 'accessories'){
                                setFiltered({type:'sub_categorie', value:'accessories'})
                                setSelected('accessories');
                            }
                            else{
                                setFiltered(null)
                                setSelected(null);
                            }
                            }}>                            Accessories ({categoryCounts["accessories"] || 0})
                        </li>
                        <li className={`cursor-pointer hover:text-primary ${
                                selected === 'shoes' ? 'text-primary' : ''
                            }`} onClick={()=>{
                            if(filtered?.value != 'shoes'){
                                setFiltered({type:'sub_categorie', value:'shoes'})
                                setSelected('shoes');
                            }
                            else{
                                setFiltered(null)
                                setSelected(null);
                            }
                            }}>                               Shoes ({categoryCounts["shoes"] || 0})
                        </li>
                    </ul>
                </div>
                <hr className="font-medium text-gray-700"/>
            </div>
          )}

          {/* Product Grid */}
          <div className={`grid gap-3 ${showFilters ? "w-3/4" : "w-full lg:grid-cols-4"} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-4`}>
            {displayedProducts()?.map((item) => (
              <div
                className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg "
                key={item.id}
              >
                <img
                 src={photoHovered?.index !== undefined && productHovered === item.id 
                    ? item.colors[photoHovered.index] 
                    : item.img}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-md hover:outline-primary hover:outline hover:outline-1"
                />
                {productHovered !== item.id && (<div className="mt-2" onMouseEnter={() => {setProductHovered(item.id)
                    setPhotoHovered(null);}
                }
                onMouseLeave={() => setProductHovered(-1)}>
                  <span className="font-semibold text-secondary">{item.title}</span>
                  <span className="block text-gray-500 text-base">{item.short_desc}</span>
                  <div className={`flex items-center text-secondary font-medium text-lg `}>
                  ${item.discount > 0 ? new_price(item.price, item.discount) : item.price}  
                    {item.discount > 0 && (
                        <s className="ml-1 text-gray-500">${item.price}</s>
                    )}
                    {item.discount > 0 && (
                        <h3 className="ml-1 text-green-600">{item.discount}% discount</h3>
                    )}
                  </div>
                </div>)}
                {/* Affichage conditionnel au survol */}
                {productHovered === item.id && (
                    <div className="mt-2 p-2 bg-gray-200 rounded-md text-sm text-gray-700 flex flex-col gap-2" 
                    onMouseLeave={() => setProductHovered(-1)}>
                        <div className="flex gap-2 items-center">
                            {
                                item.colors.map((element, indice)=>(
                                    <img key={indice} src={element} className="w-8 h-8 hover:outline hover:outline-primary hover:outline-1"
                                    onMouseEnter={() => setPhotoHovered({img:element,index:indice})}
                                    onMouseLeave={() => setPhotoHovered(null)}
                                    />
                                ))
                            }
                        </div>
                        <div className={`flex items-center text-secondary font-medium text-lg `}>
                        ${item.discount > 0 ? new_price(item.price, item.discount) : item.price}  
                            {item.discount > 0 && (
                                <s className="ml-1 text-gray-500">${item.price}</s>
                            )}
                            {item.discount > 0 && (
                                <h3 className="ml-1 text-green-600">{item.discount}% discount</h3>
                            )}
                        </div>
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
         {/* Pagination */}
         <div className="flex justify-end mt-6 gap-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-1 bg-white border rounded-md">{currentPage} / {totalPages}</span>
          <button
            className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidsWair;
