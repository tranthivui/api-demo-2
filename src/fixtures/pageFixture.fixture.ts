import { APIRequestContext, test as base, expect, request as playwrightRequest } from "@playwright/test";
import { BASE_URL } from "../paths/paths";
import { admin, Book, resData, resLogin } from "../data/types";
type pageFixture = {
    authAPI: APIRequestContext,
    bookingid: number
};
export const test = base.extend<pageFixture>({
    authAPI: async ({ }, use) => {
        const loginContext = await playwrightRequest.newContext({ baseURL: BASE_URL });
        const loginRes = await loginContext.post("/auth", {
            data: { username: admin.username, password: admin.password },
        });
        await expect(loginRes).toBeOK();
        const loginResData: resLogin = await loginRes.json();
        const token = loginResData.token;
        if (!token) throw new Error("Not response token after login");
        await loginContext.dispose();
        const api = await playwrightRequest.newContext({
            baseURL: BASE_URL,
            extraHTTPHeaders: {
                Cookie: `token=${token}`,
            }
        });
        await use(api);
        await api.dispose();
    },
    bookingid: async ({ authAPI }, use) => {
        const book = {
            "firstname": "James",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        } satisfies Book;
        const createRes = await authAPI.post("booking", {
            data: book
        });
        await expect(createRes).toBeOK();
        const resResData: resData = await createRes.json();
        const bookingid=resResData.bookingid;
        await use(bookingid);
        await authAPI.delete(`/booking/${bookingid}`);
    }
})