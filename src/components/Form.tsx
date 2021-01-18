import type { FC } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}

const Form: FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = (data: FormData): void => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" name="name" ref={register} />

      <input name="age" ref={register({ required: true })} type="number" />
      {errors.age && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Form;
