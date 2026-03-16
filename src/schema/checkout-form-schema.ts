import * as z from "zod";

export const checkoutFormSchema = z.object({
  details: z.string().nonempty("Details is Required!"),
  phone: z.string().nonempty("Phone is Required!"),
  city: z.string().nonempty("City is Required!"),
  postalCode: z.string().nonempty("Postal code is Required!"),
});
