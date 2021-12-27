import axios, {AxiosResponse} from "axios";

export async function chargeUser(
    token: string,
    amount: number,
    note: string
): Promise<AxiosResponse> {
  return axios.post(`https://www.beeminder.com/api/v1/charges.json?access_token=${token}`, {
    amount, note,
  }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
}
