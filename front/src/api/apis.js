import axios from "axios";
import { uid } from "uid";

export class CategoriesApi {
  url = "http://localhost/routes/categories.php";

  async categories() {
    let request = await axios.get(this.url).then((res) => res.data);
    return request;
  }

  async create(category) {
    let data = new FormData();
    data.append("name", category.name);
    data.append("tax", parseFloat(category.tax));
    data.append("code", uid(8));
    let request = await axios.post(this.url, data).then((res) => {
      return res.data;
    });

    return request;
  }

  async delete(id) {
    let request = await axios.delete(this.url + `?id=${id}`).then((res) => {
      console.log(res);
      return res.data;
    });

    return request;
  }
}

export class ProductsApi {
  url = "http://localhost/routes/products.php";

  async products() {
    let request = await axios.get(this.url).then((res) => res.data);
    return request;
  }

  async create(product) {
    let data = new FormData();
    for (var key in product) {
      data.append(key, product[key]);
    }
    data.append("code", uid(11));
    console.log(data);
    let request = await axios.post(this.url, data).then((res) => {
      return res.data;
    });

    return request;
  }

  async delete(id) {
    let request = await axios.delete(this.url + `?id=${id}`).then((res) => {
      console.log(res);
      return res.data;
    });

    return request;
  }
}

export class OrderApi {
  url = "http://localhost/routes/order.php";
  urlItems = "http://localhost/routes/orderItems.php";

  async createOrder(order, cart) {
    console.log(order);
    order.append("user_code", 1);
    let request = await axios.post(this.url, order).then((res) => {
      console.log(res);
      return res.data;
    });

    let te = new Promise(async (resolve) => {
      let newList = [];
      cart.forEach((element) => {
        console.log("-".repeat(10));

        newList.push({
          code: uid(10).replace(/[a-zA-Z]/gm, ""),
          order_code: order.get("code"),
          price: element.product.products_without_tax,
          tax: element.product.tax_value,
          product_code: element.product.code,
          amount: parseInt(element.quantity),
        });
      });
      resolve(newList);
    });

    te.then((res) => {
      console.log(res.data);
      this.createOrderItem(res);
    });
  }

  async createOrderItem(list) {
    let items = new FormData();
    items.append("items", JSON.stringify(list));
    console.log(items);
    let createOrderItens = await axios
      .post(this.urlItems, items)
      .then((res) => {
        console.log(res);
        return res.data;
      });
  }

  async getAllOrders() {
    return (await axios.get(this.url)).data;
  }
  async getDetails(id) {
    return (await axios.get(this.url + `?code=${id}`)).data;
  }
}

export class Login {
  url = "http://localhost/routes/users.php";

  async login(user) {
    let data = new FormData();
    console.table(user, data);

    data.append("pass", user.pass);
    data.append("username", user.username);

    let request = axios.post(this.url, data).then((res) => {
      console.log(res);
      return res;
    });

    return request;
  }

  async register(user) {
    let data = new FormData();

    for (var key in user) {
      data.append(key, user[key]);
    }

    data.append("register", 1);

    let request = axios.post(this.url, data).then((res) => {
      console.log(res);
      return res;
    });

    return request;
  }
}
