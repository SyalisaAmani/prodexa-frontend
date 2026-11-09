import { useState } from "react";

export const useWishlistService = () => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("prodexa-wishlist");

        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const toggleWishlist = (product) => {
        setWishlist((currentWishlist) => {
            const isExist = currentWishlist.some(
                (item) => item.id === product.id
            );

            const updatedWishlist = isExist ?
            currentWishlist.filter((item) =>
            item.id !== product.id)
            : [...currentWishlist, product];

            localStorage.setItem(
                "prodexa-wishlist",
                JSON.stringify(updatedWishlist)
            );

            return updatedWishlist;
        });
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    return {
        wishlist,
        toggleWishlist,
        isInWishlist,
    };
};