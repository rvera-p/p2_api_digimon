$(() => {
  consumirAPI();

  $("#tablaDigimon tbody").on("click", "tr", function () {
    let nombre = $(this).find("td:eq(0)").text();
    let nivel = $(this).find("td:eq(1)").text();
    let imagenSrc = $(this).find("img").attr("src");

    mostrarModal(imagenSrc, nombre, nivel);
  });

  $("#formBuscarDigimon").on("submit", function (event) {
    event.preventDefault();

    let nombre = $("#nombreDigimon").val();
    let rutaAPI = "https://digimon-api.vercel.app/api/digimon/name/" + nombre;

    fetch(rutaAPI)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Digimon no encontrado");
        }
        return response.json();
      })
      .then(function (data) {
        let nombre = data[0].name;
        let nivel = data[0].level;
        let imagen = data[0].img;

        $("#nombreDigimon").val("");
        mostrarModal(imagen, nombre, nivel);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  });
});

function consumirAPI() {
  let pathAPI = "https://digimon-api.vercel.app/api/digimon";
  fetch(pathAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let filaDigimon = "";
      data.forEach((digimon) => {
        filaDigimon += `
            <tr>
              <td scope="row">${digimon.name}</td>
              <td >${digimon.level}</td>
              <td><img src="${digimon.img}" alt="${digimon.name}"></img></td>          </tr>
          `;
      });
      $("#cuerpoTabla").html(filaDigimon);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
}

function buscarDigimonAPI(nombre) {
  let pathAPI = "https://digimon-api.vercel.app/api/digimon/name/:" + nombre;
  fetch(pathAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let filaDigimon = "";
      data.forEach((digimon) => {
        filaDigimon += `
            <tr>
              <td scope="row">${digimon.name}</td>
              <td >${digimon.level}</td>
              <td><img src="${digimon.img}" alt="${digimon.name}"></img></td>          </tr>
          `;
      });
      $("#cuerpoTabla").html(filaDigimon);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
}

function mostrarModal(imagenSrc, nombre, nivel) {
  let modal = $("#modalDigimon");

  modal.find("#imagenDigimon").attr("src", imagenSrc);
  modal.find("#imagenDigimon").attr("alt", nombre);
  modal.find("#nombreDigimon").text(nombre);
  modal.find("#nivelDigimon").text(nivel);
  modal.modal("show");
  $(".close").click(function () {
    modal.modal("hide");
  });
}
