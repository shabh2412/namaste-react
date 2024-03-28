const { Router } = require("express");
require("dotenv").config();
const fetch = require('cross-fetch');

const restaurant_router = Router();

const base_url = process.env.BASE_URL;

restaurant_router.get(`/list`, async (req, res) => {
  try {
    const { lat, long } = req.query;
    const response = await fetch(`${base_url}//list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });
    if (!response.ok) {
      throw new Error('Error while fetching data');
    }
    const result = await response?.json();
    // console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

restaurant_router.get(`/search/suggest`, async (req, res) => {
  try {
    const { lat, long, str: search_text } = req.query;
    const response = await fetch(`${base_url}/search/suggest?lat=${lat}&lng=${long}&str=${search_text}&trackingId=undefined`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });
    if (!response.ok) {
      throw new Error('Error while fetching data');
    }
    const result = await response?.json();
    // console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

restaurant_router.get(`/menu`, async (req, res) => {
  try {
    const { lat, long, restaurantId, } = req.query;

    console.log({ lat, long, restaurantId });

    const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${restaurantId}&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });
    if (!response.ok) {
      throw new Error('Error while fetching data');
    }
    const result = await response?.json();
    res.send(result);

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }


});

module.exports = { restaurant_router };