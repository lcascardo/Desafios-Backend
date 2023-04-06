import Users from "../dao/dbManagers/users.js";
import Carts from "../dao/dbManagers/carts.js";

const usersManager = new Users();
const cartsManager = new Carts();

//Traer todos los usuarios
const getAll = async (req, res) => {
    let users = await usersManager.getAll();

    if (!users)
        return res
            .status(500)
            .send({ status: "error", error: "No pude traer informacion" });

    res.send({ status: "success", payload: users });
}

//Agregar usuario
const saveUser = async (req, res) => {
    const { first_name, last_name, email, age , cart} = req.body;
    let result = await usersManager.saveUser({
        first_name,
        last_name,
        email,
        age,
        cart
    });
    res.send({ status: "success", payload: result });
}

//Agregar usuario a carrito
const addUserToCart = async (req, res) => {
    const { uid, cid } = req.params;
    const cart = await cartsManager.getOne(cid);
  
    if (!cart)
      return res.status(404).send({ status: "error", error: "Cart not found" });
    const user = await usersManager.getById({ _id: uid });
    if (!user)
      return res.status(404).send({ status: "error", error: "User not found" });
  
    let cartExist = user.cart.some((c) => c._id.toString() === cid);
    if (!cartExist)
      return res
        .status(404)
        .send({ status: "error", error: "User not found in this cart" });
  
    user.cart.push(cart._id);
    cart.user.push(user._id);
    await usersManager.updateUser(uid, user);
    await cartsManager.updateCart(cid, cart);
    res.send({ status: "success", message: "user add to cart" });
  }

export default {
    getAll,
    saveUser,
    addUserToCart
}