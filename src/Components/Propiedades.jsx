export function Propiedades({ datos, Propiedad }) {//funcion que maneja que tipo de propiedad se elige
    const handleChange = (e) => {
      Propiedad(e.target.value);
    };
  
    return (
      <div>
        <label htmlFor="propiedad">Seleccione el tipo de propiedad que busca cotizar</label>
        <select id="propiedad" onChange={handleChange}>
          <option selected disabled>
            ...
          </option>
          {datos.map((item, index) => (
            <option key={index} value={item.tipo}>
              {item.tipo}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Propiedades;