import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useCreateOrderMutation } from "@/apis/paymentApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PaymentButton = ({ isPurchased, loggedInUser }) => {
  const { courseId } = useParams();
  const [createOrder, { data, isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Order created successfully!");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.data
          ? error.data.message
          : "An error occurred while creating the order."
      );
    }
  }, [isError, error]);

  const handlePaymentBtn = async () => {
    if (!isPurchased) {
      const response = await createOrder(courseId);
      const orderResponse = response.data;
      const options = {
        key: orderResponse?.key_id,
        amount: orderResponse?.amount,
        currency: orderResponse?.currency,
        name: "uDummy-A LMS",
        description:
          "Explore a unique learning experience by gaining knowledge",
        order_id: orderResponse?.orderId,
        // callback_url: 'http://localhost:3000/payment-success',
        prefill: {
          name: loggedInUser?.name,
          email: loggedInUser?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };
  return (
    <div>
      {isLoading && <Loader2 className="animate-spin" />}
      <Button onClick={handlePaymentBtn}>
        {isPurchased ? "Continue Course" : "Purchase Course"}
      </Button>
    </div>
  );
};

export default PaymentButton;
