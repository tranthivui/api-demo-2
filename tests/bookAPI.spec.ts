import { expect } from '@playwright/test';
import { admin, Book, resData } from '../src/data/types';
import { test } from '../src/fixtures/pageFixture.fixture';

test.describe("Verify book API", async () => {
    test('Get booking', async ({ authAPI, bookingid }) => {
        const getBookingRes = await authAPI.get(`/booking/${bookingid}`);
        await expect(getBookingRes).toBeOK();
        const book: Book = await getBookingRes.json();
        console.log(book.firstname);
    });

    test("Update book", async ({ authAPI, bookingid }) => {
        const book = {
            "firstname": "Jonh",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        } satisfies Book;
        const updateBookRes = await authAPI.put(`/booking/${bookingid}`, {
            data: book
        });
        await expect(updateBookRes).toBeOK();
        const resData: Book = await updateBookRes.json();
        console.log(resData.firstname);
        expect(resData.firstname).toBe(book.firstname);
    });

    test("Delete book", async ({ authAPI, bookingid }) => {
        const deleteBookRes = await authAPI.delete(`/booking/${bookingid}`);
        await expect(deleteBookRes).toBeOK();
        const getBookingRes = await authAPI.get(`/booking/${bookingid}`);
        await expect(getBookingRes.status()).toBe(404);
    })
})

