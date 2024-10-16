//import fail
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    register: async ({ request }) => {
        try {
            // get form data
            const formData  = await request.formData();
            const name      = formData.get('name');
            const email     = formData.get('email');
            const password  = formData.get('password');

            // insert data with api
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    values: { name, email, password } // Mengembalikan nilai input untuk mengisi kembali form
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
                message: 'Internal Server Error', 
            });
        }
    }
};
