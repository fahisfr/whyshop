import "./header.css";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { FiAlignLeft, FiArchive } from "react-icons/fi";
import { ImagePath } from "../../helper/axios";
import SideNav from "../sideNav/SideNav.js";
import axios from "../../helper/axios";
import { showErrorMessage } from "../../features/popUpMessage";
import { useDispatch } from "react-redux";
import { errorHandler } from "../../helper/errorHandler";
import { IProduct } from "../../helper/interfaces";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("auth_token");

  const [showSideNav, setShowSideNav] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [results, setResults] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState("");
  const navRef = useRef(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      e.preventDefault();
      setShowResults(false);
    
      navigate(`/product/${results[focusedIndex].name}`);
    }
  };
  const handleSelection = (index: number) => {
    const selectedItem = results[index];
    selectedItem && navigate(`/product/${selectedItem.name}`);
 
  };
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      setSearchText(value);
      if (value === "") return;
      const { data } = await axios.get(`/products/search?name=${value}`);
      setResults(data?.products);
    } catch (error) {
      dispatch(showErrorMessage(errorHandler(error).message));
    }
  };

  return (
    <header className="header-container" ref={navRef}>
      {/* <SideNav trigger={showSideNav} setTrigger={setShowSideNav} /> */}
      <div className="header-left">
        <FiAlignLeft
          className="header-menu-icon"
          onClick={(e) => setShowSideNav(!showSideNav)}
          color="white"
        />
        <Link to="/">
          <h1>
            WhyShop<span>.com</span>
          </h1>
        </Link>
      </div>
      <div className="header-center" onKeyDown={handleKeyDown}>
        <div className="header-search">
          <input
            type="text"
            max={12}
            className="header-search-input"
            value={searchText}
            onFocus={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
            onChange={onChange}
            placeholder="Search For Products..."
          ></input>
          <div className="header-search-icon">
            {searchText.length > 0 ? (
              <div
                className="clean-icon"
                onClick={() => setSearchText("")}
              ></div>
            ) : (
              <div className="search-icon"></div>
            )}
          </div>
          <div className="search-results">
            <div className="search-results-wrapper">
              {showResults &&
                results.map((item, index) => {
                  return (
                    <div
                      className={`search-result-item ${
                        index === focusedIndex && "item-bg-hover"
                      }`}
                      onMouseDown={() => handleSelection(index)}
                    >
                      <img
                        src={`${ImagePath + item?.imageName}`}
                        alt="product"
                      />
                      <span className="item-name">{item.name}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {token ? (
        <div className="header-right">
          <Link to="/orders">
            <div className="header-action-group">
              <FiArchive size={22} color="white" />
              <span className="header-action-label">Orders</span>
            </div>
          </Link>
          <Link to="/cart">
            <div className="header-action-group">
              <BiCart size={31} color="white" />
              <span className="header-action-label">Cart</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="header-right">
          <div className="header-ls-btns">
            <Link to="/login">
              <button className="ls-btn signin-button">Loign in</button>
            </Link>
            <Link to="/signup">
              <button className="ls-btn register-button">Sign Up</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
