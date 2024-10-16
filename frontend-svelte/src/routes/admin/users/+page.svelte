<script>

    //import sidebar menu
    import SidebarMenu from "../../../components/SidebarMenu.svelte";

    import { enhance } from "$app/forms";

    /** @type {import('./$types').PageLoad} */
    export let data; // Data ini berisi props { users } dari fungsi load
</script>

<div class="container mt-5 mb-5">
    <div class="row">
        <div class="col-md-3">
            <SidebarMenu />
        </div>
        <div class="col-md-9">
            <div class="card border-0 rounded-3 shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span>USERS</span>
                    <a href="/admin/users/create" class="btn btn-sm btn-success rounded shadow-sm border-0">ADD USER</a>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-bordered mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email Address</th>
                                <th scope="col" style="width: 20%;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.users as user}
                                <tr>
                                    <td>{ user.name }</td>
                                    <td>{ user.email }</td>
                                    <td class="text-center">
                                        <a href="/admin/users/edit/{user.id}" class="btn btn-warning btn-sm">EDIT</a>
                                        <form method="POST" action="?/delete" use:enhance style="display: inline;">
                                            <input type="hidden" name="id" value={user.id} />
                                            <button type="submit" class="btn btn-danger btn-sm">DELETE</button>
                                        </form>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
