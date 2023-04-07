import { useState } from "react"
import Button from "../defaults/Buttons/Button";
import { useMutation } from "react-query";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios, { AxiosError } from "axios";

const BuyTicketButton = ({ eventId }: { eventId: string }) => {

    const createMutation = useMutation<{ data: any }, AxiosError, any, Response>(
        (): any => axios.post('/api/paypal/create-order', { eventId }),
    )
    const captureMutation = useMutation<string, AxiosError, any, Response>(
        (data): any => axios.post('/api/paypal/capture-order', data),
    )
    const createPayPalOrder = async (): Promise<string> => {
        const response = await createMutation.mutateAsync({});
        return response.data.orderID;
    }

    const onApprove = async (data: OnApproveData): Promise<void> => {
        return captureMutation.mutate({ orderID: data.orderID });
    }

    const paypalClientID = "AUnLD9hLvza6T1tqq7dNTEW6liM8nToMafl8RGv8xyuCDCAxwRSjkAJEzW1fXn_KMBlLdMWiRl8bb3kp";

    return (
        <div>
            <main>
                {captureMutation.data && (
                    <div>{JSON.stringify(captureMutation.data)}</div>
                )}
                <PayPalScriptProvider
                    options={{
                        'client-id': paypalClientID,
                        currency: 'USD',
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: 'gold',
                            shape: 'rect',
                            label: 'pay',
                            height: 50,
                        }}
                        fundingSource={FUNDING.PAYPAL}
                        createOrder={createPayPalOrder}
                        onApprove={onApprove}
                    />
                </PayPalScriptProvider>
            </main>


        </div>
    )
}

interface OnApproveData {
    billingToken?: string | null
    facilitatorAccessToken: string
    orderID: string
    payerID?: string | null
    paymentID?: string | null
    subscriptionID?: string | null
    authCode?: string | null
}

export default BuyTicketButton;