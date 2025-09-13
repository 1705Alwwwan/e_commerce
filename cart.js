document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotalElement = document.getElementById('cart-total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCartItems = () => {
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            cartTotalElement.textContent = 'Rp 0';
            return;
        }

        emptyCartMessage.style.display = 'none';
        cartItemsContainer.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <button class="remove-from-cart" data-id="${item.id}">Hapus</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        cartTotalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    };

    const handleRemoveFromCart = (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            alert('Produk berhasil dihapus dari keranjang.');
        }
    };

    cartItemsContainer.addEventListener('click', handleRemoveFromCart);

    renderCartItems();
});