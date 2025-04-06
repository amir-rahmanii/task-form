import type { UseFormReturn } from "react-hook-form";

import { FormProvider } from "react-hook-form";

interface Props {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  className?: string;
}

const Form = ({ children, methods, onSubmit, className }: Props) => {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
