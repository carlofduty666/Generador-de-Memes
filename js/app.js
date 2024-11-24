document, addEventListener('DOMContentLoaded', function () {
    // usamos esto para esperar la carga del documento antes del javascript para evitar fallos
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); //esto nos permitira dibujar sobre el canvas


    const api_key = 'live_7kxI3BIGJwZo8DQZRsqI5tx3ISrleR6AUwSa9txOjl4cS4kMsWQmPdd0DJkAZl2M'
    let image = new Image();

    document.getElementById('generar').addEventListener('click', getCatImage);
    document.getElementById('actualizar').addEventListener('click', addText);
    async function getCatImage() {
        try { // evita que al haber un error en el codigo (por condiciones externas) se detenga el resto de la pagina

            const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${api_key}`)
                .then(response => response.json()) //resultado de la ejecucion del fetch
                .then(datos => {
                    image.src = datos[0].url;
                    addImage();
                    //document.getElementById('img').src = datos[0].url;
                })

        } catch (error) {
            console.log(error)

        }
    }

    function addImage() {
        image.addEventListener('load', () => {
            const imageContainer = document.getElementById('img-container');
            imageContainer.style.display = 'block';
            const relacion_de_aspecto = image.width / image.height;
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;

            let canvasWidth, canvasHeight;

            if (maxWidth / maxHeight < relacion_de_aspecto) {
                canvasWidth = maxWidth;
                canvasHeight = maxWidth / relacion_de_aspecto;

            } else {
                canvasWidth = maxHeight * relacion_de_aspecto;
                canvasHeight = maxHeight;

            }
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            addText()

        });
    }

    function addText() {
        const text = document.getElementById('texto').value;
        const size = document.getElementById('size').value;
        const color = document.getElementById('color').value;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = color;
        ctx.font = `${size}px 'Arial'`;
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height * 0.75)
    }

});