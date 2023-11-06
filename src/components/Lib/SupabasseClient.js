import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
  

const supabaseUrl = "https://dnnzckqhjnbdxvgwktfg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRubnpja3Foam5iZHh2Z3drdGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4ODA0MzAsImV4cCI6MjAxMjQ1NjQzMH0.P5uzn14rJCtj2_LrE3TS7bNMG0ptDIUyUr1jurXnza0"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })