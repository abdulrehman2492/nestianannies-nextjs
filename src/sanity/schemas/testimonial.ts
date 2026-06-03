export default {
  name: "testimonial", title: "Testimonial", type: "document",
  fields: [
    { name: "quote", title: "Quote", type: "text" },
    { name: "name", title: "Name", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "rating", title: "Rating (1-5)", type: "number" },
    { name: "image", title: "Avatar", type: "image" },
  ],
};
