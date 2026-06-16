import {z} from 'zod';

export const registerSchema = z.object({
  name: z.string()
          .min(3, 'Nombre muy corto')
          .max(50, 'Nombre muy largo'), 
  last_name: z.string()
          .min(1, 'Apellidos muy corto')
          .max(50, 'Apellidos muy largo'),
  user_name: z.string()
          .min(5, 'Nombre de usuario muy corto')
          .max(50, 'Nombre de usuario muy largo'),
  password: z
            .string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'La contraseña no es segura'),
 farm_name: z.string()
        .min(3, 'Nombre de finca muy corto')
        .max(50, 'Nombre de finca muy largo')
})