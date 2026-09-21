import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://opnovxlqmfcsduzncjow.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbm92eGxxbWZjc2R1em5jam93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTY5MjYsImV4cCI6MjEwNTUzMjkyNn0.ivYCBT5iXs9cblGXYpneFt_hv0emDYolwe_ta4vqYKU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
