import { Badge } from "@mui/material";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () =>{
    const path = useLocation().pathname;
    return(
        <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between" >
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <FaStore className="mr-2 text-3xl"/>
                    <span className="font-[Poppins]"> E-Shop </span>
                </Link>

                <ul className="flex items-center gap-8">
                    <li className="font-[500] transition-all duration-150">
                        <Link className={`${
                            path === "/" ? "text-gray-200 font-normal" : "text-white font-bold"
                        }`}
                        to="/" > Home</Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link className={`${
                            path === "/products" ? "text-gray-200 font-normal" : "text-white font-bold"
                        }`}
                        to="/products" > Products</Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link className={`${
                            path === "/about" ? "text-gray-200 font-normal" : "text-white font-bold"
                        }`}
                        to="/about" > About</Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link className={`${
                            path === "/contact" ? "text-gray-200 font-normal" : "text-white font-bold"
                        }`}
                        to="/contact" > Contact </Link>
                    </li>       
                    
                    <li className="font-[500] transition-all duration-150">
                        <Link className={`${
                            path === "/cart" ? "text-gray-200 font-normal" : "text-white font-bold"
                        }`}
                        to="/cart" > <Badge showZero
                                            badgeContent={0}
                                            color="primary"
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                                            
                                            <FaShoppingCart size={25 }/>
                                    </Badge> 
                                        
                        </Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link className="flex items-center space-x-2 px-4 py-[6px] 
                                        bg-gradient-to-r from-purple-600 to-red-500
                                        text-white font-semibold rounded-md shadow-lg
                                        hover:frompurple-500 hover:to-red-400 transition
                                        duration-300 ease-in-out transform "
                        to="/login" > 
                            <FaSignInAlt size={20}/>
                            <span>Login</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar; 