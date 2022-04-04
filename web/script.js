$(document).ready(() => {
  var settings = {
    url: "http://localhost:3000/artistas",
    method: "GET",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      crossDomain: true,
      "access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjQ5MDU1MjQyLCJleHAiOjE2NDkxNDE5MDJ9.9X802IM57Uo5iWakPDVYtNu9c1s1WTSV5HHh31Gxaj0",
    },
  };

  $.ajax(settings).done(function (response) {
    CargarCarousel(response);
    const rndInt = randomIntFromInterval(0, response.length);
    $("#bg-image").attr("src", response[rndInt].imagen_url);

    $(".multi-item-carousel").carousel({
      interval: false,
    });

    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.
    $(".multi-item-carousel .item").each(function () {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(":first");
        $(next).addClass("active");
      }
      next.children(":first-child").clone().appendTo($(this));

      if (next.next().length > 0) {
        next.next().children(":first-child").clone().appendTo($(this));
        //next.next().children(":first-child").clone().appendTo($(this));
      } else {
        $(this).siblings(":first").children(":first-child").clone().appendTo($(this));
      }
    });
  });

  // Instantiate the Bootstrap carousel
});

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function CargarCarousel(lista) {
  lista.forEach(function (element, index) {
    $(".carousel-inner").append(
      ` <div class="item">
            <div id="${element.id}" class="col-xs-4"><img id="img${element.id}" src="${element.imagen_url}" class="img-responsive carousel-item"/></div>
        </div>`
    );
    // console.log($(`#${element.id}`));
    $(`#img${element.id}`).click(function () {
      CambiarImagen();
    });
    let elemento1 = lista[index + 1] ? lista[index + 1].id : lista[0].id;
    console.log("+++++++++++++++++++");
    console.log(element.id);
    console.log(elemento1);
    document.getElementById(`img${elemento1}`).style.backgroundColor = "red";
  });
}

function CambiarImagen(id) {
  console.log(id);
}
