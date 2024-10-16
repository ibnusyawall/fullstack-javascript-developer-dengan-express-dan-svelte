import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request, cookies }) => {
        try {

            // Ambil token dari cookie
            const token = cookies.get('token');

            // get form data
            const formData  = await request.formData();

            const name      = formData.get('name');
            const email     = formData.get('email');
            const password  = formData.get('password');

            // insert data with api
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    name,
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
                    values: { name, email } // Mengembalikan nilai input untuk mengisi kembali form
                });
            }

            // Jika berhasil, return success
            return { success: true };
            
        } catch (error) {
            if (error instanceof Response) {
                // Jika error adalah instance dari Response (seperti redirect), lemparkan kembali
                throw error;
            }
            console.error('Error:', error);
            return fail(500, { 
                success: false,
                message: 'Terjadi kesalahan saat menyimpan data' 
            });
        }
    }
};
