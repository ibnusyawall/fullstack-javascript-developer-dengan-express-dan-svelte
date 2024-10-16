import { redirect } from '@sveltejs/kit';

export async function GET({ cookies }) {
    // Hapus cookie token
    cookies.delete('token', { path: '/' });

    // Hapus cookie user
    cookies.delete('user', { path: '/' });
    
    // Redirect user ke halaman login setelah logout
    throw redirect(302, '/login');
}
