import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        try {
            // Ambil data form
            const formData  = await request.formData();
            const email     = formData.get('email');
            const password  = formData.get('password');

            // Kirim data ke API
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                // Jika respons tidak ok, kembalikan error
                return fail(response.status, {
                    success: false,
                    message: result.message || 'Terjadi kesalahan saat menyimpan data',
                    errors: result.errors || [],
                    values: { email, password } // Mengembalikan nilai input untuk mengisi kembali form
                });
            }

            // Set cookie token dan user
            cookies.set('token', result.data.token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 // 1 jam
            });
            cookies.set('user', JSON.stringify(result.data.user), {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 // 1 jam
            });

            // Jika berhasil, return success
            return { success: true };
            
        } catch (error) {
            console.error('Error:', error);
            return fail(500, { 
                success: false,
                message: 'Internal Server Error', 
            });
        }
    }
};
