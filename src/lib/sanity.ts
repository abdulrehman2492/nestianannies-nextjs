import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-06-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}

// Queries
export const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  hero, services, testimonials, faqs
}`;

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id, name, slug, description, icon, image
}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc) {
  _id, question, answer
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id, quote, name, location, rating, image
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0...6] {
  _id, title, slug, excerpt, publishedAt, mainImage, category
}`;

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, body, publishedAt, mainImage, category, excerpt
}`;
