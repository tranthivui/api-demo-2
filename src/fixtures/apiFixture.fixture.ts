import { APIRequestContext, test as base, expect, request as playwrightRequest } from "@playwright/test";
import { BASE_URL } from "../paths/paths";
import { admin, Book, newBooking, resData, resLogin } from "../data/types";
type APIFixture = {
    authAPI: APIRequestContext,
    bookingid: number
};
export const test = base.extend<APIFixture>({
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
        const createRes = await authAPI.post("booking", {
            data: newBooking
        });
        await expect(createRes).toBeOK();
        const resResData: resData = await createRes.json();
        const bookingid=resResData.bookingid;
        await use(bookingid);
        await authAPI.delete(`/booking/${bookingid}`);
    }
})