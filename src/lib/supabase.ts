import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          preferred_date: string;
          preferred_time: string;
          message: string | null;
          status: "pending" | "confirmed" | "cancelled";
        };
        Insert: {
          name: string;
          email: string;
          phone: string;
          service: string;
          preferred_date: string;
          preferred_time: string;
          message?: string | null;
          status?: "pending" | "confirmed" | "cancelled";
        };
      };
      contacts: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string | null;
          message: string;
        };
      };
    };
  };
};
