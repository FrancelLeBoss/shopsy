import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Swal from 'sweetalert2'
import axios from 'axios'
import { login } from '../../redux/userSlice';

const Cart = ({orderPopup, setOrderPopup}) => {
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch()
    const [order, setOrder] = useState(false)
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    

    useEffect(() => {
        console.log("Cart items:", cart);
        console.log("Total price:", totalPrice);
      
      }, [cart, user]);

    const imageUrl = (images) => {
        let mainImage
        images?.map((image) => {
            if(image.mainImage === true) mainImage = apiBaseUrl+image.image
        })
        return mainImage
    }
    const handleLogin = async () => {
        try {
          const response = await axios.post(`${apiBaseUrl}api/login/`, {
            email,
            username,
            password,
          });
          dispatch(login({ user: response.data.user, token: response.data.token }));
        } catch (error) {
          console.error('Login failed:', error);
        }
      };

      const handleClearCart = () => {
        Swal.fire({
          title: 'Clear the cart',
          text: "Are you sure ? You won't be able to revert this!",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, clear it!',
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .get(`${apiBaseUrl}api/cart/${user?.id}/empty/`)
              .then((response) => {
                console.log("Cart emptied successfully:", response.data);
                dispatch({ type: 'cart/clearCart' });
                // Swal.fire('Cleared!', 'Your cart has been emptied.', 'success');
                Swal.fire({
                  title: 'Cleared!',
                  text: 'Your cart has been emptied.',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
                });
              })
              .catch((error) => console.error("Error emptying cart:", error));
          }
        });
      };

    const handleRemoveFromCart = (item) => {
        Swal.fire({
            title: 'Remove from cart',
            text: "Are you sure ? You won't be able to revert this!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${apiBaseUrl}api/cart/remove/`, {
                    variant_id: item.variant.id,
                    user_id: user.id,
                })
                .then((response) => {
                    dispatch({ type: 'cart/removeItem', payload: item });
                    fetchCart(); // Refresh the cart after removing the item
                    Swal.fire('Removed!', 'Your item has been removed from the cart.', 'success');

                })
                .catch((error) => console.error("Error removing item:", error));
            
            }
        });
        
    }

    const handleUpdateQuantity = (item, newQuantity) => {
        if (newQuantity < 1) {
          Swal.fire('Invalid Quantity', 'Quantity must be at least 1.', 'error');
          return;
        }
        axios
          .post(`${apiBaseUrl}api/cart/update/`, {
            variant_id: item.variant.id,
            user_id: user.id,
            quantity: newQuantity,
            size_id: item?.size?.id ,
          })
          .then((response) => {
            dispatch({ type: 'cart/updateCartItem', payload: { id: item.variant.id, quantity: newQuantity } });
            fetchCart(); // Refresh the cart to ensure consistency
          })
          .catch((error) => console.error("Error updating quantity:", error));
      };

    const fetchCart = async () => {
        try {
          const response = await axios.get(`${apiBaseUrl}api/cart/${user?.id}/`);
          
            const cartData = response.data;
            console.log("User ", user?.id, " cart data: ", cartData);

            // Récupérer les détails de chaque variante
            const items = await Promise.all(
                cartData.map(async (item) => {
                    const variantResponse = await axios.get(`${apiBaseUrl}api/products/variant/${item.variant}/`);
                    const sizeResponse = await (await axios.get(`${apiBaseUrl}api/products/size/${item.size}/`))
                    return {
                        id: item.id,
                        variant: variantResponse.data, // Stocker la variante entière
                        size: sizeResponse.data, // Stocker la taille entière
                        quantity: item.quantity,
                    };
                })
            );

            // Dispatch pour mettre à jour le panier dans Redux
            dispatch({ type: 'cart/updateCart', payload: items });
          console.log("Cart fetched successfully:", response.data);

        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };

  return (
    <>
        {
            orderPopup && (
                <div className='popup'>
                    <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 backdrop-blur-sm z-50'>
                        <div className='fixed top-1/2 left-1/3 -translate-y-1/2 p-4 shadow-md bg-white
                         dark:bg-gray-900 rounded-md duration-200 w-[400px]'> 
                        {/* Header */}
                            <div className='flex items-center justify-between'>
                                <h1 className='text-xl text-gray-800 dark:text-gray-300'>Cart</h1>
                                <div>
                                    <IoCloseOutline className='text-2xl cursor-pointer' onClick={()=>setOrderPopup()}/>
                                </div>
                            </div>
                            {
                                user &&
                                <div>
                                    {/* Cart items */}
                                    <div className='overflow-auto max-h-[300px] mt-4'>
                                        {
                                            cart.length > 0 ? (
                                                cart?.map((item, index) => (
                                                    <div key={index} className='flex items-center gap-2 border-b py-2'>
                                                        <img
                                                            src={imageUrl(item?.variant?.images)}
                                                            alt={item?.variant?.product?.title}
                                                            className='w-16 h-16 object-cover'
                                                        />
                                                        <div className='flex flex-col gap-1 w-full'>
                                                            <div className='text-lg text-gray-800 dark:text-gray-300'>
                                                                {item.variant?.product?.title} ({item.variant?.color})
                                                            </div>
                                                            <div className='text-xs text-gray-500 dark:text-gray-400 flex gap-4 items-center font-semibold justify-between'>
                                                                {/* Prix et taille sur la même ligne */}
                                                                <div className='flex items-center gap-1'>
                                                                    <span>{item.variant?.price}</span>
                                                                    <span>$</span>
                                                                    <span className='text-gray-500 dark:text-gray-400'>|</span>
                                                                    <div className='flex items-center gap-1'><span className=''>size </span><span className='text-primary'>{item?.size?.size}</span></div>
                                                                </div>
                                                                {/* Quantité et bouton Remove */}
                                                                <div className='flex items-center gap-2 justify-end w-full'>
                                                                    <span className='text-gray-500 dark:text-gray-400 text-xs'>Quantity</span>
                                                                    <input
                                                                        type="number"
                                                                        min={1}
                                                                        value={item?.quantity}
                                                                        className='w-12 border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 focus:outline-primary/20 focus:outline-1'
                                                                        onChange={(e) => {
                                                                            handleUpdateQuantity(item, e.target.value);
                                                                        }}
                                                                    />
                                                                    <button
                                                                        className='text-red-500 hover:text-red-700'
                                                                        onClick={() => {
                                                                            handleRemoveFromCart(item);
                                                                        }}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <h1 className='text-center text-gray-500 dark:text-gray-400'>Your cart is empty</h1>
                                            )
                                        }   
                                        {cart.length>0 && <div className='text-xs flex items-center justify-between mt-2 px-2 py-1 bg-red-600 text-gray-100 cursor-pointer hover:bg-red-700 w-32'
                                            onClick={() => {
                                                handleClearCart()
                                            }}>
                                            <span>Clear the cart</span>
                                            <IoCloseOutline className='text-white' />       
                                        </div>}
                                    </div>
                                    {/* Total price */} 
                                    <div className='flex items-center justify-between mt-4'>
                                        <h1 className='text-sm text-gray-800 dark:text-gray-300'>Total Price</h1>
                                        <h1 className='text-sm text-gray-800 dark:text-gray-300'>{totalPrice} $</h1>
                                    </div>
                                </div>
                            }
                            {
                                !user &&
                                <div className='mt-4'>
                                    <div className='text-sm text-gray-600 dark:text-gray-300 mb-2'>Login to proceed</div>
                                    <input type="text" 
                                    placeholder='Username'
                                    className='w-full  border border-gray-300 dark:border-gray-500
                                    dark:bg-gray-800 px-3 py-2 focus:outline-primary/20 focus:outline-1 mb-4'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    />
                                    <div className='relative'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            className='w-full  border border-gray-300 dark:border-gray-500
                                    dark:bg-gray-800 px-3 py-2 focus:outline-primary/20 focus:outline-1 '
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            />
                                        <span
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700'>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </span>
                                    </div>
                                </div>
                            }

                            <div className='flex items-center justify-center group mt-4'>
                                <button onClick={()=>{
                                    if (!user){
                                        handleLogin()
                                    }
                                    else{
                                        setOrderPopup()
                                    } 
                                }} className='text-white px-3 py-2 bg-primary hover:bg-secondary 
                                '>{user?'Purchase now': "Register"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Cart