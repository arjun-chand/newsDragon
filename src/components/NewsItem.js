import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-4">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: 0,
            }}
          >
            <span class=" badge rounded-pill bg-danger">  {source}</span>
          </div>

        

          <img
            src={
              !imageUrl
                ? "https://media.wired.com/photos/65ce6d324b8e8302c85d15e2/191:100/w_1280,c_limit/Live-TV-Had-A-Good-Week-Culture-JON_DESK_S29E001_021224_MW_0004.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              <h6>
                <span class="badge text-bg-secondary">New</span>
              </h6>
            </h5>
            <p className="card-text">{description}</p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">
              By{author ? author : "Unknown"} on {new Date(date).toGMTString()}{" "}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
