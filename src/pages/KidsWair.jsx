import React, { useState, useEffect } from "react";
import Image1 from "../assets/women/women.png";
import Image2 from "../assets/women/women2.jpg";
import Image3 from "../assets/women/women3.jpg";
import Image4 from "../assets/women/women4.jpg";
import Image5 from "../assets/women/women3.jpg";
import { FiFilter } from "react-icons/fi";
import { BiDownArrowAlt } from "react-icons/bi";
import { GrDown, GrUp } from "react-icons/gr";
import CheckboxFilter from "../components/general/CheckBox";
import { Link } from "react-router-dom";
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

const ITEMS_PER_PAGE = 6

export const KidsWair = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [genderClicked,setGenderClicked] = useState(false)
  const [priceClicked,setPriceClicked] = useState(false)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const [productHovered, setProductHovered] = useState(-1);
  const [photoHovered, setPhotoHovered] = useState(null)
  const [filtered,setFiltered] = useState(null)
  const [selected, setSelected] = useState(null);
  const [genderFilter, setGenderFilter] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  const [sortingCriteria, setSortingCriteria] = useState("")
  const [displaySorting, setDisplaySorting] = useState(true)
  
  const totalPages = () => {
    let ProductFiltered = ProductsData
    if(filtered && filtered.value){
      ProductFiltered = ProductFiltered.filter(p => p.sub_categorie === filtered.value)
    }
    if(genderFilter.length>0){
      ProductFiltered = ProductFiltered.filter(p => genderFilter.includes(p.gender))
    }
    if(priceFilter.length > 0){
      ProductFiltered = ProductFiltered.filter(p =>p.price <=  Math.max(...priceFilter.map(v => v || 0)) )

    }
    return Math.ceil(ProductFiltered.length/ITEMS_PER_PAGE)
    };

  const subCategoryCounts = ProductsData.reduce((acc, product) => {
        acc[product.sub_categorie] = (acc[product.sub_categorie] || 0) + 1;
        return acc;
    }, {});

  const getHighestPrice = (products) =>{
    return Math.max(...products.map(p => p.price || 0));
  }
  const getLowestPrice = (products) =>{
    return Math.min(...products.map(p => p.price || 0));
  }
  const getMedianPrice = (products) => {
    // Extraire les prix et filtrer les valeurs null/undefined
    const prices = products
        .map(p => p.price)
        .filter(price => price !== undefined && price !== null)
        .sort((a, b) => a - b); // Trier les prix en ordre croissant

    if (prices.length === 0) return 0; // Gérer le cas où il n'y a aucun prix

    const mid = Math.floor(prices.length / 2);

    // Si le nombre d'éléments est impair, prendre l'élément du milieu
    // Si le nombre d'éléments est pair, faire la moyenne des deux valeurs centrales
    return prices.length % 2 !== 0 ? prices[mid] : (prices[mid - 1] + prices[mid]) / 2;
};
    // Transformer l'objet en tableau de paires [sub_categorie, count]
   const subCategoryArray = Object.entries(subCategoryCounts);
   const new_price = (_price, percentage) => {
    return _price - (_price * (percentage / 100));
    };
    const displayedProducts = () => {
      let filteredProducts = ProductsData;
  
      if (filtered) {
          filteredProducts = filteredProducts.filter(product => product.sub_categorie === filtered.value);
      }
  
      if (genderFilter.length > 0) {
          filteredProducts = filteredProducts.filter(product => genderFilter.includes(product.gender));
      }
      if(priceFilter.length > 0){
        filteredProducts = filteredProducts.filter(p =>p.price <= Math.max(...priceFilter.map(v => v || 0)) )
  
      }
      return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

    const handleFilterChange = (newSelected) => {
      setGenderFilter(newSelected);
  };
  const handleFilterPriceChange = (newSelected) =>{
      setPriceFilter(newSelected)
  }
  const handleSorting = (c) =>{
    setSortingCriteria(c) 

  }
  const sortedProducts = () =>{
    if(sortingCriteria === 'default' || sortingCriteria === ''){
      return displayedProducts()
    }
    else if(sortingCriteria === 'by name'){
      return displayedProducts().sort((a,b) => a.title.localeCompare(b.title))
    }
    else if(sortingCriteria === 'by price'){
      return displayedProducts().sort((a,b) => a.price - b.price)
    }
  }

  const categoryCounts = ProductsData.reduce((acc, product) => {
        acc[product.sub_categorie] = (acc[product.sub_categorie] || 0) + 1;
        return acc;
      }, {});
    
  useEffect(() => {
        setCurrentPage(1); // Remettre à la première page après filtrage
    }, [filtered,genderFilter]);

  return (
    <div className="bg-gray-100 min-h-screen pb-4 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-primary/40 py-3">
        <div className="text-xl text-secondary text-center font-semibold">
          KIDS WEAR
        </div>
      </div>
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 dark:text-gray-200 font-medium">Home / Kids Wear</div>

        {/* Title & Sorting */}
        <div className="flex justify-between items-center mt-3">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-medium">Everything your child needs</h1>
          <div className="flex items-center gap-4 text-base md:text-lg font-normal">
            <button
              className="flex items-center gap-2 cursor-pointer hover:bg-primary/60 dark:bg-transparent dark:hover:text-secondary dark:border-1 dark:border-primary bg-gray-200 px-3 py-1 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
              <FiFilter />
            </button>
            <div className="relative" onMouseEnter={() => setDisplaySorting(true)} onMouseLeave={() => setDisplaySorting(false)}>
              <button className="cursor-pointer group flex items-center px-3 py-1 gap-2 transition-all duration-200 rounded-md hover:text-secondary">
                <span>Sort By</span>
                <BiDownArrowAlt className="group-hover:rotate-180" />
              </button>
              {
                <div className={`${displaySorting?'':'hidden'} dark:bg-gray-900 bg-gray-50 w-full p-3 top-8
                 absolute text-xs text-gray-700`}
                 >
                  <CheckboxFilter options={['default','by name','by price']} uniqueSelection={true} onFilterChange = {handleSorting}/></div>
              }
            </div>
          </div>
        </div>
        {/* Content Grid */}
        <div className="flex mt-4">
          {/* Sidebar Filtres */}
          {showFilters && (
            <div className="flex flex-col gap-4 w-1/4 p-4 dark:border-none border-r border-gray-300 bg-white dark:bg-gray-900 shadow-md rounded-md">
                <div className="">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <ul className="mt-2 space-y-2 text-gray-400 fon">
                        {
                            subCategoryArray.map((category,index) => (
                                <li key={index} className={`cursor-pointer hover:text-primary capitalize ${
                                    selected === category[0] ? 'text-primary' : ' dark:text-gray-400 text-gray-700'
                                }`} onClick={()=>{
                                if(filtered?.value !=  category[0]){
                                    setFiltered({type:'sub_categorie', value:category[0]})
                                    setSelected(category[0]);
                                }
                                else{
                                    setFiltered(null)
                                    setSelected(null);
                                }
                                }}>
                                 {`${category[0]} (${category[1] || 0})`}
                            </li>
                            ))
                        }
                    </ul>
                </div>
                <hr className="font-medium text-gray-700"/>
                <div className="flex flex-col cursor-pointer gap-2">
                  <div className="flex justify-between font-medium" onClick={() => setGenderClicked(!genderClicked)}><span>Gender</span>{genderClicked?<GrUp/> :<GrDown/> }</div>
                  <div className={`${genderClicked ?'block':'hidden'}`}>
                  <CheckboxFilter  onFilterChange={handleFilterChange}/>
                  </div>
                </div>
                <hr className="font-medium text-gray-700"/>
                <div className="flex flex-col cursor-pointer gap-2">
                  <div className="flex justify-between font-medium" onClick={() => setPriceClicked(!priceClicked)}><span>Filter by price</span>{priceClicked?<GrUp/> :<GrDown/> }</div>
                  <div className={`${priceClicked ?'block':'hidden'}`}>
                  <CheckboxFilter  options={[getLowestPrice(ProductsData),getMedianPrice(ProductsData),getHighestPrice(ProductsData)]} onFilterChange={handleFilterPriceChange} extra={"$"}/>
                  </div>
                </div>
                <hr className="font-medium text-gray-700"/>
            </div>
          )}

          {/* Product Grid */}
          <div className={`grid gap-3 ${showFilters ? "w-3/4" : "w-full lg:grid-cols-4"} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-4`}>
            {sortedProducts()?.map((item) => (
              <div
                className="dark:bg-gray-900 bg-white p-2 rounded-lg shadow-md hover:shadow-lg "
                key={item.id}
              >
                <Link to={`/product/${item.id}`}>
                  <img
                  src={photoHovered?.index !== undefined && productHovered === item.id 
                      ? item.colors[photoHovered.index] 
                      : item.img}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-md hover:outline-primary hover:outline hover:outline-1"
                  />
                </Link>
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
                    <div className="mt-2 p-2 rounded-md text-sm text-gray-700 flex flex-col gap-2" 
                    onMouseLeave={() => setProductHovered(-1)}>
                        <div className="flex gap-2 items-center">
                            {
                                item.colors.map((element, indice)=>(
                                  <Link to={`/product/${item.id}`} key={indice}>
                                    <img key={indice} src={element} className="w-8 h-8 hover:outline hover:outline-primary hover:outline-1"
                                    onMouseEnter={() => setPhotoHovered({img:element,index:indice})}
                                    onMouseLeave={() => setPhotoHovered(null)}
                                    onClick={() => window.location.href = `/product/${item.id}`}
                                    />
                                  </Link>
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
            className="px-3 py-1 dark:bg-gray-900 bg-gray-300 rounded-md disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-1 dark:bg-gray-900 bg-white dark:border-none border rounded-md">{currentPage} / {totalPages()}</span>
          <button
            className="px-3 py-1 dark:bg-gray-900 bg-gray-300 rounded-md disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages()))}
            disabled={currentPage === totalPages()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidsWair;
