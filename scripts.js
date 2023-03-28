
//Criar a nossa função principal
function puxarcaps() {
    
    //Com esses códigos a seguir iremos pegar o nome do personagem que o usuário digitou e modificalos para que seja possível o uso em um URL
    var nome = document.querySelector('.input_text').value;
    nome_encoded = encodeURI(nome);
    console.log(nome_encoded);

    //Iremos usar esse código para limpar todas as divs com as histórias dos personagens
    const listaCmps = document.querySelectorAll('.lista_itens');
    if (listaCmps.length > 0){
        listaCmps.forEach(cmp => cmp.remove());
    }

    //Semelhante ao código anterior, iremos usar esse código para apagar as fotos dos personagens
    const foto_hero = document.querySelectorAll('.imgchar');
    if (foto_hero.length > 0){
        foto_hero.forEach(cmp => cmp.remove());
    }


    //Chamada de API para conseguirmos o ID do personagem que o usuário digitou
    fetch(`https://gateway.marvel.com/v1/public/characters?name=${nome_encoded}&limit=100&ts=1679874175&apikey=47b7d52506f06823ece0a03407fc41a1&hash=c7132295664b889624c030ac4aa40dcf`)
        //Como nossa chamada da API não retorna os dados de forma visível, iremos chamar os dados dela com o .then()
        .then(res => {
            return res.json();
        })
        .then(data =>{
            //Aqui iremos ir até onde temos o array de informações
            var heroi = data.data.results
            console.log(heroi)

            //Para cada heroi que corresponder á nossa chamada iremos salvar esse ID e thumbnail em váriaveis para uso futuro
            heroi.forEach(element => {
                var idhero = element.id
                const imgsrc = element.thumbnail.path + '.' + element.thumbnail.extension
                console.log(imgsrc)
                console.log(idhero)

                //Com o ID que puxamos vamos puxar os dados das histórias
                fetch(`https://gateway.marvel.com/v1/public/stories?characters=${idhero}&limit=100&ts=1679874175&apikey=47b7d52506f06823ece0a03407fc41a1&hash=c7132295664b889624c030ac4aa40dcf`)
                .then(res => {
                    return res.json();
                })
                .then(data =>{
                    var stories = data.data.results
                    console.log(stories)

                    //Vamos montar o html que vai mostrar a imagem do personagem 
                    const markup_img=`<div class="image_block"><img src="${imgsrc}" alt="" srcset="" class="imgchar"></div>`
                    document.querySelector('.lista').insertAdjacentHTML('beforebegin',markup_img);

                    //Estrutura de repetição que vamos usar para mostrar todas as histórias
                    stories.forEach(book => {
                        titulo = book.title
                        desc = book.description
                        if (desc === ''){
                            desc = "Infelizmente a descrição desse capitulo não existe ou não está catalogada"
                        }
                        //Montando o html de cada titulo da história
                        const markup = `<div class="lista_itens">
                        <p class = "item_titulo"><strong>Título</strong>: ${titulo}</p> 
                        <p class = "item_desc"><strong>Descrição</strong>: ${desc}</p>
                        </div>`;
                        
                        //Inserindo o html dentro da div informada
                        document.querySelector('.lista').insertAdjacentHTML('beforeend',markup);
                    })
                })
            });
        })
}
