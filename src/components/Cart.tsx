import React, { useState, FormEvent } from 'react';
import CartRow from './CartRow';

import products from '../api/products.json';

import { ProductType } from '../interface';


const Cart = () => {
  const [scannedItems, setScannedItems] = useState<string>('')
  const [cartItems, setCartItems] = useState<ProductType[]>([])

   const itemCount = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  const removeProduct = (products: ProductType[], id: number) =>
    products.filter((item) => item.id !== id);

  const handleRemoveProduct = (e: FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setCartItems(removeProduct(cartItems, id));
  }

  const handleQuantityChange = (id: number, value: number) => {
    if (value < 1) {
      return setCartItems(removeProduct(cartItems, id))
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  }

  const handleAddToCart = (scannedItems: string) => {
    let formattedItems = scannedItems
      .split(',')
      .map((item: string) => item.trim())
      .reduce((acc, cur, index) => ({ ...acc, [cur]: acc[cur] + 1 || 1 }), []);

    let convertListToArray = Object.entries(formattedItems).map((item) => {
      const [title, quantity] = item

      return {
        title,
        quantity
      }
    });

    let addProductsToCart = products.filter((item) =>
      convertListToArray.map((mlist) => {
        if (item.title === mlist.title) {
          item.quantity = mlist.quantity
        }

        return item
      })
    );

    console.log(scannedItems.length)

      if(scannedItems.length){
        setCartItems(addProductsToCart)
      }

  }

  const getTotalValue = cartItems.reduce(
    (acc, currentValue) => acc + currentValue.quantity * currentValue.price,
    0
  );


  return (
    <div className="container mx-auto mt-10">

      {cartItems.length === 0 && (
      <div className="w-1/4">
        <h1>Fruit Cart</h1>

        <p className="text-xs mt-2 mb-2">Please enter values Apple, Apple, Orange, add a comma after each value</p>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="scannedItems"
        >
          Enter Scanned Items
        </label>
        <input
          id="scannedItems"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8"
          type="text"
          value={scannedItems}
          onChange={(e) => setScannedItems(e.target.value)}
          placeholder="Enter scanned items"
        />

        <button
          disabled={!scannedItems}
          className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
          onClick={() => handleAddToCart(scannedItems)}
        >
          Add items to cart
        </button>
      </div>
      )}

      {cartItems.length > 0 && (
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{itemCount} items</h2>
            </div>

            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>

            {cartItems.map((product) => (
              <CartRow
                key={product.id}
                product={product}
                handleRemoveProduct={handleRemoveProduct}
                handleQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {itemCount}
              </span>
              <span className="font-semibold text-sm"></span>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>£{getTotalValue.toFixed(2)}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
