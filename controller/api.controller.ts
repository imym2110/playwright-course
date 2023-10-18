import { APIRequestContext, request } from "@playwright/test";

class APIController {
  private fakerApi: APIRequestContext;

  async init() {
    this.fakerApi = await request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/",
    });
  }

  async getUsers() {
    const response = await this.fakerApi.get("users");
    const responseBody = await response.json();
    return responseBody[0];
  }

  async postUsers() {
    const response = await this.fakerApi.post("/users/1/todos", {
      data: {
        title: "Learn playwright",
        completed: "false",
      },
    });
    return await response.json();
    // const responseBody = await response.json();
    // console.log(responseBody);
  }
}

export default new APIController();
