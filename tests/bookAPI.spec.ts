import { expect } from '@playwright/test';
import { admin, Book } from '../src/data/types';
import { test } from '../src/fixtures/api.fixture';

test.describe("Verify book API", async () => {
    test('Get booking', async ({ authAPI }) => {
        const getBookingRes = await authAPI.get("/booking/2");
        await expect(getBookingRes).toBeOK();
        const book: Book = await getBookingRes.json();
        console.log(book.firstname);
    });

    test("Update book", async ({ authAPI }) => {
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
        const updateBookRes=await authAPI.put("/booking/2",{
            data: book
        });
        await expect(updateBookRes).toBeOK();
        const resData: Book=await updateBookRes.json();
        console.log(resData.firstname);
        expect(resData.firstname).toBe(book.firstname);
    });

    test("Delete book",async({authAPI})=>{
        const deleteBookRes=await authAPI.delete("/booking/2");
        await expect(deleteBookRes).toBeOK();
    })
})

