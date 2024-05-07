import { Request, Response } from "express";
import { handleError } from "../helpers/securityFunctions";

const products = [{ id: "1",
                name: "AirForce",
                image:"http://localhost:3000/images/image2.jpg",
                description:"Tenis con suela blanca",
                cost:1200 },
                { id: "2",
                name: "AirForce- beta1",
                image:"http://localhost:3000/images/image3.jpg",
                description:"Tenis con suela blanca",
                cost:700},
                { id: "3",
                name: "AirForce- beta2",
                image:"http://localhost:3000/images/zapatoRojo.jpg",
                description:"Tenis con suelita roja Christian Loubotin",
                cost:800 },
                { id: "4",
                name: "AirForce- beta3",
                image:"http://localhost:3000/images/image4.jpg",
                description:"Tenis con suela blanca",
                cost:800 },
                { id: "5", 
                name: "AirForce- beta4", 
                image:"http://localhost:3000/images/image5.jpg",
                description:"Tenis con suela blanca",
                cost:600 },
                { id: "6", 
                name: "AirForce- alfa1", 
                image:"http://localhost:3000/images/image6.jpg",
                description:"Tenis con suela blanca",
                cost:1500 },
                { id: "7",
                name: "AirForce- alfa2", 
                image:"http://localhost:3000/images/image7.jpg",
                description:"Tenis con suela blanca",
                cost:750 },
                { id: "8", 
                name: "AirForce- alfa3", 
                image:"http://localhost:3000/images/image8.jpg",
                description:"Tenis con suela blanca",
                cost:800 },
                { id: "9", 
                name: "AirForce- alfa4", 
                image:"http://localhost:3000/images/image9.jpg",
                description:"Tenis con suela blanca",
                cost:950 },
                { id: "10", 
                name: "AirForce- Gamma1", 
                image:"http://localhost:3000/images/image10.jpg",
                description:"Tenis con suela blanca",
                cost:1000 },
                { id: "11", 
                name: "AirForce- Gamma2", 
                image:"http://localhost:3000/images/image11.jpg",
                description:"Tenis con suela blanca",
                cost:1100 },
                { id: "12", 
                name: "AirForce- Gamma3", 
                image:"http://localhost:3000/images/image12.jpg",
                description:"Tenis con suela blanca",
                cost:1200 }
                ];

export const getProducts = async (req: Request, res: Response) => {
  try {
    let product= products;
    //const productosOrdenados = products.sort((a, b) => b.cost - a.cost);
   //res.json({status:true,products: productosOrdenados})
  //  if(name!=null){

  //  }
  
   res.json({status:true,products})
  } catch (ex) {
    handleError(res, ex);
  }

};

export const getproduct= async (req: Request, res: Response) => {
  try {
    const idproducto= req.params.id;
    const product = products.find((x)=> x.id===idproducto );

   res.json({status:true, product})
  } catch (ex) {
    handleError(res, ex);
  }

};
//getProductsByLowestCost getProducts  getProductsByHighestCost
export const getProductsByLowestCost = async (req: Request, res: Response) => {
  try {
    console.log("Entramos a ByLowerCost")
    const productosOrdenados = products.slice().sort((a, b) => a.cost - b.cost);
    res.json({ status: true, products: productosOrdenados });
    console.log("products",  productosOrdenados)
  } catch (ex) {
    handleError(res, ex);
  }
};

export const getProductsByHighestCost = async (req: Request, res: Response) => {
  try {
    const productosOrdenadosMA = products.slice().sort((a, b) => b.cost - a.cost);
    res.json({ status: true, products: productosOrdenadosMA });
  } catch (ex) {
    handleError(res, ex);
  }
};





//añadir filtros en esta parte, iniciarlos como nulls
//metodo filter de un arreglo
