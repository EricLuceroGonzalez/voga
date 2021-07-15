import React, { useState } from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneInputs = (props) => {
  const [phoneNumber, setValue] = useState(props.value);
  return (
      <PhoneInput
        id='phoneNumber'
        countrySelectProps={{ unicodeFlags: true }}
        defaultCountry={"PA"}
        value={phoneNumber}
        placeholder={`${phoneNumber ? phoneNumber : ""}`}
        onChange={setValue}
      >
      </PhoneInput>
  );
};

export default PhoneInputs;
