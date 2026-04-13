/**
 * Standard Next.js Middleware entry point.
 * This file is required for Next.js and Netlify to detect the middleware.
 * It delegates the logic to src/proxy.ts as per project conventions.
 */
export { proxy as default, config } from './proxy';
