import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jhxoqzmzltyocubaespi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoeG9xem16bHR5b2N1YmFlc3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNjM5ODAsImV4cCI6MjAxMzgzOTk4MH0.G-pThWKH8FDASVh-RKfJUuvmvvcGRrOCtmGk7USkM-c';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
