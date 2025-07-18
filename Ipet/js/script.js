const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    if (!email.value.includes('@') || name.value.length < 2) {
      e.preventDefault();
      alert('Por favor, completa el formulario correctamente.');
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const productosContainer = document.getElementById('productos');
  const contadorCarrito = document.getElementById('contador-carrito');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const productos = [
    {
      id: 1,
      title: 'ABC SUELDOS PETROLEROS',
      price: 25000,
      image: '../image/capacitaciones/abc_liquidacion_sueldos.jpg'
    },
    {
      id: 2,
      title: 'DESARROLLO ORGANIZACIONAL',
      price: 45000,
      image: '../image/capacitaciones/curso1.jpg'
    },
    {
      id: 3,
      title: 'SELECCION Y EVALUACION ',
      price: 38000,
      image: '../image/capacitaciones/Seleccion_de_personal.jpg'
    },
    {
      id: 4,
      title: 'HABILIDADES BLANDAS PERFIL LABORAL',
      price: 48000,
      image: '../image/capacitaciones/habilidades_blandas.jpeg'
    },
    {
      id: 5,
      title: 'TRADUCCION INGLES BASICO',
      price: 48000,
      image: '../image/capacitaciones/Traduccion_ingles.jpeg'
    },
    {
      id: 6,
      title: 'ENTRVISTAS LABORALES EFECTIVAS ',
      price: 48000,
      image: '../image/capacitaciones/entrevistas_laborales_efectivas.jpg'
    },
    {
      id: 7,
      title: 'TALLER DE EMPLEABILIDAD',
      price: 48000,
      image: '../image/capacitaciones/empleabilidad.jpg'
    },
    {
      id: 8,
      title: 'CONTROL INTERNO PARA FUNCIONAR',
      price: 48000,
      image: '../image/capacitaciones/control_interno_como_herramienta.jpg'
    },
  ];

  productos.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('producto-card');
    card.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>Precio: $${producto.price}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    productosContainer.appendChild(card);
  });

  document.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      agregarAlCarrito(producto);
    });
  });

  function agregarAlCarrito(producto) {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
  }

  function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    }
  }

  actualizarCarrito();

  
});
document.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  const vaciarBtn = document.getElementById('vaciar-carrito');
  const seguirBtn = document.getElementById('seguir-comprando');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function renderCarrito() {
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
      listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
      totalSpan.textContent = '0';
      return;
    }

    carrito.forEach(producto => {
      const subtotal = producto.price * producto.cantidad;

      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto-carrito');
      productoDiv.innerHTML = `
        <img src="${producto.image}" alt="" width="80">
        <div class="info-producto">
          <h4>${producto.title || 'Producto sin título'}</h4>
          <p>Precio unitario: $${producto.price}</p>
          <p>Cantidad: 
            <button class="restar" data-id="${producto.id}">-</button>
            <span>${producto.cantidad}</span>
            <button class="sumar" data-id="${producto.id}">+</button>
          </p>
          <p>Subtotal: $${subtotal}</p>
          <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        </div>
      `;

      listaCarrito.appendChild(productoDiv);
    });

    const total = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);
    totalSpan.textContent = total;
  }

  function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  
  function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarLocalStorage();
    renderCarrito();
  }

  function cambiarCantidad(id, incremento) {
    const producto = carrito.find(p => p.id === id);
    if (!producto) return;

    producto.cantidad += incremento;
    if (producto.cantidad < 1) producto.cantidad = 1; 
    actualizarLocalStorage();
    renderCarrito();
  }

  
  listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
      const id = parseInt(e.target.dataset.id);
      eliminarProducto(id);
    }

    if (e.target.classList.contains('sumar')) {
      const id = parseInt(e.target.dataset.id);
      cambiarCantidad(id, +1);
    }

    if (e.target.classList.contains('restar')) {
      const id = parseInt(e.target.dataset.id);
      cambiarCantidad(id, -1);
    }
  });

  // Vaciar carrito
  vaciarBtn.addEventListener('click', () => {
    carrito = [];
    actualizarLocalStorage();
    renderCarrito();
  });

  // Seguir comprando
  seguirBtn.addEventListener('click', () => {
    window.location.href = 'capacitaciones.html';
  });

  renderCarrito();
});