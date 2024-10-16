import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

    // Ambil cookie 'token'
    const token = event.cookies.get('token');

    // Ambil URL
    const { pathname } = event.url;

    // URL yang tidak memerlukan token (login dan register)
    const publicPaths = ['/login', '/register'];

    // Pengecekan jika URL dimulai dengan /admin
    const isAdminPath = pathname.startsWith('/admin');

    // Jika sudah login dan mencoba mengakses halaman login atau register, redirect ke dashboard
    if (token && publicPaths.includes(pathname)) {
        throw redirect(302, '/admin/dashboard');
    }

    // Jika belum login dan mencoba mengakses /admin, redirect ke login
    if (!token && isAdminPath) {
        throw redirect(302, '/login');
    }

    // Lanjutkan ke permintaan berikutnya
    return await resolve(event);
}
