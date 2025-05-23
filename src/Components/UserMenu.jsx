import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import BackDrop from "./BackDrop";
import { logOutUser } from "../Store/actions";
import toast from "react-hot-toast";

const UserMenu = ()=>{
    
    const { user } = useSelector((state) => state.auth)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler = () => {
       dispatch(logOutUser(toast,navigate))
    };
  return (
    <div>
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 "
        onClick={handleClick}
      >
        <Avatar/>
      </div>
      <Menu
        sx={{width:"400px"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx:{width:160},
        }}
      >
        <Link to="/profile">
            <MenuItem className="flex gap-2" onClick={handleClose}>
                <BiUser className="text-xl"/>
                <span className="font-semibold text-[16px] mt-1">
                    {user?.username}
                </span>
            </MenuItem>
        </Link>
        <Link to="/profile/order">
            <MenuItem className="flex gap-2" onClick={handleClose}>
                <FaShoppingCart className="text-xl"/>
                <span className="font-semibold text-[16px] mt-1">
                    Order
                </span>
            </MenuItem>
        </Link>

        <Link>
            <MenuItem onClick={logOutHandler}>
                <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm">
                    <IoMdExit/>
                    <span className="font-semibold text-[16px] mt-1">
                        LogOut
                    </span>
                </div>
            </MenuItem>
        </Link>

      </Menu>

      {open && <BackDrop/> }
    </div>
  );
    
}

export default UserMenu