export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cinemas: {
        Row: {
          created_at: string
          creator_id: string
          id: number
          name: string
          remarks: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          id?: number
          name: string
          remarks?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: number
          name?: string
          remarks?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
