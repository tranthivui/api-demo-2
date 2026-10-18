export type User={
    username: string,
    password: string
};

export type resLogin={
    token: string
};

export type Book={
    firstname: string,
    lastname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates:{
        checkin: string,
        checkout: string
    },
    additionalneeds: string
};

export const admin={
    username: "admin",
    password: "password123"
} satisfies User;