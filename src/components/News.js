import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} | NewsBeejala`;
    updateNews();
  },[]);
  // const handlePreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };
  const fetchMoreData = () => {
    setTimeout(async () => {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(apiUrl);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    }, 800);
  };
  return (
    <div className=" flex flex-col justify-center items-center mt-40">
      <div className="header flex flex-col items-center ">
        <h1 className="lg:text-8xl sm:text-4xl uppercase text-center font-bold mb-4 underline underline-offset-8">
          Top Headlines
        </h1>
        <p>({capitalizeFirstLetter(props.category)})</p>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="flex flex-wrap justify-center align-center">
          {articles.map((element) => {
            return (
              <NewsItem
                key={element.url}
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                newsDate={element.publishedAt}
                source={element.source.name}
                author={element.author}
              />
            );
          })}
        </div>
      </InfiniteScroll>
      {/* <div className="join grid grid-cols-2">
          <button
            disabled={page <= 1}
            className="join-item btn btn-outline mt-5 mb-10"
            onClick={handlePreviousClick}
          >
            Previous page
          </button>
          <button
            disabled={
              page >=
              Math.ceil(totalResults / props.pageSize)
            }
            className="join-item btn btn-outline mt-5 mb-10"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div> */}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
