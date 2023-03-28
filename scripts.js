
function puxarcaps() {
    
    var nome = document.querySelector('.input_text').value;
    nome_encoded = encodeURI(nome);
    console.log(nome_encoded);

    const listaCmps = document.querySelectorAll('.lista_itens');

    if (listaCmps.length > 0){
        listaCmps.forEach(cmp => cmp.remove());
    }

    const foto_hero = document.querySelectorAll('.imgchar');

    if (foto_hero.length > 0){
        foto_hero.forEach(cmp => cmp.remove());
    }


    fetch(`https://gateway.marvel.com/v1/public/characters?name=${nome_encoded}&limit=100&ts=1679874175&apikey=47b7d52506f06823ece0a03407fc41a1&hash=c7132295664b889624c030ac4aa40dcf`)
        .then(res => {
            return res.json();
        })
        .then(data =>{
            var heroi = data.data.results
            console.log(heroi)
            heroi.forEach(element => {
                var idhero = element.id
                const imgsrc = element.thumbnail.path + '.' + element.thumbnail.extension
                console.log(imgsrc)
                console.log(idhero)

                fetch(`https://gateway.marvel.com/v1/public/stories?characters=${idhero}&limit=100&ts=1679874175&apikey=47b7d52506f06823ece0a03407fc41a1&hash=c7132295664b889624c030ac4aa40dcf`)
                .then(res => {
                    return res.json();
                })
                .then(data =>{
                    var stories = data.data.results
                    console.log(stories)

                    const markup_img=`<div class="image_block"><img src="${imgsrc}" alt="" srcset="" class="imgchar"></div>`
                    document.querySelector('.lista').insertAdjacentHTML('beforebegin',markup_img);

                    stories.forEach(book => {
                        titulo = book.title
                        desc = book.description
                        if (desc === ''){
                            desc = "Infelizmente a descrição desse capitulo não existe ou não está catalogada"
                        }
                        const markup = `<div class="lista_itens">
                        <p class = "item_titulo"><strong>Título</strong>: ${titulo}</p> 
                        <p class = "item_desc"><strong>Descrição</strong>: ${desc}</p>
                        </div>`;
                        
                        document.querySelector('.lista').insertAdjacentHTML('beforeend',markup);
                    })
                })
            });
        })
}
