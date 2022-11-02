import "../styles/navBar.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { FiAlignLeft, FiArchive } from "react-icons/fi";
import { useSelector } from "react-redux";
import SideBar from "./SideBar.js";
import { ImagePath } from "../axios";

function NavBar(props) {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user.userInfo);
  const { products } = useSelector((state) => state.products);
  const [sidebar, setsidebar] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [results, setResults] = useState([]);
  console.log(results);
  const [searchText, setSearchText] = useState("");
  const handleKeyDown = (e) => {
    const { key } = e;

    if (key === "ArrowDown") {
      setFocusedIndex((focusedIndex + 1) % results.length);
    }
    if (key === "ArrowUp") {
      setFocusedIndex((focusedIndex + results.length - 1) % results.length);
    }

    if (key === "Escape") {
      setShowResults(false);
    }
    if (key === "Enter") {
      try {
        e.preventDefault();
        setShowResults(false);
        setSearchText("");
        navigate(`/product/${results[focusedIndex].name}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSelection = (index) => {
    const selectedItem = results[index];
    selectedItem && navigate(`/product/${selectedItem.name}`);
    setSearchText("");
  };
  const SearchProduts = (id) => {
    if (id === "") return setResults([]);
    setResults(products.filter((item) => item.name.toLowerCase().includes(id.toLowerCase())));
  };

  return (
    <div className="navbar">
      <SideBar trigger={sidebar} settrigger={setsidebar} />
      <div className="nav-1-box">
        <FiAlignLeft size={37} onClick={(e) => setsidebar(!sidebar)} color=" white" />
      </div>
      <div className="nav-2-box">
        <Link to="/">
          <h1>
            WhyShop<span>.com</span>
          </h1>
        </Link>
      </div>
      <div className="nav-3-box" onKeyDown={handleKeyDown}>
        <div className="nav-3-1">
          <input
            type="text"
            max={12}
            className="search-input"
            value={searchText}
            onFocus={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
            onChange={(e) => {
              SearchProduts(e.target.value);
              setSearchText(e.target.value);
            }}
            onClick={() => SearchProduts(searchText)}
            placeholder="search for products"
          ></input>
          {searchText.length > 0 ? (
            <div className="icon-cancel"onClick={() => setSearchText("")}></div>
          ) : (
            <div className="icon-search" ></div>
          )}  {showResults && (
          <div className="nav-search-result">
            {results.slice(0, 6).map((item, index) => {
              return (
                <div
                  className={`nav-search-result-item ${index === focusedIndex && "bg-hover"}`}
                  onMouseDown={() => handleSelection(index)}
                >
                  <img src={`${ImagePath + item?.imageId}.jpg`} alt="product" />
                  <span className="nav-search-result-item-name ">{item.name}</span>
                </div>
              );
            })}
          </div>
        )}
        </div>
      
      </div>
      {isAuth ? (
        <div className="nav-4-box">
          <Link to="/orders">
            <FiArchive size={22} color="white" />{" "}
          </Link>
          <span className="nav-4-1-s">Orders</span>
          <Link to="/cart">
            <BiCart size={31} color="white" />
          </Link>
          <span>Cart</span>
        </div>
      ) : (
        <div className="nav-4-box-ls">
          <Link to="/login">
            <button className="nav-4-3-l">Loign in</button>
          </Link>
          <Link to="/signup">
            <button className="nav-4-4-s">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
