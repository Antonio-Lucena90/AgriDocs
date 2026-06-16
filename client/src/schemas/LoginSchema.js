import {z} from 'zod';

export const loginSchema = z.object({
  user_name: z.string()
        .min(5, 'Nombre de usuario muy corto')
        .max(50, 'Nombre de usuario muy largo'),
  password: z 
          .string()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'Contraseña no segura')
})