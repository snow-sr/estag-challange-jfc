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
    data.append("code", uid());
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
