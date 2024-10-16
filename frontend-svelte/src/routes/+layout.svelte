<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container">
        <a href="/" class="navbar-brand">HOME</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a href="https://santrikoding.com" target="_blank" class="nav-link active" aria-current="page">SANTRIKODING.COM</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container mt-5">
    <slot></slot> <!-- Menampilkan konten halaman yang di-render -->
</div>
