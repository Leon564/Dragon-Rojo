import React, { useEffect } from "react";
import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [lvl, setLvl] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [pdf, setPdf] = useState(true);



  useEffect(() => {
    const days = [];
    const years = [];
    for (let i = 2020; i <= 2030; i++) {
      years.push(i);
    }

    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }

    setDays(days);
    setYears(years);

    //get from local storage
    //localStorage.getItem("pdf"); and set it to state
    setPdf(localStorage.getItem("pdf"));

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      last_name === "" ||
      lvl === "" ||
      month === "" ||
      day === "" ||
      year === ""
    ) {
      setMessage("Debe llenar todos los campos");
      setError(true);
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 5000);
    } else {
      const _pdf= pdf ? "&pdf=true" : "";
      window.location.href = encodeURI(
        `https://dragon-rojo-api.onrender.com/new?lvl=${lvl}&name=${name}&last_name=${last_name}&day=${day}&month=${month}&year=${year}${_pdf}`
      );
      setMessage("Procesando...");
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setMessage("");
        setSuccess(false);
      }, 5000);
      setName("");
      setLast_name("");
      setLvl("");
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "last_name") {
      setLast_name(e.target.value);
    } else if (e.target.id === "lvl") {
      setLvl(e.target.value);
    } else if (e.target.id === "day") {
      setDay(e.target.value);
    } else if (e.target.id === "month") {
      setMonth(e.target.value);
    } else if (e.target.id === "year") {
      setYear(e.target.value);
    } else if (e.target.id === "message") {
      setMessage(e.target.value);
    }
  };

  const handlePdf = () => {
    setPdf(!pdf);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="mt-5 w-11/12 md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 w-11/12 md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="last_name"
            >
              Apellido
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="last_name"
              type="text"
              placeholder="Apellido"
              value={last_name}
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 w-11/12 md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="last_name"
            >
              Nivel (Cinta)
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lvl"
              value={lvl}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="9kup">Blanca Puntas Amarillas 9 kup</option>
              <option value="8kup">Amarilla 8 kup</option>
              <option value="7kup">Amarilla Puntas Verdes 7 kup</option>
              <option value="6kup">Verde 6 kup</option>
              <option value="5kup">Verde Puntas Azules 5 kup</option>
              <option value="4kup">Azul 4 kup</option>
              <option value="3kup">Azul Puntas Rojas 3 kup</option>
              <option value="2kup">Roja 2 kup</option>
              <option value="1kup">Roja Puntas Negras 1 kup</option>
              <option value="1dan">Negra 1 dan</option>
            </select>
          </div>
          <div className="mt-5 w-11/12 md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="day"
            >
              Dia
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="day"
              value={day}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 w-11/12 md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="month"
            >
              Mes
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="month"
              value={month}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </select>
          </div>
          <div className="mt-5 w-11/12 md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="year"
            >
              Año
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="year"
              value={year}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className=" w-full mt-10 items-center text-center content-center">
            <div className="flex justify-center w-full mb-5 flex-col items-center text-center">
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{`PDF (puede que tarde mas pero el formato no sufrira por la version de office)`}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={() => handlePdf()} defaultChecked={!!pdf} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                
              </label>
              
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Crear Diploma
            </button>
            {/* crear un switch para setear pdf  */}



          </div>

        </div>
        <div className="text-red-500 text-sm">{message}</div>
      </form>
    </div>
  );
};
export default Form;
