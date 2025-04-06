"use client";
import type { AddUserSchemaType } from "@/schemas/addUserSchema";

import Form from "@/components/shared/forms/FormProvider";
import Input from "@/components/shared/forms/Input";
import Select from "@/components/shared/forms/Select";
import TelInput from "@/components/shared/forms/TelInput";
import Paper from "@/components/shared/Paper";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { addUserSchema } from "@/schemas/addUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddNewUser() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const methods = useForm<AddUserSchemaType>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "sohrab.yazdan@gmail.com",
      password: "Qazmlp1@qaz",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: AddUserSchemaType) => {
    console.log("User Data:", data);
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Paper className="mt-5 py-8 px-3">
      <Form
        className="grid grid-cols-12 gap-5"
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          required
          label="First Name"
          name="firstName"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.firstName}
          placeholder="Ex : John"
        />
        <Input
          required
          label="Last Name"
          name="lastName"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.lastName}
          placeholder="Ex : Doe"
        />
        <TelInput
          required
          label="Phone Number"
          name="phoneNumber"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.phoneNumber}
          placeholder="Ex : 9301232582"
        />
        <Input
          required
          label="Email"
          name="email"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.email}
          placeholder="Ex : exapmle@gmail.com"
        />
        <Input
          label="NickName"
          name="nickname"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.nickname}
          placeholder="Ex : johnny"
        />
        <Select
          required
          label="Role"
          name="role"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.role}
          options={[
            { id: "admin", label: "Admin" },
            { id: "user", label: "User" },
            { id: "moderator", label: "Moderator" },
          ]}
        ></Select>
        <Input
          required
          label="Password"
          name="password"
          type="password"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.password}
          isPasswordVisible={isPasswordVisible}
          placeholder="Ex : johnny"
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <Input
          required
          label="Instagram ID"
          name="instagramId"
          wrapperClassName="col-span-12 md:col-span-6 xl:col-span-4"
          control={methods.control}
          error={errors.instagramId}
          placeholder="Ex : intagram-user"
        />
        <Input
          label="Address"
          name="address"
          wrapperClassName="col-span-12"
          control={methods.control}
          error={errors.address}
          placeholder="Ex : 123 Main St"
        />

        <TelInput
          required
          label="Telegram Phone Number"
          name="telegramPhoneNumber"
          wrapperClassName="col-span-12 xl:col-span-6"
          control={methods.control}
          error={errors.telegramPhoneNumber}
          placeholder="Ex : 9301232582"
        />
        <TelInput
          required
          label="Whatsapp Phone Number"
          name="whatsappPhoneNumber"
          wrapperClassName="col-span-12 xl:col-span-6"
          control={methods.control}
          error={errors.whatsappPhoneNumber}
          placeholder="Ex : 9301232582"
        />

        <PrimaryButton
          className="cursor-pointer"
          type="submit"
          variant="contained"
          wrapperClassName="col-span-12 xl:col-start-11 xl:col-span-2"
        >
          Create User
        </PrimaryButton>
      </Form>
    </Paper>
  );
}
