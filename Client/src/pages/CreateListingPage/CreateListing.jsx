import React, { useState } from "react";
import "../../styles/CreateListing.scss";
import Navbar from "../../components/Navbar";
import { categories, types, facilities } from "../../data/data.jsx";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import color from "../../colors/color.js";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const [type, setType] = useState("");

  // Location
  const [formLocation, setformLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  // Counts

  const [guestCount, setguestCount] = useState(2);
  const [bedroomCount, setbedroomCount] = useState(2);
  const [bedCount, setbedCount] = useState(2);
  const [bathroomCount, setbathroomCount] = useState(2);

  // Amenities

  const [amenities, setAmenities] = useState([]);

  // Photos

  const [photos, setPhotos] = useState([]);

  // Description

  const [formdescription, setformDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  // Handle location

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setformLocation({ ...formLocation, [name]: value });
  };

  // Handle Aminities

  const handleselectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((aminity) => aminity !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  // Handle Description

  const handleDescripton = (e) => {
    const { name, value } = e.target;
    setformDescription({
      ...formdescription,
      [name]: value,
    });
  };

  // Handle drag and drop photos

  // Upload drag and drop photos

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDragPhotos = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhotos = (indexRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexRemove));
  };

  // Server Handling

  // State

  const creatorId = useSelector((state) => state.user._id);

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("title", formdescription.title);
      listingForm.append("description", formdescription.description);
      listingForm.append("highlight", formdescription.highlight);
      listingForm.append("highlightDesc", formdescription.highlightDesc);
      listingForm.append("price", formdescription.price);

      // APPEND EACH SINGLE PHOTO

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      // Send a post request

      const response = await fetch("http://localhost:8000/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log("Publish Listing failed", error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-listing">
        <form onSubmit={handlePost}>
          {/* Step 1 */}
          <div className="create-listing_step1">
            <h2>Step 1 : Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have ?</h3>
            <div className="type-list">
              {types.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located ?</h3>
            <div className="full">
              <div className="location">
                <p>Street Adress</p>
                <input
                  type="text"
                  placeholder="Street Adress"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Appartment , Suites etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Appt..,Suite etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      // setguestCount((prev) => {
                      //   return prev === 1 ? 1 : prev - 1;
                      // });
                      guestCount > 1 && setguestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => setguestCount((prev) => prev + 1)}
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      setbedroomCount((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => setbedroomCount((prev) => prev + 1)}
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      setbedCount((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setbedCount((prev) => prev + 1);
                    }}
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      setbathroomCount((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setbathroomCount((prev) => prev + 1);
                    }}
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create-listing_step2">
            <h2>Step 2 : Make your place stand out . </h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    handleselectAmenities(item.name);
                  }}
                >
                  <div className="facilty_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhotos}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhotos(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What make your place attractive and exciting ? </h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formdescription.title}
                onChange={handleDescripton}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                name="description"
                placeholder="Description"
                value={formdescription.description}
                onChange={handleDescripton}
                required
              />
              <p>Highlight</p>
              <textarea
                type="text"
                name="highlight"
                placeholder="Highlight"
                value={formdescription.highlight}
                onChange={handleDescripton}
                required
              />
              <p>Highlight details</p>
              <textarea
                type="text"
                name="highlightDesc"
                placeholder="Highlight details"
                value={formdescription.highlightDesc}
                onChange={handleDescripton}
                required
              />
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input
                type="number"
                placeholder="10"
                name="price"
                className="price"
                value={Number(formdescription.price)}
                onChange={handleDescripton}
                required
              />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
