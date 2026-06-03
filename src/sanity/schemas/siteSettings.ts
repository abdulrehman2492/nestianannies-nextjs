export default {
  name: "siteSettings", title: "Site Settings", type: "document",
  fields: [
    { name: "title", title: "Site Title", type: "string" },
    { name: "description", title: "Meta Description", type: "text" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "address", title: "Address", type: "text" },
    { name: "commissionRate", title: "Commission Rate (%)", type: "number" },
    { name: "radiusKm", title: "Search Radius (km)", type: "number" },
  ],
};
