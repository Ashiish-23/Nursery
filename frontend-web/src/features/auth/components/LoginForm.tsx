import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '../../../app/providers/useAuth';
import type { LoginRequest } from '../../../shared/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginRequestSchema = z.object({
  mobile_number: z.string().min(10).max(15),
  password: z.string().min(6),
});

export const LoginForm: React.FC = () => {
    const { login, loading } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm<LoginRequest>({
        resolver: zodResolver(LoginRequestSchema),
    });

  const handleFormSubmit = async ( data: LoginRequest ): Promise<void> => {
  try {
    await login(data);
  } catch {
    return;
  }
};

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Login</h2>
      <div className="mb-4">
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="text"
          id="mobileNumber"
          {...register('mobile_number')}
          disabled={loading}
        />
        {errors.mobile_number && (
          <span className="text-red-500">{errors.mobile_number.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          disabled={loading}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={loading }>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
