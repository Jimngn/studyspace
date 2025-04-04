import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phvyrqnosuazryxyvbcc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBodnlycW5vc3VhenJ5eHl2YmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTY0ODQsImV4cCI6MjA1OTM3MjQ4NH0.KiltF4Lqqwgi9rm7flj34yZfBdt_hOdwKgeoKfwnWrM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 