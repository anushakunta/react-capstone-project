import { createContext, useState, useEffect, use } from "react";

import SHOP_DATA from "../shop-data.js";

//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [ categoriesMap,setCategoriesMap ] = useState();

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    //     //setProducts(SHOP_DATA);
    // } , []);  

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    }, []);
    const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}