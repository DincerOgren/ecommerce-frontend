import ProductCard from "./shared/ProductCard"

const products = [
    {
        "image": "https://placehold.co/600x400",
        "productName": "Wireless Bluetooth Earbuds",
        "description": "Compact and powerful earbuds with noise-cancellation and up to 24 hours of battery life.",
        "specialPrice": 29.99,
        "price": 49.99
      },
      {
        "image": "https://placehold.co/600x400",
        "productName": "Genuine Leather Wallet",
        "description": "Slim, stylish wallet made from 100% genuine leather with RFID protection.",
        "specialPrice": 19.95,
        "price": 34.95
      },
      {
        "image": "https://placehold.co/600x400",
        "productName": "LED Desk Lamp with USB Charging",
        "description": "Adjustable LED lamp with touch control, 5 brightness levels, and built-in USB port.",
        "specialPrice": 24.99,
        "price": 39.99
      }
]


const About = () => {
        return(
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                    About Us
                </h1>
               <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                    <div className="w-full md:w-1/2 text-center md:text-left mr-6">
                        <p className="text-xl mb-4 text-slate-700">
                            At our e-commerce store, we make online shopping simple, affordable, 
                            and reliable. From everyday essentials to unique finds, 
                            we bring you quality products and fast, secure service. 
                            Your satisfaction is our priority — every order, every time.</p>
                    </div>

                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <img src="https://placehold.co/600x400"
                            alt="About Us"
                            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                        </img>
                    </div>
                </div> 

                <div className="py-7 space-y-8">
                    <h1 className="text-slate-800 text-4xl font-bold text-center">
                        Our Products
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((item,i)=>(
                            <ProductCard key={i} 
                                    image={item.image}
                                    description={item.description}
                                    price={item.price}
                                    specialPrice={item.specialPrice}
                                    productName={item.productName}
                                    about={true}/>
                        ))}
                    </div>
                </div>
            </div>
        )
}

export default About