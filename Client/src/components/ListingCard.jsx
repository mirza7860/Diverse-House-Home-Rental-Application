import React, { useState } from "react";
import "../styles/Listingcard.scss";
import {
  ArrowForwardIos,
  ArrowBackIos,
  Favorite,
  ArrowBackIosNew,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setWishlist } from "../redux/state.js";
const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  booking,
}) => {
  const [currentIndex, setcurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setcurrentIndex((prev) => (prev + 1) % listingPhotoPaths.length);
  };
  const goToPrevSlide = () => {
    setcurrentIndex(
      (prev) => (prev - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };
  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translatex(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:8000/${photo.replace("public", "")}`}
                alt={`photo ${index + 1} of  property`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "16px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "16px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>
        {city},{province},{country}
      </h3>
      <p>{category}</p>
      <p>{type}</p>
      <p>
        <span>${price}</span>per night
      </p>
    </div>
  );
};

export default ListingCard;
