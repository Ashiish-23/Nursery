import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '../../../app/providers/useAuth';
import type { RegisterRequest } from '../../../shared/types/auth';

const RegisterRequestSchema = z
  .object({
    full_name: z.string().min(3, 'Full name must be at least 3 characters'),
    mobile_number: z
      .string()
      .regex(/^[0-9]{10,15}$/, 'Enter a valid mobile number'),
    email: z.string().email('Enter a valid email').optional().or(z.literal('')),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['B2C_BUYER', 'B2B_BUYER', 'NURSERY_SELLER']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type RegisterFormData = z.infer<typeof RegisterRequestSchema>;

export const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterFormData>({
      resolver: zodResolver(RegisterRequestSchema),
      defaultValues: {
        role: 'B2C_BUYER',
      },
    });

  const { register: registerUser, loading } = useAuth();

  const handleFormSubmit = async (
    data: RegisterFormData
  ): Promise<void> => {
    const request: RegisterRequest = {
      full_name: data.full_name,
      mobile_number: data.mobile_number,
      email: data.email || undefined,
      password: data.password,
      role: data.role,
    };

    try {
      await registerUser(request);
    } catch {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Register</h2>

      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...register('full_name')}
          disabled={loading}
        />
        {errors.full_name && <span>{errors.full_name.message}</span>}
      </div>

      <div>
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          id="mobileNumber"
          type="text"
          {...register('mobile_number')}
          disabled={loading}
        />
        {errors.mobile_number && (
          <span>{errors.mobile_number.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          disabled={loading}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          disabled={loading}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          disabled={loading}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          {...register('role')}
          disabled={loading}
        >
          <option value="B2C_BUYER">B2C Buyer</option>
          <option value="B2B_BUYER">B2B Buyer</option>
          <option value="NURSERY_SELLER">Nursery Seller</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  );
};