// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import clsx from "clsx";
// import React, { useState } from "react";
// import { Control, Controller, FieldError } from "react-hook-form";

// import { regExDigit } from "@/utils/regexDigit";

// interface PropsType {
//   name: string;
//   // control: Control<any, any>;
//   valueLength: number;
//   error?: FieldError;
//   boxClassName?: string;
//   inputClassName?: string;
//   errorClassName?: string;
//   wrapperClassName?: string;
// }

// const CodeInput = ({
//   name,
//   control,
//   valueLength,
//   error,
//   boxClassName = "",
//   inputClassName = "",
//   errorClassName = "",
//   wrapperClassName = "",
// }: PropsType) => {
//   const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     onChange: (value: string) => void,
//     index: number,
//     value: string
//   ) => {
//     const targetValue = event.target.value;

//     if (!regExDigit.test(targetValue)) return;

//     const newValue =
//       value.substring(0, index) + targetValue + value.substring(index + 1);

//     onChange(newValue);

//     const nextElementSibling = event.target
//       .nextElementSibling as HTMLInputElement | null;

//     if (nextElementSibling) {
//       nextElementSibling.focus();
//     }
//   };

//   const handlePaste = (
//     event: React.ClipboardEvent<HTMLInputElement>,
//     onChange: (value: string) => void,
//     index: number,
//     value: string
//   ) => {
//     event.preventDefault();
//     const pastedData = event.clipboardData
//       .getData("text")
//       .slice(0, valueLength - index);

//     if (!regExDigit.test(pastedData)) return;

//     let newValue = value;
//     pastedData.split("").forEach((char, i) => {
//       if (index + i < valueLength) {
//         newValue =
//           newValue.substring(0, index + i) +
//           char +
//           newValue.substring(index + i + 1);
//       }
//     });

//     onChange(newValue);
//   };

//   const handleFocus = (
//     event: React.FocusEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     setFocusedIndex(index);
//     event.target.setSelectionRange(0, 1);
//   };

//   const handleBlur = () => {
//     setFocusedIndex(null);
//   };

//   const handleKeyDown = (
//     event: React.KeyboardEvent<HTMLInputElement>,
//     onChange: (value: string) => void,
//     index: number,
//     value: string
//   ) => {
//     if (event.key === "Backspace") {
//       event.preventDefault();
//       if (value.substring(index + 1)) {
//         const newValue =
//           value.substring(0, index) + " " + value.substring(index + 1);
//         onChange(newValue);
//       } else {
//         const newValue =
//           value.substring(0, index) + "" + value.substring(index + 1);
//         onChange(newValue);
//       }

//       const previousElementSibling = event.currentTarget
//         .previousElementSibling as HTMLInputElement | null;

//       if (previousElementSibling) {
//         previousElementSibling.focus();
//       }
//     }
//   };

//   return (
//     <div className={wrapperClassName}>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field: { onChange, value = "" } }) => {
//           const valueArray = value.split("").slice(0, valueLength);

//           const valueItems = Array.from({ length: valueLength }, (_, i) =>
//             valueArray[i] && regExDigit.test(valueArray[i]) ? valueArray[i] : ""
//           );

//           return (
//             <div
//               dir="ltr"
//               className={`flex items-center justify-center gap-x-2 ${boxClassName}`}
//             >
//               {valueItems.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   inputMode="numeric"
//                   value={digit}
//                   onFocus={(e) => handleFocus(e, index)}
//                   onBlur={handleBlur}
//                   maxLength={1}
//                   onChange={(e) => handleInputChange(e, onChange, index, value)}
//                   onPaste={(e) => handlePaste(e, onChange, index, value)}
//                   onKeyDown={(e) => handleKeyDown(e, onChange, index, value)}
//                   className={`${inputClassName} h-11 w-11 border rounded-xl text-center text-xl ${
//                     focusedIndex === index
//                       ? "border-primary-dark"
//                       : "border-lighter-blue"
//                   } focus:border-primary-dark ${
//                     error ? "!border-error bg-error bg-opacity-[1%]" : ""
//                   } transition-all duration-300`}
//                 />
//               ))}
//             </div>
//           );
//         }}
//       />

//       {error && (
//         <div
//           className={clsx(
//             "w-full text-sm h-5 mt-1.5 pl-4 text-error text-start",
//             errorClassName
//           )}
//         >
//           {error.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CodeInput;
