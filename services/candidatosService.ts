import { supabase } from "../supabase/supabaseClient";

export async function cadastrarCandidato(candidato: any) {

    const { data, error } = await supabase
    .from("candidatos")
    .select("*");

    console.log(data);
    console.log(error);

}





    // const { data, error } = await supabase
    //     .from("candidatos")
    //     .insert([candidato])
    //     .select();

    // if (error) {
    //     console.error(error);
    //     throw error;
    // }

    // return data;