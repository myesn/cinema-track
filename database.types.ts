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
        Relationships: [
          {
            foreignKeyName: "cinemas_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cinemas_tags: {
        Row: {
          cinema_id: number
          creator_id: string
          id: number
          tag_id: number
        }
        Insert: {
          cinema_id: number
          creator_id: string
          id?: number
          tag_id: number
        }
        Update: {
          cinema_id?: number
          creator_id?: string
          id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cinemas_tags_cinema_id_fkey"
            columns: ["cinema_id"]
            isOneToOne: false
            referencedRelation: "cinemas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cinemas_tags_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cinemas_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          creator_id: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
