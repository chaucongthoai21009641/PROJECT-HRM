import { notification } from "antd";

// Hàm thông báo thành công
export const notifySuccess = (
  description = "Thành công",
  message = "Thành công!"
) => {
  notification.success({
    message,
    description,
    placement: "bottomRight",
    duration: 2,
  });
};

// Hàm thông báo lỗi
export const notifyError = (
  description = "Có lỗi xảy ra",
  message = "Có lỗi xảy ra!"
) => {
  notification.error({
    message,
    description,
    placement: "bottomRight",
    duration: 2,
  });
};

export const notifyAlert = (
  description = "Thông báo",
  message = "Thông báo!"
) => {
  notification.info({
    message,
    description,
    placement: "bottomRight",
    duration: 2,
  });
};
