import Swal from "sweetalert2";
import Toastify from "toastify-js";
import { useState } from "react";

export function Cotizador({//Cotizador con el que obtendremos los precios de los seguros
  propiedadData,
  selectPropiedad,
  ubicacionData,
  selectUbicacion,
  inputMetrosCuadrados,
  costoMetroCuadrado,
  ValorPoliza,
  EstablecerValorPoliza,
}) {
  const [cotizado, Cotizado_Establecido] = useState(false);

  const cotizar = () => {//funcion que se encarga de realizar la cotizacion
    if (
      inputMetrosCuadrados >= 20 &&
      inputMetrosCuadrados <= 500 &&
      selectPropiedad !== "..." &&
      selectUbicacion !== "..."
    ) {
      const factorPropiedad = propiedadData.find(
        (item) => item.tipo === selectPropiedad
      ).factor;
      const factorUbicacion = ubicacionData.find(
        (item) => item.tipo === selectUbicacion
      ).factor;
      const resultado = factorPropiedad * factorUbicacion * inputMetrosCuadrados * costoMetroCuadrado;
      const valorPoliza = resultado.toFixed(2);
      EstablecerValorPoliza(valorPoliza);
      Cotizado_Establecido(true);

      // Aviso de que la cotizacion fue exitosa
      Swal.fire({
        icon: "success",
        title: "Cotización realizada con éxito.",
        showConfirmButton: false,
        timer: 3500,
        width: "200px",
      });
    } else {
      // Aviso de que faltan datos
      Swal.fire({
        icon: "error",
        title: "Debes completar todos los datos en pantalla.",
        showConfirmButton: false,
        timer: 3500,
        width: "200px",
      });
    }
    if (inputMetrosCuadrados < 20 || inputMetrosCuadrados > 500) {
      // Aviso si la cantidad de metros seleccionada no esta entre 20 y 500
      Swal.fire({
        icon: "warning",
        title: "La cantidad de metros debe estar entre los 20 y los 500.",
        showConfirmButton: false,
        timer: 3500,
        width: "200px",
      });
    }
  };

  const guardar = () => {//funcion que guarda los datos cotizados en el historial
    if (cotizado) {
      const agregarCotizacion = {
        fecha:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
        propiedad: selectPropiedad,
        ubicacion: selectUbicacion,
        metros_cuadrados: inputMetrosCuadrados,
        poliza: ValorPoliza,
      };
      const cotizaciones = JSON.parse(localStorage.getItem("cotizacion")) || [];
      cotizaciones.push(agregarCotizacion);
      localStorage.setItem("cotizacion", JSON.stringify(cotizaciones));

      // Aviso de que la cotización se ha guardado
      Toastify({
        text: "Cotización guardada.",
        duration: 3500,
        newWindow: true,
        gravity: "top",
        position: "left",
        style: {
          background: "CornflowerBlue",
        },
      }).showToast();
    }
  };

  return (
    <>
      <div className="center separador">
        <button onClick={cotizar}>Cotizar</button>
      </div>
      <div className="center separador">
        <p className="importe">
          Precio estimado: $ <span id="valorPoliza">{ValorPoliza}</span>
          <span
            className={`guardar ${cotizado ? "" : "ocultar"}`}
            onClick={guardar}
            title="Guardar en historial">
            💾
          </span>
        </p>
      </div>
    </>
  );
}

export default Cotizador;
