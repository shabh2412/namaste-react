import React, { useState } from 'react';
import { CDN_URL, base_url } from '../utils/constants';
import { initial_lat_long } from '../utils/mockData';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const open_result = ({ metadata, cloudinaryId }) => {
    const metadata_obj = JSON.parse(metadata || "{}");
    console.log({ metadata_obj });
    navigate(`/restaurants/${metadata_obj?.data?.primaryRestaurantId}?lat=${current_lat_long?.lat}&long=${current_lat_long?.long}&res_img=${cloudinaryId}`);
  };

  return (
    <div className='search-main-parent w-full max-w-[30rem] mx-auto'>
      <div className="searchBar flex w-full sticky top-0">
        <TextField
          className='flex-1'
          type="text"
          autoComplete='off'
          name="search"
          id="search"
          label="Search for restaurants"
          variant='outlined'
          value={search_text}
          onChange={handle_search_text_change}
          InputProps={{
            endAdornment: <InputAdornment position='end'>
              <>
                {
                  search_result?.length > 0 &&
                  <IconButton onClick={handle_clear}>
                    <Close />
                  </IconButton>
                }
                <IconButton onClick={search_restaurants} disabled={search_text?.length <= 0} >
                  <SearchIcon />
                </IconButton>
              </>
            </InputAdornment>
          }}
          onKeyDown={(e) => {
            if (e?.key === "Enter" && search_text?.length > 1) {
              search_restaurants();
            }
          }}
        />
      </div>
      <div className="relative">
        {
          search_loading ? <div className="search-result-container absolute top-0 max-h-80 w-[30rem] overflow-hidden p-0 bg-white">
            {
              (new Array(3))?.fill(0)?.map((item, idx) => <div key={`Shimmer-${idx}-loading`}
                className='my-2'
                style={{
                  width: "100%",
                  height: "60px",
                  backgroundColor: "#f0f0f0"
                }} >
                <div style={{ width: "100%", height: "60px" }} className="shimmer-effect"></div>
              </div>)
            }
          </div>
            :
            search_result && search_result?.length > 0 &&
            <div className='search-result-container absolute top-0 max-h-80 overflow-scroll bg-gray-100 w-full p-2 rounded-b shadow-lg'>
              {
                search_result?.map((result, idx) =>
                  <div key={`search-result-${idx}-${result?.cloudinaryId}`} className='search-result-individual-box flex my-4 p-2 justify-start items-center gap-3 bg-white rounded hover:bg-gray-200 cursor-pointer' style={{
                    color: result?.categoryColor
                  }}
                    onClick={() => {
                      console.log(result);
                      open_result({ metadata: result?.metadata, cloudinaryId: result?.cloudinaryId });
                    }}
                  >
                    <div>
                      <img src={`${CDN_URL}${result?.cloudinaryId}`} className='search-result-img h-14 w-14 object-cover'
                      />
                    </div>
                    <div>
                      <p>{result?.text}</p>
                    </div>
                  </div>)
              }
            </div>
        }
      </div>
    </div>
  );
};

export default Search;