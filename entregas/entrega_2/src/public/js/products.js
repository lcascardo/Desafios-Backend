

addProductToCart = async (pid) => {
   const options = {
    method:"POST",
    body:"",
    headers:{
        "Content-Type":"application/json"
    }
   };

   await fetch(
    `http://localhost:8080/api/carts/63ecdaf58a1066824a8953bd/product/${pid}`,
    options
   )
}