import * as Yup from 'yup';

export const contactShema = Yup.object({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی است"),
  photo: Yup.string().url("آدرس معتبر نیست"),
  mobile: Yup.number("شماره تلفن باید عدد باشد").required("شماره تلفن همراه الزامی می باشد"),
  email: Yup.string().email("آدرس ایمیل معتبر نیست").required("آدرس ایمیل الزامی می باشد"),
  job: Yup.string().nullable(),
  group: Yup.string().required("انتخاب گروه الزامی می باشد"),
});