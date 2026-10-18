export type User = {
    username: string,
    password: string
};

export type resLogin = {
    token: string
};

export type Book = {
    firstname: string,
    lastname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates: {
        checkin: string,
        checkout: string
    },
    additionalneeds: string
};

export type resData = {
    bookingid: number,
    booking: {
        firstname: string,
        lastname: string,
        totalprice: number,
        depositpaid: boolean,
        bookingdates: {
            checkin: string,
            checkout: string
        },
        additionalneeds: string
    }
}
export const admin = {
    username: "admin",
    password: "password123"
} satisfies User;

export const newBooking = {
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