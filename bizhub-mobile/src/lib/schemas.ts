import * as yup from 'yup';
import { EMAIL_RE, PHONE_RE } from './validators';
import type { Vertical } from '@/types';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(EMAIL_RE, 'Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'At least 6 characters'),
});

export type LoginForm = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Too short')
    .max(80),
  email: yup
    .string()
    .required('Email is required')
    .matches(EMAIL_RE, 'Enter a valid email'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(PHONE_RE, 'Enter a valid Kenyan phone number'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'At least 8 characters')
    .matches(/[A-Z]/, 'Include an uppercase letter')
    .matches(/[0-9]/, 'Include a number'),
  businessType: yup
    .mixed<Vertical>()
    .oneOf(['apartment', 'cyber', 'electro', 'pharma', 'resto'])
    .required('Select a business type'),
  businessName: yup
    .string()
    .required('Business name is required')
    .min(2, 'Too short'),
});

export type RegisterForm = yup.InferType<typeof registerSchema>;

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(EMAIL_RE, 'Enter a valid email'),
});

export type ForgotPasswordForm = yup.InferType<typeof forgotPasswordSchema>;

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'At least 8 characters')
    .matches(/[A-Z]/, 'Include an uppercase letter')
    .matches(/[0-9]/, 'Include a number'),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export type ResetPasswordForm = yup.InferType<typeof resetPasswordSchema>;

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'At least 8 characters')
    .matches(/[A-Z]/, 'Include an uppercase letter')
    .matches(/[0-9]/, 'Include a number'),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});

export type ChangePasswordForm = yup.InferType<typeof changePasswordSchema>;

export const mpesaPaySchema = yup.object({
  phone: yup
    .string()
    .required('Phone is required')
    .matches(PHONE_RE, 'Enter a valid Kenyan phone number'),
});

export type MpesaPayForm = yup.InferType<typeof mpesaPaySchema>;