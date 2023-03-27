fetch('https://gateway.marvel.com/v1/public/characters?name=Iron%20Man&limit=100&ts=1679874175&apikey=47b7d52506f06823ece0a03407fc41a1&hash=c7132295664b889624c030ac4aa40dcf')
    .then(res => {
        return res.json();
    })
    .then(data =>{
        var heroi = data.data.results
        console.log(heroi)
        heroi.forEach(element => {
            const idhero = element.id
            console.log(idhero)
        });
    })

fetch('https://gateway.marvel.com/v1/public/stories?characters=1009148&limit=100&ts=1679874175&apikey=47b7d52506f06823ece0a03407fc41a1&hash=c7132295664b889624c030ac4aa40dcf')
    .then(res => {
        return res.json();
    })
    .then(data =>{
        console.log(data)
    })