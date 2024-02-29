import React, { useEffect, useState } from "react";
import "../styles/LISTING.scss";
import { categories } from "../data/data.jsx";
import ListingCard from "./ListingCard.jsx";
import Loader from "./Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state.js";
const Listings = () => {
  const [Loading, setLoading] = useState(true);
  const [selectedCategory, setselectedCategory] = useState("All");
  const dispatch = useDispatch();

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:8000/properties?category=${selectedCategory}`
          : "http://localhost:8000/properties",
        {
          method: "GET",
        }
      );
      const listings = await response.json();
      dispatch(setListings({ listings }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);
  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className="category"
            key={index}
            onClick={() => setselectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      {Loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
                key={_id}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
