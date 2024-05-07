import { Router } from 'express';
import { getProducts, getproduct,getProductsByLowestCost, getProductsByHighestCost } from '../controllers/products.controller';

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/lowestCost', getProductsByLowestCost);
productsRouter.get('/highestCost', getProductsByHighestCost);
productsRouter.get('/:id', getproduct);

export default productsRouter;