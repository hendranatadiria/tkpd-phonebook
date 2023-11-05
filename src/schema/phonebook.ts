import { findPhoneNumber } from "@/services/phonebook";
import * as yup from "yup";

const isPhoneUnique = async (value:string) => {
  try {
    const response = await findPhoneNumber([value]);
    return response.phone.length === 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const insertContactSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phones: yup.array().of(
    yup.string().required("Phone number is required").test("unique", "Number already exists in contact list", isPhoneUnique),
  ),
});