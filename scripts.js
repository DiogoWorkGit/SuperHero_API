
function puxarcaps() {
    
    var nome = document.querySelector('.input_text').value;
    nome_encoded = encodeURI(nome);
    console.log(nome_encoded);

    const listaCmps = document.querySelectorAll('.lista_itens');

    if (listaCmps.length > 0){
        listaCmps.forEach(cmp => cmp.remove());
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
                console.log(idhero)

                fetch(`https://gateway.marvel.com/v1/public/stories?characters=${idhero}&limit=100&ts=1679874175&apikey=47b7d52506f06823ece0a03407fc41a1&hash=c7132295664b889624c030ac4aa40dcf`)
                .then(res => {
                    return res.json();
                })
                .then(data =>{
                    var stories = data.data.results
                    console.log(stories)
                    stories.forEach(book => {
                        titulo = book.title
                        desc = book.description
                        if (desc === ''){
                            desc = "Infelizmente a descrição desse capitulo não existe ou não está catalogada"
                        }

                        const markup = `<li class="lista_itens">Titulo do capítulo: ${titulo} <br>Descrição do capítulo: ${desc}</li>`;
                    
                        document.querySelector('ul').insertAdjacentHTML('beforeend',markup);
                    })
                })
            });
        })
}
