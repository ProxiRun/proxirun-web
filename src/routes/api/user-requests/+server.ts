import { error, json } from '@sveltejs/kit';


import { SUPABASE_KEY } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'
import { type Database, type Tables, type Enums } from "$lib/supabase";

const supabaseUrl = 'https://qbbdtjzhxfelkpbljvtj.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_KEY!);


export async function GET({ url }) {
    const user_address = url.searchParams.get('address');

    if (!user_address) {
        return json({});
    }

    const res = await supabase.from("payloads").select("request_id, task_type").eq("requester", user_address);

    return json(res.data);
}