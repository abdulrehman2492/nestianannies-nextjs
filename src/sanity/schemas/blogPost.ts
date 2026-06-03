export default {
  name: "blogPost", title: "Blog Post", type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
    { name: "mainImage", title: "Main Image", type: "image" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "category", title: "Category", type: "string" },
  ],
};
