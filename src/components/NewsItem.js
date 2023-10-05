import React from "react";
import "./css/NewsItem.css";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, newsDate, source, author } =
      props;
    return (
      <div className="news-card card lg:w-96 sm:w-48 glass m-2">
        <figure>
          <img
            src={imageUrl || "https://wallpapercave.com/wp/wp7002078.png"}
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions flex flex-col">
            <div className="flex flex-col">
              <div className="badge badge-sm">{new Date(newsDate).toGMTString()}</div>
              <div className="badge badge-sm">
                {author ? author : "Unknown"}({source})
              </div>
            </div>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm ">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
export default NewsItem;