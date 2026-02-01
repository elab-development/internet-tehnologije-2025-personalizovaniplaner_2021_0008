// product images
import product1 from "../assets/products/notebook-01.png";
import product2 from "../assets/products/notebook-02.png";
import product3 from "../assets/products/marker-01.png";
import product4 from "../assets/products/pen-01.png";
import product5 from "../assets/products/highlighter-01.png";
import product6 from "../assets/products/planner-01.png";

// category images
import cat1 from "../assets/categories/notebooks.png";
import cat2 from "../assets/categories/pens.png";
import cat3 from "../assets/categories/markers.png";
import cat4 from "../assets/categories/planners.png";
import cat5 from "../assets/categories/stickers.png";

// slider images
import slider1 from "../assets/banner/stationery-1.jpg";
import slider2 from "../assets/banner/stationery-2.jpg";

export const sliderData = [
  {
    id: 0,
    heading: "Naslov 1",
    title: "Slogan 1",
    image: slider1,
  },
  {
    id: 1,
    heading: "Naslov 2",
    title: "Slogan 2",
    image: slider2,
  },
];

export const categoriesData = [
  { id: 0, title: "Notebooks", image: cat1, url: "" },
  { id: 1, title: "Pens", image: cat2, url: "" },
  { id: 2, title: "Markers", image: cat3, url: "" },
  { id: 3, title: "Planners", image: cat4, url: "" },
  { id: 4, title: "Accessories", image: cat5, url: "" },
];

export const productData = [
  {
    id: 0,
    title: "A5 Hardcover Notebook",
    price: 12,
    offerPrice: 9.9,
    cat: "Notebooks",
    image: product1,
    rating: 5,
  },
  {
    id: 1,
    title: "Minimal A4 Notebook",
    price: 18,
    offerPrice: 0,
    cat: "Notebooks",
    image: product2,
    rating: 4,
  },
  {
    id: 2,
    title: "Permanent Marker - Black",
    price: 15,
    offerPrice: 13.5,
    cat: "Markers",
    image: product3,
    rating: 5,
  },
  {
    id: 3,
    title: "Black Ballpoint Pen",
    price: 1.2,
    offerPrice: 0,
    cat: "Pens",
    image: product4,
    rating: 4,
  },
  {
    id: 4,
    title: "Fluorescent Highlighter",
    price: 1.8,
    offerPrice: 1.5,
    cat: "Markers",
    image: product5,
    rating: 4,
  },
  {
    id: 5,
    title: "Daily Planner 2026",
    price: 22,
    offerPrice: 19.9,
    cat: "Planners",
    image: product6,
    rating: 5,
  },
];