import { error, json } from '@sveltejs/kit';


import { SUPABASE_KEY } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'
import { type Database, type Tables, type Enums } from "$lib/supabase";

const supabaseUrl = 'https://qbbdtjzhxfelkpbljvtj.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_KEY!);


export async function GET({ url }) {
    const request_id = url.searchParams.get('id');

    if (!request_id) {
        return json({});
    }

    const res = await supabase.from("payloads").select("*").eq("request_id", request_id);

    return json(res.data);
}