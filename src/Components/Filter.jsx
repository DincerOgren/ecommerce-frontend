import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useState } from "react";
import { FaArrowUp, FaSearch } from "react-icons/fa";

const Filter = () => {
    
    const categories = [

        {categoryId:1 , categoryName:"Cat1"},
        {categoryId:2 , categoryName:"Cat2"},
        {categoryId:3 , categoryName:"Cat3"},
        {categoryId:4 , categoryName:"Cat4"},
        {categoryId:5 , categoryName:"Cat5"},

    ]

    const [category,setCategory] = useState("all");

    const handleCategoryChange= (event)=>{
        setCategory(event.target.value)
    }

    return(

        <div className=" flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* SEARCH BAR */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px]">

                <input type="text" placeholder="Search Products"
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
                    <Button variant="contained" color="primary" className="flex items-center gap-2 h-10">
                        Sort By
                        <FaArrowUp/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

export default Filter;