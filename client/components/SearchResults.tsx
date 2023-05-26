import { Slugify } from "@/libs/helpData";
import Link from "next/link";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
export interface data {
  id: number;
  title: string;
  description: string;
  data_type: string;
}

function SearchResults({ data, loading }: { data: data[]; loading: boolean }) {
  return (
    <div className="search-results">
      {data.length > 0 ? (
        data.map((item: data, idx: number) => {
          return (
            <Link
              href={
                item.data_type === "post"
                  ? `/${Slugify(item.title)}`
                  : `categories/${item.title.toLowerCase()}`
              }
              key={idx}
              className="search-results-item"
            >
              <div className="search-results-item-title">
                <span>{item.title}</span>
                <i>{item.data_type}</i>
              </div>
              <p>{item.description}</p>
            </Link>
          );
        })
      ) : (
        <div className="search-results-loading">
          {loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <span>No results!</span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
