export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null;
          display_name: string;
          id: string;
          name: Database['public']['Enums']['category_name_type'];
        };
        Insert: {
          created_at?: string | null;
          display_name: string;
          id?: string;
          name: Database['public']['Enums']['category_name_type'];
        };
        Update: {
          created_at?: string | null;
          display_name?: string;
          id?: string;
          name?: Database['public']['Enums']['category_name_type'];
        };
        Relationships: [];
      };
      menu_items: {
        Row: {
          category_id: string | null;
          created_at: string | null;
          id: string;
          image_url: string | null;
          is_available: boolean | null;
          is_best: boolean | null;
          is_new: boolean | null;
          is_signature: boolean | null;
          name: string;
          note: string | null;
          price: number;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string | null;
          id?: string;
          image_url?: string | null;
          is_available?: boolean | null;
          is_best?: boolean | null;
          is_new?: boolean | null;
          is_signature?: boolean | null;
          name: string;
          note?: string | null;
          price: number;
        };
        Update: {
          category_id?: string | null;
          created_at?: string | null;
          id?: string;
          image_url?: string | null;
          is_available?: boolean | null;
          is_best?: boolean | null;
          is_new?: boolean | null;
          is_signature?: boolean | null;
          name?: string;
          note?: string | null;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_items_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      order_items: {
        Row: {
          created_at: string | null;
          id: string;
          menu_item_id: string;
          order_id: string;
          price: number;
          quantity: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          menu_item_id: string;
          order_id: string;
          price: number;
          quantity: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          menu_item_id?: string;
          order_id?: string;
          price?: number;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string | null;
          id: string;
          status: Database['public']['Enums']['order_status_type'];
          table_no: string;
          total_price: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          status?: Database['public']['Enums']['order_status_type'];
          table_no: string;
          total_price: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          status?: Database['public']['Enums']['order_status_type'];
          table_no?: string;
          total_price?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      category_name_type: 'coffee' | 'non-coffee' | 'dessert';
      order_status_type:
        | 'pending'
        | 'preparing'
        | 'ready'
        | 'served'
        | 'cancelled';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
