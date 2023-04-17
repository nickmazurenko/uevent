import Layout from "@/components/Layout";
import { options } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next/types";
import PayPal from "@/lib/payments/paypal";

export default function SuccessfulPurchasePage() {
    return (
        <Layout>Success</Layout>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const payerId = context.query.PayerId;
    const paymentId = context.query.paymentId;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };


    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [
            {
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }
        ]
    }

    const paypal = PayPal.get();

    paypal.payment.execute(paymentId as string, execute_payment_json, function (error, payment) {

        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            return { props: {} }

        }

    });

    paypal.payment.create(creat)

};

