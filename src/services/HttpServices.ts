import axios from "axios";

class HttpServices {
  private defaultUrl = "";

  public constructor(defaultUrl = "http://127.0.0.1:8000/api") {
    this.defaultUrl = defaultUrl;
  }

  public getAllPeoples(params = {}) {
    return axios.get(`${this.defaultUrl}/people`, { params });
  }

  public getSpecificPeople(peopleId: number) {
    return axios.get(`${this.defaultUrl}/people/${peopleId}`);
  }

  public createPeople(params = {}) {
    return axios.post(`${this.defaultUrl}/people`, params);
  }

  public editPeople(peopleId: number, params = {}) {
    return axios.put(`${this.defaultUrl}/people/${peopleId}`, params);
  }

  public deletePeople(peopleId: number) {
    return axios.delete(`${this.defaultUrl}/people/${peopleId}`);
  }

  public deleteContact(contactId: number) {
    return axios.delete(`${this.defaultUrl}/contact/${contactId}`);
  }
}

export default HttpServices;
