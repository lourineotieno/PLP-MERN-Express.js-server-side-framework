import { v4 as uuidv4 } from 'uuid';

let products = [];

export class Product {
    constructor({ name, description, price, category, inStock }) {
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.inStock = inStock;
    }
}

export const getProducts = () => products;
export const addProduct = (product) => { products.push(product); return product; };
export const getProductById = (id) => products.find(p => p.id === id);
export const updateProduct = (id, data) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    return products[index];
};
export const deleteProduct = (id) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    return products.splice(index, 1)[0];
};
