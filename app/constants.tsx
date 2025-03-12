export const NAVBAR_LINKS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Scan",
    href: "/scan",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const Filters = [
  {
    title: "Categories",
    key: "category",
    options: [
      { label: "Abstract", value: "abstract" },
      { label: "Classic", value: "classic" },
      { label: "Modern", value: "modern" },
      { label: "Nature", value: "nature" },
    ],
  },
  {
    title: "Sort By",
    key: "sortBy",
    options: [
      { label: "For You", value: "for_you" },
      { label: "Newest", value: "newest" },
      { label: "Most Commented", value: "most_commented" },
    ],
  },
  {
    title: "Format",
    key: "format",
    options: [
      { label: "Poster", value: "poster" },
      { label: "Social Media Post", value: "social_media_post" },
      { label: "Billboard", value: "billboard" },
      { label: "UI Kit", value: "ui_kit" },
    ],
  },
  {
    title: "Popularity",
    key: "popularity",
    options: [
      { label: "1000+ Likes", value: "1000_likes" },
      { label: "500+ Likes", value: "500_likes" },
      { label: "100+ Likes", value: "100_likes" },
      { label: "50+ Likes", value: "50_likes" },
    ],
  },
  {
    title: "Favorite",
    key: "favorite",
    options: [{ label: "Liked by You", value: "liked_by_you" }],
  },
  {
    title: "Colors",
    key: "colors",
    options: [
      { label: "Red", value: "#FF3B30", color: true },
      { label: "Green", value: "#34C759", color: true },
      { label: "Blue", value: "#007AFF", color: true },
      { label: "Orange", value: "#FF6E00", color: true },
      { label: "Yellow", value: "#FFCC00", color: true },
      { label: "Purple", value: "#AF52DE", color: true },
    ],
  },
];
