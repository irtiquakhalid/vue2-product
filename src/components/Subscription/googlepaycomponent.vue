<template>
  <div class="demo">
    <google-pay-button
      environment="TEST"
      button-type="plain"
      :paymentRequest.prop="paymentRequest"
      @loadpaymentdata="onLoadPaymentData"
      @error="onError"
    ></google-pay-button>
    <!-- <google-pay-button
      environment="PRODUCTION"
      :button-color="buttonColor"
      :button-type="buttonType"
      :button-size-mode="isCustomSize ? 'fill' : 'static'"
      :paymentRequest.prop="paymentRequest"
      @loadpaymentdata="onLoadPaymentData"
      @error="onError"
      :style="{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }"
    ></google-pay-button> -->
  </div>
</template>

<script>
import "@google-pay/button-element";

export default {
  data: () => ({
    buttonColor: "default",
    buttonType: "buy",
    isCustomSize: false,
    buttonWidth: 240,
    buttonHeight: 40,
    isTop: window === window.top,

    paymentRequest: {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "stripe", // Note the correct spelling
              "stripe:version": "2020-08-27", // Add Stripe API version
              "stripe:publishableKey":
                "pk_test_51MJZnDBOpzfVpshImYWVue7L4rpEeN7HdKB2d4D6JGZfcAK5U7f62MFy0QF5FPls488u2a491jSJehTDVD7F6QSZ006j10o1Pz",
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "BCR2DN4TXL5WXK23",
        merchantName: "Demo Merchant",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: "100.00",
        currencyCode: "USD",
        countryCode: "US",
        checkoutOption: "DEFAULT",
      },
    },
  }),
  methods: {
    onLoadPaymentData: (event) => {
      console.log("load payment data", event.detail);
    },
    onError: (event) => {
      console.error("error", event.error);
    },
  },
};
</script>
