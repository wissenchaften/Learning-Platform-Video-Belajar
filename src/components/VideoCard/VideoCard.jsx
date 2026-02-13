import React from "react";
import "./VideoCard.css";

const VideoCard = ({ data }) => {
  return (
    <div className="video-card">
      <div className="card-thumbnail">
        <img src={data.img} alt={data.title} />
      </div>

      <div className="card-content">
        <h4 className="card-title">{data.title}</h4>
        <p className="card-desc">{data.description}</p>

        <div className="card-instructor">
          <img
            src={data.avatar}
            alt={data.instructor}
            className="instructor-avatar"
          />
          <div className="instructor-text">
            <p className="instructor-name">{data.instructor}</p>
            <p className="instructor-role">
              {data.role} di <b>{data.company}</b>
            </p>
          </div>
        </div>

        <div className="card-footer">
          <div className="footer-left">
            <div className="rating">
              <span className="stars">⭐⭐⭐⭐</span>
              <span className="rating-score">
                {data.rating} ({data.reviews})
              </span>
            </div>
          </div>
          <div className="footer-right">
            <span className="price">Rp {data.price}K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
