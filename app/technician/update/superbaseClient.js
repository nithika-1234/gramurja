import { createClient } from "@supabase/supabase-js"
const supabaseUrl = 'https://tqaejmxdbtnorqvfilrw.supabase.co'
const supabaseAnonKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYWVqbXhkYnRub3JxdmZpbHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2Nzg1NzcsImV4cCI6MjA2OTI1NDU3N30.WQ7VOIG6nIOA92eGnmbQAfXHCDkMJDotZYtvizSGlV4'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)