import "./ProductPage.css"
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from "./CartContext"


 function ProductPage() {
    
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")


    //pobranie produktów z bazy
    useEffect(() => {
        async function fetchData() {
        const querySnapshot = await getDocs(collection(db, 'Products'));
        const productList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setProducts(productList);
        setFilteredProducts(productList);
        }

        fetchData();
    }, []);
 //dodanie produktu do koszyka 
    const handleAddToCart = (product, event) => {
        event.preventDefault() 
        addToCart(product)
        alert(`${product.Name} został dodany do koszyka`)
      }
 //zmiana filtru marek
  const handleBrandChange = (e) => {
    const brand = e.target.value
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }
 //zmiana filtru kategorii
  const handleCategoryChange = (e) => {
    const category = e.target.value
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }
//funkcja filtrująca według marki, kategorii i ceny
  const applyFilters = () => {
    let filtered = [...products]

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.Brand))
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.Category))
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number.parseFloat(maxPrice))
    }

    setFilteredProducts(filtered)
  }

  const brands = [...new Set(products.map((product) => product.Brand))]
  const categories = [...new Set(products.map((product) => product.Category))]


    return (
        <div className="product">

        <aside className="filter-sidebar">
            <h2>Filtry</h2>

            <div className="Filter">
            <h3>Kategorie</h3>
            <div className="checkbox-filter">
            {categories.map((category) => (
              <label key={category}>
                <input type="checkbox" value={category} onChange={handleCategoryChange} />
                {category}
              </label>
            ))}
            </div>
            </div>

            <div className="Filter">
            <h3>Cena</h3>
                <div className="Price">
                <label>Min (zł) </label>
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                </div>

                <div className="Price">
                <label>Maks (zł) </label>
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
            </div>

            <div className="Filter">
            <h3>Firma</h3>
            <div className="checkbox-filter">
            {brands.map((brand) => (
              <label key={brand}>
                <input type="checkbox" value={brand} onChange={handleBrandChange} />
                {brand}
              </label>
            ))}
            </div>
            </div>

            <button className="button" onClick={applyFilters}>Zapisz</button>
        </aside>

        <main className="products-container">
            
            <div className="products-grid">
                
            {filteredProducts.map((product) => (
                
                <div className="product-card" key={product.id}>
                <div className="product-image">
                    <img src={product.image} alt={product.Name} />
                </div>

                <div className="product-info">
                    <h2>{product.Brand}</h2>
                    <p className="product-name">{product.Name}</p>
                    <div className="product-price">{product.price.toFixed(2)} zł</div>
                </div>
                <div className="Cart">
                    <button className="button" onClick={(e) => handleAddToCart(product, e)}>Dodaj do koszyka</button>
                </div>

                </div>
                
            ))}

            </div>
        </main>
        
        </div>
    );
}

export default ProductPage