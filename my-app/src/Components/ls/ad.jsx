import React from "react";
import { BsFillXCircleFill,BsPencilSquare } from "react-icons/bs";

const ad = ({ id, name, price, description, image, onDelete,onEdit }) => {
    const handleDeleteClick = () => {
        onDelete(id);
    };

    const handleEditClick = () => {
        onEdit(id);
    };

    return (
        <div className="ad">
            <img src={image} alt={name} className="card-img" />
            <div className="card-details">
                <h3 className="card-title">{name}</h3>
                <p className="card-description">{description}</p>
                <section className="card-price">
                    <div className="price">Rs. {price}</div>
                </section>
            </div>
            <div className="edit-remove-icons">
                <div className="edit-item" onClick={handleEditClick}>
                    <BsPencilSquare /> {/* Edit icon */}
                </div>
            <div className="remove-item" onClick={handleDeleteClick}>
                <BsFillXCircleFill />
            </div>
        </div>
        </div>
    );
};

export default ad;
