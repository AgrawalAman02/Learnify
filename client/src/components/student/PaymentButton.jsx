import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useCreateOrderMutation } from "@/apis/paymentApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PaymentButton = ({  loggedInUser,courseStatusData , getCoursePaymentStatus ,loadingCourseStatus}) => {
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
    if (!courseStatusData ||  courseStatusData?.status != "captured") {
      try {
        const response = await createOrder(courseId);
        console.log("Order API Response:", response);
        
        if (!response?.data?.orderId) {
          toast.error("Failed to create order. Try again!");
          return;
        }
        
        const orderResponse = response.data;
        const options = {
          key: orderResponse?.key_id, // Ensure this exists
          amount: orderResponse?.amount * 100, // Convert to paise if needed
          currency: "INR",
          name: "Learnify",
          description: "Turning learning into a lifestyle",
          order_id: orderResponse?.orderId, // Ensure this exists
          prefill: {
            name: loggedInUser?.name || "Anonymous",
            email: loggedInUser?.email || "unknown@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
          handler: function (response) {
            toast.success("Payment Successful!");
            console.log("Payment Success:", response);

             setTimeout(() => {
              getCoursePaymentStatus(courseId).catch(err => {
                console.error("Status check failed:", err);
                toast.error("Failed to verify payment status");
              });
            }, 2000);
          },
          modal: {
            ondismiss: function () {
              toast.error("Payment popup closed.");
            },
            escape: false,      // Prevents closing modal with ESC key
            confirm_close: true // Shows confirmation dialog when trying to close payment window
          },
        };
        
        if (!window.Razorpay) {
          toast.error("Razorpay SDK not loaded. Try again.");
          return;
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment Error:", error);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
      
      <Button onClick={handlePaymentBtn} className="flex" >
        {loadingCourseStatus ? <><Loader2 className="animate-spin" /></> : 
          <>
          {(isLoading) &&  <Loader2 className="animate-spin" />}
          {courseStatusData?.status ==="captured" ? "Continue Course" : "Purchase Course"}
          </>
        }
      
      </Button>
    </div>
  );
};

export default PaymentButton;
