import { error, json } from '@sveltejs/kit';


import { SUPABASE_KEY } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'
import { type Database, type Tables, type Enums } from "$lib/supabase";

const supabaseUrl = 'https://qbbdtjzhxfelkpbljvtj.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_KEY!);


export async function POST({ request }) {
    console.log("in upload payload api")
    const data = await request.json();
    
    console.log("got json data, sending to db")
    const res = await supabase.from("payloads").insert(data);

    console.dir(res)
    return json(
        res.status < 300 && res.status >= 200
    );
}


