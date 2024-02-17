import React, { useState } from "react";
import "../../styles/CreateListing.scss";
import Navbar from "../../components/Navbar";
import { categories, types, facilities } from "../../data/data.jsx";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import color from "../../colors/color.js";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
const CreateListing = () => {
  // Upload drag and drop photos
  const [photos, setPhotos] = useState([]);

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
  return (
    <>
      <Navbar />

      <div className="create-listing">
        <form>
          {/* Step 1 */}
          <div className="create-listing_step1">
            <h2>Step 1 : Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div className="category" key={index}>
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have ?</h3>
            <div className="type-list">
              {types.map((item, index) => (
                <div className="type">
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
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input type="text" placeholder="City" name="city" required />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
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
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>0</p>
                  <AddCircleOutline
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
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>0</p>
                  <AddCircleOutline
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
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>0</p>
                  <AddCircleOutline
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
                    sx={{
                      fontSize: "24px",
                      cursor: "pointer",
                      "&:hover": { color: color.pinkred },
                    }}
                  />
                  <p>0</p>
                  <AddCircleOutline
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
                <div className="facility" key={index}>
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
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
