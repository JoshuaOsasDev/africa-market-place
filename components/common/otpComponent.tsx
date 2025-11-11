import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function OtpComponent() {
  const [otp, setOtp] = useState('');

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={5}
      inputType="tel"
      
      inputStyle={{
        width: "52px",       // 👈 Increase width
        height: "61px",      // 👈 Increase height
        fontSize: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        textAlign: "center",
      }}
      containerStyle={{
        display: "flex",
        gap: "8px"
      }}
      renderInput={(props) => <input {...props} />}
      shouldAutoFocus={ true }
    />
  );
}