import { createClient } from '@supabase/supabase-js';
import { wodahConfig } from '../../../wodah.config';

export async function POST({ request }: { request: Request }) {
  try {
    if (!wodahConfig.supabase.url || !wodahConfig.supabase.anonKey) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(wodahConfig.supabase.url, wodahConfig.supabase.anonKey);

    const { email, nicheId } = await request.json();

    if (!email || !nicheId) {
      return new Response(JSON.stringify({ error: 'Email and nicheId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([{ email, niche_id: nicheId, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('Supabase error:', error);
      return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}