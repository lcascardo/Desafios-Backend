const divProducts = document.getElementById("products");

fetch('/api/products/')
    .then(res => res.json())
    .then(data => {
        let lista = "";
        data.forEach(p => {
            lista += `title: ${p.title} ,
            description: ${p.description} ,
             code: ${p.code} ,
              price: ${p.price} ,
              stock: ${p.stock} ,
               category: ${p.category} ,
               thumbnail: ${p.thumbnail} ,
                id: ${p.id}</br>`
        });
        divProducts.innerHTML = lista;
    })

