import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types matching the database schema
export type UserRole = "parent" | "nanny" | "admin";
export type NannyStatus = "draft" | "pending_review" | "approved" | "rejected" | "suspended";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  username: string;
  mobile: string;
  avatar_url?: string;
  city?: string;
  state?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export interface NannyProfile {
  id: string;
  profile_id: string;
  status: NannyStatus;
  bio?: string;
  years_of_experience: number;
  hourly_rate: number;
  languages: string[];
  services: string[];
  certified_courses: string[];
  availability: string;
  monthly_service: boolean;
  age?: number;
  gender?: string;
  avg_rating: number;
  review_count: number;
  // Documents
  gov_id_front?: string;
  gov_id_back?: string;
  sin_number?: string;
  criminal_record_check?: string;
  // Profile
  profile_image?: string;
  rejection_reason?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  profile?: Profile;
}

export interface Booking {
  id: string;
  booking_number: string;
  parent_id: string;
  nanny_id: string;
  booking_date: string;
  slots: BookingSlot[];
  subtotal: number;
  commission_rate: number;
  commission_amount: number;
  nanny_amount: number;
  total_amount: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  mobile?: string;
  created_at: string;
  parent?: Profile;
  nanny?: NannyProfile;
}

export interface BookingSlot {
  start_time: string;
  end_time: string;
  charge: number;
}

export interface Review {
  id: string;
  booking_id: string;
  parent_id: string;
  nanny_id: string;
  rating: number;
  comment: string;
  created_at: string;
}
