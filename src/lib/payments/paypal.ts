import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import Dinero from "dinero.js";

const configureEnvironment = function () {
    const clientId: string | undefined = process.env.PAY_PAL_CLIENT_ID;
    const clientSecret: string | undefined = process.env.PAY_PAL_SECRET;

    if (!clientId || !clientSecret) {
        console.error(
            "PAY_PAL_CLIENT_ID and PAY_PAL_SECRET variables must be in .env"
        );
        process.exit(1);
    }

    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId,
        clientSecret
    );
};

const client = function () {
    return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

const formatterUSD = new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 2,
});

const calcDineroPayPalFee = function (amount: number) {
    let itemValue = Dinero({
        amount: amount,
        currency: "USD",
    });
    const defaultFee = Dinero({ amount: 48, currency: "USD" });
    const defaultPercentage = 4;

    itemValue = itemValue.add(defaultFee);

    const adderFee = itemValue.percentage(defaultPercentage);

    const value = itemValue.add(adderFee);

    return value;
};

const calcValueWithPaypalFee = function (valueInUSD: number) {
    // values in cents
    // let itemValue = Dinero({
    //     amount: valueInUSD * 100,
    //     currency: "USD",
    // });
    // const defaultFee = Dinero({ amount: 48, currency: "USD" });
    // const defaultPercentage = 4;

    // itemValue = itemValue.add(defaultFee);

    // const adderFee = itemValue.percentage(defaultPercentage);

    // const value = itemValue.add(adderFee);

    const value = calcDineroPayPalFee(valueInUSD * 100);

    return value.toFormat("0.00");
};

export default client;
export { calcValueWithPaypalFee, calcDineroPayPalFee };
