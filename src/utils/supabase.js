import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function incrementAnimalCount(animalId) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc('increment_animal_count', {
      p_animal_id: animalId
    });
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function getTotalCount() {
  if (!supabase) return null;
  try {
    const { data } = await supabase
      .from('animal_counts')
      .select('count');
    return data.reduce((sum, row) => sum + row.count, 0);
  } catch {
    return null;
  }
}

export async function getAllCounts() {
  if (!supabase) return null;
  try {
    const { data } = await supabase
      .from('animal_counts')
      .select('animal_id, count');
    return data;
  } catch {
    return null;
  }
}
