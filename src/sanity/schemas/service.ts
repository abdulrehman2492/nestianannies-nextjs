export default {
  name: "service", title: "Service", type: "document",
  fields: [
    { name: "name", title: "Service Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "description", title: "Description", type: "text" },
    { name: "icon", title: "Icon (Lucide name)", type: "string" },
    { name: "image", title: "Image", type: "image" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
