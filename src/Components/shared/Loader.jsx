import { ThreeCircles } from "react-loader-spinner"


const Loader = ({text})=>{
    
    return(

        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex felx-col items-center gap-1">
                <ThreeCircles
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <p className="text-slate-800">{text || "Please wait..."}</p>
            </div>
        </div>
        
    )
}

export default Loader