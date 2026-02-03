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
import cat3 from "../assets/categories/stationaryy.png";

// slider images
import slider1 from "../assets/banner/stationery-1.jpg";
import slider2 from "../assets/banner/stationery-2.jpg";
import slider3 from "../assets/banner/stationery-3.jpg";

// feature images 
import feature1 from "../assets/feature/personalplanner.jpeg";
import feature2 from "../assets/feature/pages.jpeg";
import feature3 from "../assets/feature/quality.jpeg";
import feature4 from "../assets/feature/tree.jpeg";

//payment images
import visaIcon from "../assets/payments/visa.png"
import mastercardIcon from "../assets/payments/masterdcard.png"
import paypalIcon from "../assets/payments/paypal.png"

//logo image
import logo from "../assets/logo/logo_build_a_planner.png";

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
  {
    id: 0,
    title: "Planners",
    image: cat1,
    description: "Customize your planner to fit your lifestyle."
  },
  {
    id: 1,
    title: "Planner pages",
    image: cat2,
    description: "Refillable pages for flexible planning."
  },
  {
    id: 2,
    title: "Stationery",
    image: cat3,
    description: "Pens, markers, and accessories for your desk."
  }
];

export const productData = [
  {
    id: 0,
    title: "A5 Hardcover Notebook",
    price: 12,
    offerPrice: 9.9,
    cat: "Notebooks",
    image: product1,
  },
  {
    id: 1,
    title: "Minimal A4 Notebook",
    price: 18,
    offerPrice: null,
    cat: "Notebooks",
    image: product2,
  },
  {
    id: 2,
    title: "Permanent Marker - Black",
    price: 15,
    offerPrice: 13.5,
    cat: "Markers",
    image: product3,
  },
  {
    id: 3,
    title: "Black Ballpoint Pen",
    price: 1.2,
    offerPrice: null,
    cat: "Pens",
    image: product4,
  },
  {
    id: 4,
    title: "Fluorescent Highlighter",
    price: 1.8,
    offerPrice: 1.5,
    cat: "Markers",
    image: product5,
  },
  {
    id: 5,
    title: "Daily Planner 2026",
    price: 22,
    offerPrice: 19.9,
    cat: "Planners",
    image: product6,
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
  {
    id: 3,
    username: "tester",
    email: "tester@test.com",
    password: "Tester123!",
    role: "user",
  },
];

export const paymentIcons = [
  { id: 0, title: "Visa", image: visaIcon },
  { id: 1, title: "MasterCard", image: mastercardIcon },
  { id: 2, title: "PayPal", image: paypalIcon },
];

export const siteLogo = logo;
