let caja = {
  50: 1,
  20: 4,
  10: 8,
  5: 2,
  2: 5,
  1: 4,
  0.1: 1,
  0.05: 2,
  0.02: 3,
  0.01: 1,
};

let articulo = (precio) => precio;

let pagoCliente = (pago) => {
  let total = 0;
  for (let dinero in pago) {
    total += Number(dinero) * pago[dinero];
  }
  return total;
};

// Calcula el cambio
let cambio = (caja, totalAPagar, totalPagado) => {
  let cambioRestante = totalPagado - totalAPagar;
  let cambioEntregado = {};
  let valores = Object.keys(caja)
    .map(Number)
    .sort((a, b) => b - a);

  for (let billete of valores) {
    if (cambioRestante >= billete && caja[billete] > 0) {
      let cantidadNecesaria = Math.floor(cambioRestante / billete);
      let cantidadDisponible = caja[billete];
      let cantidadACambiar = Math.min(cantidadNecesaria, cantidadDisponible);
      if (cantidadACambiar > 0) {
        cambioEntregado[billete] = cantidadACambiar;
        caja[billete] -= cantidadACambiar;
        cambioRestante -= cantidadACambiar * billete;
        cambioRestante = Math.round(cambioRestante * 100) / 100;
      }
    }
  }

  return cambioEntregado;
};

// Función principal para leer inputs y mostrar todo en DOM
let comprobarPago = () => {
  let pago = {};

  // Leer precio del producto
  let precioDelProducto = Number(
    document.getElementById("precioProducto").value,
  );

  // Leer billetes
  pago[100] = Number(document.getElementById("b100").value) || 0;
  pago[50] = Number(document.getElementById("b50").value) || 0;
  pago[20] = Number(document.getElementById("b20").value) || 0;
  pago[10] = Number(document.getElementById("b10").value) || 0;

  // Leer monedas
  pago[2] = Number(document.getElementById("m2").value) || 0;
  pago[1] = Number(document.getElementById("m1").value) || 0;
  pago[0.5] = Number(document.getElementById("m0_5").value) || 0;
  pago[0.2] = Number(document.getElementById("m0_2").value) || 0;
  pago[0.1] = Number(document.getElementById("m0_1").value) || 0;
  pago[0.05] = Number(document.getElementById("m0_05").value) || 0;
  pago[0.02] = Number(document.getElementById("m0_02").value) || 0;
  pago[0.01] = Number(document.getElementById("m0_01").value) || 0;

  let totalPagado = pagoCliente(pago);
  let totalAPagar = articulo(precioDelProducto);

  let mensajeDOM = document.getElementById("mensaje");
  let cambioDOM = document.getElementById("cambio");
  let estadoCajaDOM = document.getElementById("estadoCaja");

  // Limpiar los textos
  mensajeDOM.textContent = "";
  cambioDOM.textContent = "";
  estadoCajaDOM.textContent = "";

  if (totalPagado < totalAPagar) {
    mensajeDOM.textContent = "Pago insuficiente";
  } else if (totalPagado === totalAPagar) {
    mensajeDOM.textContent = "Gracias por su compra. No hay cambio.";
  } else {
    mensajeDOM.textContent = "Gracias por su compra.";
    let cambioEntregado = cambio(caja, totalAPagar, totalPagado);

    // Mostrar el cambio
    for (let dinero in cambioEntregado) {
      cambioDOM.textContent +=
        "Cambio entregado: " +
        dinero +
        "€:\nTotal billetes: " +
        cambioEntregado[dinero] +
        "\n";
    }
  }

  // Mostrar estado de la caja
  estadoCajaDOM.innerHTML = "<pre>Estado de caja actualizado:\n</pre>";
  for (let dinero in caja) {
    let totalPorValor = (dinero * caja[dinero]).toFixed(2);
    estadoCajaDOM.innerHTML += `<pre>Billetes/monedas de ${dinero}€: ${caja[dinero]} unidades, total = ${totalPorValor}€</pre>`;
  }
};;

// Conectar botón
document
  .getElementById("calcularPago")
  .addEventListener("click", comprobarPago);
