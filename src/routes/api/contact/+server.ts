import { error, json } from '@sveltejs/kit';


import { SUPABASE_KEY } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'
import { type Database, type Tables, type Enums } from "$lib/supabase";

const supabaseUrl = 'https://qbbdtjzhxfelkpbljvtj.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_KEY!);


export async function POST({ request }) {
    const data = await request.json();
    
    const res = await supabase.from("enquiries").insert(data);

    return json(
        res.status < 300 && res.status >= 200
    );
}