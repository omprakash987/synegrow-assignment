import z from 'zod'; 

export const todoValidatorSchema = z.object({
    title:z.string(),
    description:z.string()
}) 