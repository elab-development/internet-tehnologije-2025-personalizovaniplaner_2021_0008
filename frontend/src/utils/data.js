// product images
import product1 from "../assets/products/notebook-01.png";
import product2 from "../assets/products/notebook-02.png";
import product3 from "../assets/products/marker-01.png";
import product4 from "../assets/products/pen-01.png";
import product5 from "../assets/products/highlighter-01.png";
import product6 from "../assets/products/planner-01.png";

// category images
import cat1 from "../assets/categories/planner.png";
import cat2 from "../assets/categories/pages.png";
import cat3 from "../assets/categories/stationery.png";

// slider images
import slider1 from "../assets/banner/stationery-1.jpg";
import slider2 from "../assets/banner/stationery-2.jpg";
import slider3 from "../assets/banner/stationery-3.jpg";

// feature images (you can replace these with actual image paths)
import feature1 from "../assets/feature/personalplanner.jpeg";
import feature2 from "../assets/feature/pages.jpeg";
import feature3 from "../assets/feature/quality.jpeg";
import feature4 from "../assets/feature/tree.jpeg";

export const sliderData = [
  {
    id: 0,
    heading: "Valentine's Day Collection",
    title: "Make it special with our exclusive stationery",
    image: slider1,
  },
  {
    id: 1,
    heading: "Planer Sale - Up to 30% Off",
    title: "Get organized with our stylish planners",
    image: slider2,
  },
  {
    id: 2,
    heading: "Additions for Your Stationery Set",
    title: "Make planning more fun with our accessories",
    image: slider3,
  }
];

export const categoriesData = [
  { id: 0, title: "Planners", image: cat1, url: "" },
  { id: 1, title: "Planner pages", image: cat2, url: "" },
  { id: 2, title: "Stationery", image: cat3, url: "" },
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

export const featureData = [
  {
    id: 0,
    title: "Personalized planners",
    text: "Make your planner truly yours with our customizable options.",
    image: feature1,
    
  },
  {
    id: 1,
    title: "Refillable pages",
    text: "Easily swap out pages to keep your planner fresh and organized.",
    image: feature2,
  },
  {
    id:2, 
    title:'Quality assurance', 
    text:'We ensure the highest quality in all our products.',
    image:feature3,
  },
  {
    id:3, 
    title:'Sustainability', 
    text:'We are committed to environmentally friendly practices in all our products.',
    image:feature4,
  }
];

/**Fake users base for testing */
export const usersData = [
  {
    id: 1,
    username: "admin",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    email: "user@test.com",
    password: "user123",
    role: "user",
  },
];