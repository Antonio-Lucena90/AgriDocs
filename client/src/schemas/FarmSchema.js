import { z } from 'zod';

export const farmSchema = z.object({
  name: z.string()
    .min(2, 'El nombre es demasiado corto')
    .max(150, 'El nombre es demasiado largo'),
  location: z.string()
    .max(255, 'Ubicación demasiado larga')
    .optional()
    .or(z.literal('')),
  hectares: z.preprocess(
    (val) => val === '' ? undefined : Number(val),
    z.number({ invalid_type_error: 'Introduce un número válido' })
      .positive('Debe ser mayor que 0')
      .optional()
  ),
  description: z.string()
    .max(1000, 'Descripción demasiado larga')
    .optional()
    .or(z.literal('')),
})
