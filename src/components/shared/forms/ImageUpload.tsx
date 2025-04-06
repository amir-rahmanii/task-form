// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { Camera } from "lucide-react";
// import React, {
//   ChangeEvent,
//   DragEvent,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { Control, Controller, useFieldArray } from "react-hook-form";

// // import {} from "@/lib";
// // import { deepCompare } from "@/utils/deep-compare";
// // import { CustomToastMessage } from "@/utils/custom-toast-message";

// interface ImageUploadProps {
//   name: string;
//   className?: string;
//   control: Control<any>;
//   imagesError?: any;
//   selectedImageIndex?: number;
//   setSelectedImageIndex?: (newValue: number) => void;
//   maxLengthImages?: number; // New optional prop
//   originObject?: string;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   name,
//   control,
//   className,
//   imagesError,
//   selectedImageIndex,
//   setSelectedImageIndex,
//   maxLengthImages,
//   originObject,
// }) => {
//   const { fields, append, remove, replace } = useFieldArray({
//     control,
//     name,
//     keyName: "id",
//   });

//   const previousData = useRef<any>(fields);

//   const [dragging, setDragging] = useState(false);
//   const hiddenFileInput = useRef<HTMLInputElement>(null);

//   const onAddImages = () => {
//     hiddenFileInput.current?.click();
//   };

//   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const uploadedFiles = Array.from(event.target.files || []);

//     // Prevent adding more files than allowed
//     if (
//       maxLengthImages &&
//       fields.length + uploadedFiles.length > maxLengthImages
//     ) {
//       // CustomToastMessage(
//       //   "error",
//       //   "You have reached the maximum number of images allowed."
//       // );
//       return;
//     }

//     const files = uploadedFiles.map((file) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       })
//     );
//     append(files);

//     hiddenFileInput.current!.value = "";
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragging(false);

//     let files = Array.from(e.dataTransfer.files).map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//       path: file.webkitRelativePath || file.name,
//     }));

//     // Prevent adding more files than allowed
//     if (maxLengthImages && fields.length + files.length > maxLengthImages) {
//       // CustomToastMessage(
//       //   "error",
//       //   "You have reached the maximum number of images allowed."
//       // );
//       const remainingSlots = maxLengthImages - fields.length;
//       files = files.slice(0, remainingSlots);
//     }

//     append(files);
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   useEffect(() => {
//     // if (deepCompare(previousData.current, fields)) {
//     //   const defaultFiles = fields.map((field: any) => {
//     //     if (
//     //       typeof field.file === "undefined" &&
//     //       !field.preview &&
//     //       typeof field !== "string"
//     //     ) {
//     //       return {
//     //         defaultPreview: Object.entries(field)
//     //           .filter(([key]) => key !== "id")
//     //           .map(([, value]) => value)
//     //           .join(""),
//     //       };
//     //     }
//     //   });
//     //   const newUploadedFiles = fields.filter((field: any) => field.preview);
//     //   replace([...defaultFiles, ...newUploadedFiles]);
//     //   previousData.current = [...defaultFiles, ...newUploadedFiles];
//     // }
//   }, [fields.length]);

//   return (
//     <div className={`${className} w-full flex flex-col`}>
//       <div
//         onDrop={handleDrop}
//         onClick={onAddImages}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         className={`border border-dim flex flex-col sm:flex-row items-center gap-4 w-full p-4 sm:p-8 rounded-md ${
//           dragging ? "dark bg-primary-dark" : ""
//         } cursor-pointer`}
//       >
//         <input
//           ref={hiddenFileInput}
//           type="file"
//           accept=".jpg, .jpeg, .png"
//           multiple
//           onChange={handleImageChange}
//           className="hidden"
//           id="image-upload"
//         />
//         <Camera className="w-16 h-16 text-primary-dark" />

//         <label
//           htmlFor="image-upload"
//           className="text-center sm:text-start text-primary-dark dark:text-primary-light cursor-pointer"
//         >
//           Drag and drop your images here, or click to select files
//         </label>
//       </div>

//       <div className="mt-4 w-full flex items-center justify-center sm:justify-start flex-wrap gap-4">
//         {fields.map((field: any, index) => (
//           <div
//             key={field.id}
//             onClick={() => {
//               if (setSelectedImageIndex) {
//                 setSelectedImageIndex(index);
//               }
//             }}
//             className={`relative w-fit ${
//               index !== selectedImageIndex &&
//               "hover:before:content-[''] hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:w-full hover:before:h-full  hover:before:bg-primary-dark hover:before:bg-opacity-50"
//             } transition-all duration-300 rounded-md overflow-hidden  cursor-pointer`}
//           >
//             <Controller
//               control={control}
//               name={`${name}.${index}.file`}
//               render={() => (
//                 <img
//                   // src={
//                   //   field?.preview
//                   //     ? field?.preview
//                   //     : `${ASSETS_API}/${field?.defaultPreview}`
//                   // }
//                   alt={`Preview ${index}`}
//                   className={`${
//                     index === selectedImageIndex && "border-4 border-brand"
//                   } ${
//                     imagesError && imagesError.length && imagesError[index]
//                       ? imagesError[index].status === "rejected"
//                         ? "!border-4 !border-error-red"
//                         : ""
//                       : ""
//                   } w-24 h-24 ${originObject || "object-cover"} rounded-md`}
//                 />
//               )}
//             />
//             <button
//               type="button"
//               onClick={() => remove(index)}
//               className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full hover:bg-opacity-80 transition-all duration-300 z-10"
//             >
//               ×
//             </button>

//             {field.loading && (
//               <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-primary-light bg-opacity-50 backdrop-blur-sm">
//                 <div className="loading-spinner" />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {!!fields.length && maxLengthImages !== 1 && (
//         <p className="mt-2 text-center sm:text-start text-xs text-secondary-dark">
//           Click an image to select as main for your post.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
