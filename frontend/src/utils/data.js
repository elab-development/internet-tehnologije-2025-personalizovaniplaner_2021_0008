// product images
import product1 from "../assets/products/weekly.jpg";
import product2 from "../assets/products/monthly.jpg";
import product3 from "../assets/products/marker-01.png";
import product4 from "../assets/products/pen-01.png";
import product5 from "../assets/products/highlighter-01.png";
import product6 from "../assets/products/sage green planner.jpg";
import product7 from "../assets/products/cherry red planner.jpg";
import product8 from "../assets/products/fitness.jpg";

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
    heading: "Valentine's Day",
    title: "Surprise your loved ones with our exclusive stationery",
    image: slider1,
    link: "/shop",
  },
  {
    id: 1,
    heading: "Planer Sale - Up to 30% Off",
    title: "Get organized with our stylish planners",
    image: slider2,
    link: "/shop/planners",
  },
  {
    id: 2,
    heading: "Additions for Your Stationery Set",
    title: "Make planning more fun with our accessories",
    image: slider3,
    link: "/shop/stationery",
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
    title: "Weekly pages no grid refill",
    type: "Weekly pages",
    description: "Set of 50 weekly planner pages in A5 size.",
    price: 3.9,
    offerPrice: null,
    cat: "Pages",
    availableInStock: 120,
    color: "White",
    material: "Recycled paper",
    image: product1,
  },
  {
    id: 1,
    title: "Monthly pages calendar refill",
    type: "Monthly pages",
    description: "Set of 12 monthly planner pages in A5 size.",
    price: 1.5,
    offerPrice: null,
    cat: "Pages",
    availableInStock: 100,
    color: "White",
    material: "Recycled paper",
    image: product2,
  },
  {
    id: 2,
    title: "Permanent marker",
    type: "Writing tool",
    description: "High quality permanent marker.",
    price: 2,
    offerPrice: null,
    cat: "Stationery",
    availableInStock: 80,
    color: "Black",
    material: "plastic",
    image: product3,
  },
  {
    id: 3,
    title: "Red Ballpoint Pen",
    type: "Writing tool",
    description: "High quality red ballpoint pen.",
    price: 1.5,
    offerPrice: 1.2,
    cat: "Stationery",
    availableInStock: 30,
    color: "Red",
    material: "plastic",
    image: product4,
  },
  {
    id: 4,
    title: "Flourescent Highlighter",
    type: "Writing tool",
    description: "Highlighter pen for marking important text.",
    price: 1.5,
    offerPrice: 1.2,
    cat: "Stationery",
    availableInStock: 40,
    color: "Yellow",
    material: "plastic",
    image: product5,
  },
  
  
  {
    id: 5,
    title: "Personal Planner - Sage Green (Silver Binder)",
    type:"Small Planners",
    description: "A5 personalized yearly planner with silver binder and sage green cover.",
    price: 34,
    offerPrice: null,
    cat: "Planners",
    availableInStock: 25,
    color: "Sage Green",
    material: "PU leather",
    metalColor: "silver",
    lining: "fabric",
    pockets: 3,
    image: product6,
  },

  {
    id: 6,
    title: "Personal Planner - Cherry red (Gold Binder)",
    type:"Small Planners",
    description: "A4 personalized yearly planner with gold binder and cherry red cover.",
    price: 35,
    offerPrice: null,
    cat: "Planners",
    availableInStock: 29,
    color: "Cherry Red",
    material: "PU leather",
    metalColor: "gold",
    lining: "fabric",
    pockets: 2,
    image: product7,
  },

  {
    id: 8,
    title: "Fitness tracker",
    type: "Trackers",
    description: "Fitness tracker to monitor your daily activities.",
    price: 1.8,
    offerPrice: null,
    cat: "Pages",
    availableInStock: 0,
    color: "white",
    material: "paper",
    image: product8,
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
