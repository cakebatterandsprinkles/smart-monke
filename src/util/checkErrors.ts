export const checkErrors = (...args: (number | undefined)[]): Promise<{ message: string }> =>
  new Promise((resolve, reject) => {
    args.some((arg) => arg === undefined)
      ? reject({ message: "Fill in the goddamn form will ya" })
      : resolve({ message: "Success" });
  });
