import z from "zod"

export const VarifySchema=z.object({
    code:z.string().length(6,"varification code must me 6 digit")
})