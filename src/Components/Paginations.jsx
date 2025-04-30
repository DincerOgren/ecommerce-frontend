import { Pagination } from "@mui/material"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const Paginations = ({totalPageCount,totalProductCount})=>{

    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const paramValue = searchParams.get("page") ? Number(searchParams.get("page")) : 1;


    const onChangeHandler = (event,value) =>{

        params.set("page",value.toString());
        navigate(`${pathname}?${params}`);
    }
    return(
  
                <Pagination 
                    count={totalPageCount}
                    page={paramValue}
                    defaultPage= {1}
                    siblingCount ={1}
                    boundaryCount = {1}
                    shape="rounded" 
                    onChange={onChangeHandler}/>
      
    )
}

export default Paginations