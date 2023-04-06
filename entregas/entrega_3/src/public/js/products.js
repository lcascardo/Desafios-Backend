addProductToCart = async (cid,pid) => {
   const options = {
    method:"POST",
    body:"",
    headers:{
        "Content-Type":"application/json"
    }
   };

   await fetch(
    `http://localhost:8080/api/carts/${cid}/product/${pid}`,
    options
   )
}

