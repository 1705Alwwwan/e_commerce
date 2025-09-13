document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'T-shirt Keren', price: 150000, image: 'https://via.placeholder.com/250x250.png?text=T-shirt' },
        { id: 2, name: 'Celana Jeans Stylish', price: 350000, image: 'https://via.placeholder.com/250x250.png?text=Celana+Jeans' },
        { id: 3, name: 'Jaket Casual', price: 500000, image: 'https://via.placeholder.com/250x250.png?text=Jaket+Casual' },
        { id: 4, name: 'Topi Gaul', price: 75000, image: 'https://via.placeholder.com/250x250.png?text=Topi+Gaul' }
    ];

    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');

    // Ambil data keranjang dari Local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    const renderProducts = () => {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Rp ${product.price.toLocaleString('id-ID')}</p>
                <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
            `;
            productList.appendChild(productCard);
        });
    };

    const handleAddToCart = (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);

            // Tambahkan produk ke keranjang
            if (productToAdd && !cart.find(item => item.id === productId)) {
                cart.push(productToAdd);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert(`${productToAdd.name} telah ditambahkan ke keranjang!`);
            } else if (productToAdd) {
                alert(`${productToAdd.name} sudah ada di keranjang!`);
            }
        }
    };

    productList.addEventListener('click', handleAddToCart);

    renderProducts();
    updateCartCount();
});