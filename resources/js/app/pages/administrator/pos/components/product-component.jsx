import { setCarts } from "@/app/redux/product-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductComponent({ product, storeName }) {
    const dispatch = useDispatch();
    const { carts } = useSelector((store) => store.products);

    function add_to_cart(value) {
        const result = carts.find((res) => res.id == value.id);
        console.log('result', value)
        if (!result) {
            dispatch(
                setCarts([
                    ...carts,
                    {
                        ...value,
                        sub_price: 0,
                        pcs: 1,
                    },
                ])
            );
        }
    }

    useEffect(() => {
        if (carts) {
            dispatch(
                setCarts(
                    carts.map((res) => ({
                        ...res,
                        sub_price: storeName == 'Store' ? res.srp : res.shopee,
                    }))
                )
            );
        }
    }, [carts.length, storeName]);
    return (
        <button
            onClick={() => add_to_cart(product)}
            class="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between shadow-lg"
        >
            <div>
                <div class="font-bold flex text-gray-800">{product.name}</div>
                <span class="font-light text-sm text-gray-400">
                    {product.description}
                </span>
            </div>
            <div class="flex flex-row justify-between items-end ">
                <span class="text-lg ">
                    <div className="flex flex-col">
                        <span className="text-gray-800 text-sm flex items-start">
                            SRP:&nbsp;
                            <span className=" text-pink-500">
                                ₱
                                {parseFloat(
                                    product.srp
                                ).toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                            </span>
                        </span>
                        <div className="text-gray-800 text-sm flex items-start">
                            Stock(s): {product.quantity}
                        </div>
                    </div>
                </span>
                <img
                    src={product?.uploads[0]?.file}
                    className="h-20 w-24 object-cover rounded-md"
                    alt=""
                />
            </div>
        </button>
    );
}
