import React, { useEffect, useState } from "react";
import "../../styles/ListingDetails.scss";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { facilities } from "../../data/data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Navbar from "../../components/Navbar";

const ListingDetails = () => {
  // Local state
  const [Loading, setLoading] = useState(true);
  const [listing, setLisitng] = useState(null);
  const [daterange, setDaterange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { listingId } = useParams();

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/properties/${listingId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setLisitng(data);
      setLoading(false);
    } catch (error) {
      console.log("fetch Listing Details failed", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // Booking Calender
  const handleSelect = (ranges) => {
    console.log(ranges);
    setDaterange([ranges.selection]);
  };

  const start = new Date(daterange[0].startDate);
  const end = new Date(daterange[0].endDate);
  // Day
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  return Loading ? (
    <>
      <Navbar />
      <Loader />
    </>
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:8000/${item?.replace("public", "")}`}
              alt="list image"
            />
          ))}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bath(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:8000/${listing.creator.profileimagepath?.replace(
              "public",
              ""
            )}`}
            alt=""
          />
          <h3>
            Hosted by {listing.creator.firstname} {listing.creator.lastname}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers ?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <hr />

          <div>
            <h2>How long do you want to stay ? </h2>
            <div className="date-range-calendar">
              <DateRange ranges={daterange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${listing.price} x {dayCount} night
                </h2>
              )}
              <h2>Total price : ${listing.price * dayCount}</h2>
              <p>Start Date : {daterange[0].startDate.toDateString()}</p>
              <p>End Date : {daterange[0].endDate.toDateString()} </p>

              <button className="button" type="submit">
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
