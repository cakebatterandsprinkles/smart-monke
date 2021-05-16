export const checkErrors = (...args: (number | undefined)[]): Promise<{ message: string }> =>
  new Promise((resolve, reject) => {
    args.some((arg) => arg === undefined)
      ? reject({ message: "Please fill all the empty fields for the calculation" })
      : resolve({ message: "Success" });
  });
