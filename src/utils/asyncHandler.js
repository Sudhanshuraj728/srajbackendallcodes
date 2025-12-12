// const asyncHandler = () => {}

export {asyncHandler}
// step wise ki kaise likha h asnchandler function yha fn ek function h jisko mai kisi aur function me pass kr skta hu
// const asyncHandler = () => {}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => async () => {}
// asyncHandler ek function hai
// Iska kaam:
// → Ek function fn ko argument ke form me lena.

// (fn) => ...

// Yaani asyncHandler ek function ko input me lega.

// 2) Ye function return me ek aur function de raha hai
// async () => {}
// Yaani asyncHandler ek function ko input me lega aur ek async function return karega.

// 3) Ye jo return hone wala function hai, wo bhi ek argument lega:
// (req, res, next) => {}
// Yaani ye function Express middleware jaisa dikhega jo req, res, next leta hai.
// Ye ek async arrow function hai jo hum baad me execute karenge.

// Meaning:
// asyncHandler(fn) call karoge → return me ek new async function milega.

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message,
//         });
//     }
//     // matlab error object me code property hogi to use status code me set kar dena
//     // agar code property nahi hai to 500 set kar dena
//     // aur message me error.message ko bhej dena
// }


// ek tarika jo upar kiya using try catch

// ab isko aur concise krne ke liye hum promise ka use kr skte h
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error));
    };
};
// Yahan pe humne asyncHandler function ko define kiya hai jo ek requestHandler function leta hai.
// Ye function ek naya function return karta hai jo req, res, next parameters leta hai.
// Is naye function ke andar hum Promise.resolve() ka use karte hain taaki requestHandler ko call kar sakein.
// Agar requestHandler ke execution ke dauran koi error aata hai, to catch block me wo error next() function ke through Express ke error handling middleware ko bhej diya jata hai.
// Is tarah se hum asynchronous request handlers ko easily handle kar sakte hain bina har baar try-catch likhe.
// .catch() automatically express ko error forward karta hai

export {asyncHandler}
// ab isko use krne ka tarika ye hoga ki hum apne route handlers ko asyncHandler me wrap kr denge
