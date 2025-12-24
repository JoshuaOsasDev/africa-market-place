import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OtpComponent() {
  const [otp, setOtp] = useState("");

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={5}
      inputType="tel"
      containerStyle={{
        display: "flex",
        gap: "8px",
      }}
      /*   inputStyle={{
        width: "52px",       // 👈 Increase width
        height: "61px",      // 👈 Increase height
        fontSize: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        textAlign: "center",
      }} */
      renderInput={(props) => (
        <input className="h-[52px] w-[52px] rounded-[8px] border text-center lg:h-[61px]" />
      )}
      shouldAutoFocus={true}
    />
  );
}
