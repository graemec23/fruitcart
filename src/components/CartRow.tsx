import React, { FunctionComponent } from 'react';

import { CartType } from '../interface';

const CartRow: FunctionComponent<CartType> = ({
  product,
  handleRemoveProduct,
  handleQuantityChange,
  getQuantityAfterDiscount
}) => {
  return (
    <>
    {
      (product.quantity >= 1) && (

        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{product.title}</span>
          <a
            title="remove item"
            onClick={(e) => handleRemoveProduct(e, product.id)}
            href="/#"
            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
          >
            Remove
          </a>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button
          onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
          </svg>
        </button>

        <input
          className="mx-2 border text-center w-8"
          type="text"
          min="1"
          pattern="[0-9]*"
          value={product.quantity}
          onChange={(e) =>
            handleQuantityChange(product.id, parseInt(e.target.value))
          }
        />

        <button
          onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
          </svg>
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        £{product.price.toFixed(2)}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        £
        {(product.price * Number(getQuantityAfterDiscount(product.id))).toFixed(
          2
        )}
      </span>
    </div>
      )
    }
    </>
  )
}

export default CartRow
