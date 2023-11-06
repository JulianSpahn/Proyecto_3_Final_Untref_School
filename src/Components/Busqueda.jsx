import { useEffect, useState } from "react";
export function Busqueda(){//funcion que maneja el historial
    const [cotizaciones, Establecer_cotizaciones] = useState([]);

    useEffect(() => {//aqui recuperams los datos de la cotizacion
      const cotizacionesGuardadas =
        JSON.parse(localStorage.getItem("cotizacion")) || [];
        Establecer_cotizaciones(cotizacionesGuardadas);
    }, []);
  
    const Eliminar_Cotizacion = (index) => {//con esta funcion eliminamos 1 cotizacion (sale al lado de cada una y tu eliges cual quieres sacar)
      const nuevasCotizaciones = [...cotizaciones];
      nuevasCotizaciones.splice(index, 1);
      Establecer_cotizaciones(nuevasCotizaciones);
      localStorage.setItem("cotizacion", JSON.stringify(nuevasCotizaciones));
    };
  
    const Vaciar_Historial = () => {//con esta funcion limpiamos el historial de cotizaciones
      Establecer_cotizaciones([]);
      localStorage.removeItem("cotizacion");
    };
  
    return (
      <div>
        <h1 className="center separador">Ver Historial 📋</h1>
        <div className=" center div-cotizador">
          <table>
            <thead>
              {/* aqui tenemos las columnas con los nombres de las cosas que guardamos */}
              <tr>
                <th>Fecha de cotización</th>
                <th>Propiedad</th>
                <th>Ubicación</th>
                <th>Metros cuadrados</th>
                <th>Póliza mensual</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* aqui estan los resultados de lo seleccionado */}
              {cotizaciones.map(
                ({ fecha, propiedad, ubicacion, metros_cuadrados, poliza }, index) => (
                  <tr key={index}>
                    <td>{fecha}</td>
                    <td>{propiedad}</td>
                    <td>{ubicacion}</td>
                    <td>{metros_cuadrados}</td>
                    <td>{poliza}</td>
                    <td>
                      {/* boton para borrar 1 cotizacion */}
                      <span
                        className="eliminaritem"
                        onClick={() => Eliminar_Cotizacion(index)}>
                          <button>
                          <p>Borrar</p>
                          </button>
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="center separador">
            {/* boton para borrar el historial */}
            <button
              onClick={Vaciar_Historial}
              className="button button-outline"
              id="botoneshistorial">
              <p>Vaciar</p>
            </button>
            <span style={{ margin: "0 10px" }} />
            {/* boton para volver a la parte del formulario */}
            <button
              onClick={() => window.history.back()}
              className="button button-outline"
              id="botoneshistorial">
              <p>Volver</p>
            </button>
          </div>
        </div>
      </div>
    );
}
export default Busqueda;