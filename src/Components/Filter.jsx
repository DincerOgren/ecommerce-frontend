import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch, FaSearchengin } from "react-icons/fa";
import {FiRefreshCcw} from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const Filter = () => {
    
    const categories = [

        {categoryId:1 , categoryName:"Cat1"},
        {categoryId:2 , categoryName:"Cat2"},
        {categoryId:3 , categoryName:"Cat3"},
        {categoryId:4 , categoryName:"Cat4"},
        {categoryId:5 , categoryName:"Cat5"},

    ]

    const [searchParams]=useSearchParams();
    const params=new URLSearchParams(searchParams);

    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    const [category,setCategory] = useState("all");
    
    const [sortOrder,setSortOrder] = useState("asc");
    const [searchTerm,setSearchTerm] = useState("");

    useEffect(()=>{
        const currentCat=searchParams.get("category") || "all";
        const currentSortOrder=searchParams.get("sortby") || "asc";
        const currentSearchTerm=searchParams.get("keyword") || "";

        setCategory(currentCat);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);

        console.log(searchTerm,"asdfsfd")
    }, [searchParams])


    useEffect(()=>{
        const handler=setTimeout(()=>{
            if(searchTerm){
                searchParams.set("keyword",searchTerm)
            } else
            {
                searchParams.delete("keyword")

            }
            
            navigate(`${pathName}?${searchParams.toString()}`)
        },700)

        return()=>{
            clearTimeout(handler);
        };
    },[searchParams,searchTerm,navigate,pathName])

    const handleCategoryChange= (event)=>{
        const selectedCat = event.target.value;
        if(selectedCat ==="all"){
            params.delete("category")
        } else
        {
            params.set("category",selectedCat)
        }

        navigate(`${pathName}?${params}`)

        setCategory(event.target.value)
    }

    const toggleSortOrder=()=>{
        setSortOrder((previousOrder)=>{
            const newOrder=(previousOrder==="asc") ? "desc" : "asc";
            params.set("sortby",newOrder);
            
            navigate(`${pathName}?${params}`)
            return newOrder;
        })
    }

    const handleClearFilters= ()=>{
        navigate({pathname:window.location.pathname})
        
        // setSortOrder("desc");
        // setCategory("all");
        // setSearchTerm("");

        // params.delete("category");
        // params.delete("sortby");
        
        // navigate(`${pathName}?${params}`)
        // params.delete("category");
    }

    return(

        <div className=" flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* SEARCH BAR */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px]">

                <input type="text" placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <FaSearch className="absolute left-3 text-slate-700 size={20} " />
            </div>

            {/* Category SELECTION UI */}
            <div className="flex sm:flex-row flex-col gap-4 items-center ">
                <FormControl
                    variant="outlined"
                    size="small"
                    >
                        <InputLabel>Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                            className="min-w-[120px] text-slate-800">
                                <MenuItem value="all"> ALL</MenuItem>
                                {categories.map((item) =>(
                                   <MenuItem key={item.categoryId} value={item.categoryName}> {item.categoryName}</MenuItem>
                                   
                                ))}
                            </Select>
                </FormControl>

                {/* SORT BUTTON & CLEAR FILTER */}

                <Tooltip title="Sorted by pirce: asc">
                    <Button onClick={toggleSortOrder} 
                            variant="contained" 
                            color="primary"
                            className="flex items-center gap-2 h-10">
                        Sort By
                        {sortOrder === "asc" ? <FaArrowUp size={20}/> : <FaArrowDown size={20}/>}
                        
                    </Button>
                </Tooltip>
                <button onClick={handleClearFilters}
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none">
                    <FiRefreshCcw/>
                    <span className="font-semibold">
                        Clear Filter
                    </span>  
                </button>
            </div>
        </div>
    );
}

export default Filter;