import React, { useState } from 'react';
import { CDN_URL, base_url } from '../utils/constants';
import { initial_lat_long } from '../utils/mockData';

const Search = ({ current_lat_long = initial_lat_long, set_filtered_restaurants = () => { }, list_of_restaurants = [] }) => {

  const [search_result, set_search_result] = useState([]);

  const [search_loading, set_search_loading] = useState(false);

  const clear_result = () => {
    set_search_result([]);
  };


  const [search_text, set_search_text] = useState("");

  const clear_text = () => {
    set_search_text("");
  };

  const handle_clear = () => {
    clear_result();
    clear_text();
    // set_filtered_restaurants(list_of_restaurants);
  };

  const handle_search_text_change = (e) => {
    set_search_text(e?.target?.value);
    if (e?.target?.value === "") {
      clear_result();
      // set_filtered_restaurants(list_of_restaurants);
    }
    else {
      // const filtered_restaurants = list_of_restaurants?.filter(restaurant => restaurant?.info?.name?.toLowerCase()?.includes(search_text?.toLowerCase()));
      // set_filtered_restaurants(filtered_restaurants);
    }
  };

  const search_restaurants = async () => {
    try {
      set_search_loading(true);
      let filteredList = [];
      // if (search_text !== "") {
      //   filteredList = list_of_restaurants?.filter(restaurant => restaurant?.info?.name?.toLowerCase()?.includes(search_text?.toLowerCase()));
      // }
      console.log('searching in server');
      const res = await fetch(`${base_url}/search/suggest?lat=${current_lat_long?.lat}&long=${current_lat_long?.long}&str=${search_text}&trackingId=undefined`);
      const json_data = await res?.json();
      console.log(json_data);
      const { data } = json_data;
      const { suggestions } = data;
      console.log({ suggestions });
      filteredList?.push(...suggestions?.filter(suggestion => suggestion?.type === "RESTAURANT")?.map(item => ({
        ...item,
        // info: {
        //   ...item,
        //   name: item?.text,
        //   cloudinaryImageId: item?.cloudinaryId,
        // }
      })));
      console.log({ filteredList });
      set_search_result(filteredList);
      // set_list_of_restaurants(filteredList);
    } catch (error) {
      console.error(error);
    }
    finally {
      set_search_loading(false);
    }
  };
  return (
    <div className='search-main-parent'>
      <div className="searchBar flex">
        <input
          type="text"
          autoComplete='off'
          name="search"
          id="search"
          placeholder="Search for restaurants and food"
          value={search_text}
          onChange={handle_search_text_change}
        />
        {
          search_result?.length > 0 && <div className='clear-search-result' onClick={handle_clear}>Clear</div>
        }
        <button
          onClick={search_restaurants}
          disabled={search_text?.length <= 0}
        >Search</button>
      </div>
      {
        search_loading ? <div className="search-result-container">
          {
            (new Array(3))?.fill(0)?.map((item, idx) => <div key={`Shimmer-${idx}-loading`} style={{
              width: "480px",
              height: "60px",
              margin: "10px",
              backgroundColor: "#f0f0f0"
            }} >
              <div style={{ width: "100%", height: "60px" }} className="shimmer-effect"></div>
            </div>)
          }
        </div>
          :
          search_result && search_result?.length > 0 &&
          <div className='search-result-container'>
            {
              search_result?.map((result, idx) =>
                <div key={`search-result-${idx}-${result?.cloudinaryId}`} className='search-result-individual-box' style={{
                  color: result?.categoryColor
                }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      maxHeight: "60px",
                      maxWidth: "60px",
                    }}
                  >
                    <img src={`${CDN_URL}${result?.cloudinaryId}`} className='search-result-img' />
                  </div>
                  <div>
                    <p>{result?.text}</p>
                  </div>
                </div>)
            }
          </div>
      }
    </div>
  );
};

export default Search;