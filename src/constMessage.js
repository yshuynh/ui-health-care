let lang = "vi";

const Messages = lang === "en" ? {
    "phone_number": "Phone number",
    "phoneNumber": "Phone number",
    "password": "Password",
    "forgotPassword": "Forgot password",
    "signIn": "Sign in",
    "prescriptionToken": "Prescription Token",
    "scanQrCode": "Scan QR code",
    "patientPhoneNumber": "Patient Phone Number",
    "next": "Next",
    "stepOneInputPatientPhoneNumber": 'Input patient phone number',
    'patientName': "Patient name",
    'age': 'Age',
    'gender': "Gender",
    'address': 'Address',
} : {
    "phone_number": "Số điện thoại",
    "phoneNumber": "Số điện thoại",
    "password": "Mật khẩu",
    "forgotPassword": "Quên mật khẩu",
    "signIn": "Đăng nhập",
    "scanQrCode": "Quét mã QR",
    "patientPhoneNumber": "Số điện thoại bệnh nhân",
    "next": "Tiếp theo",
    "stepOneInputPatientInfoToken": 'Nhập mã khóa thông tin bệnh nhân',
    'patientName': "Tên bệnh nhân",
    'age': 'Tuổi',
    'gender': "Giới tính",
    'address': 'Địa chỉ',
    'stepTwoCheckInfoAndInputPrescription': 'Kiểm tra thông tin và nhập dữ liệu',
    'insuranceNumber': 'Số bảo hiểm y tế',
    'diagnostic': 'Chuẩn đoán',
    'stt': 'STT',
    'prescriptionName': 'Tên thuốc',
    'unit': 'Đơn vị',
    'amount': 'Số lượng',
    'add': 'Thêm',
    'prescriptionList': 'Danh sách đơn thuốc',
    'medicineList': 'Danh mục thuốc',
    'id': "ID",
    'medicineName': 'Tên hoạt chất',
    'medicineTradeName': 'Tên thương mại',
    'concentration': 'Hàm lượng, nồng độ',
    'usage': 'Cách dùng',
    'facility': 'Nơi sản xuất',
    'country': 'Quốc gia',
    'stepThreeAddMedicines': 'Chuẩn đoán bệnh và kê đơn thuốc',
    'check': 'Kiểm tra',
    'finish': 'Hoàn thành',
    'searchMedicineName': 'Tìm kiếm tên hoạt chất',
    'male': 'Nam',
    'female': 'Nữ',
    'dob': 'Ngày sinh',
    'confirm': 'Xác nhận',
    'yes': 'Đồng ý',
    'no': 'Không',
    'confirmCreatePrescriptionFor': 'Xác nhận tạo đơn thuốc cho ',
    'phoneNumberNotFound': 'Số điện thoại không tồn tại',
    'thisFieldRequired': 'Giá trị này không thể để trống',
    'personalInfo': 'Thông tin cá nhân',
    'createPrescription': 'Tạo đơn thuốc',
    'doctor': 'Bác sĩ',
    'changePassword': 'Đổi mật khẩu',
    'save': 'Lưu',
    'confirmSaveInfo': 'Xác nhận lưu thông tin cá nhân',
    'action': 'Hành động',
    'detail': 'Chi tiết',
    'note': 'Ghi chú',
    'patientInfo': 'Thông tin bệnh nhân',
    'oldPassword': 'Mật khẩu cũ',
    'newPassword': 'Mật khẩu mới',
    'confirmPW': 'Xác nhận mật khẩu mới',
    'atLeast8Char': 'Tối thiểu 8 kí tự',
    'alertConfirmNotCorrect': 'Mật khẩu xác nhận không đúng',
    'changPassSuccess': 'Đổi mật khẩu thành công',
    'changPassFail': 'Đổi mật khẩu không thành công',
    'prescriptionInfo': 'Thông tin đơn thuốc',
    'height': 'Chiều cao (cm)',
    'weight': 'Cân nặng (kg)',
    'bodyTemperature': 'Nhiệt độ cơ thể',
    'bloodGroup': 'Nhóm máu',
    'systolicBloodPressure': 'Huyết áp',
    'diastolicBloodPressure': 'Huyết áp tâm trương',
    'medicalHistory': 'Tiền sử bệnh án',
    'createMedicalInfo': 'Tạo thông tin y tế',
    'noData': 'Không có dữ liệu',
    'logout': 'Đăng xuất',
    'pharmacist': 'Dược sĩ',
    'saveSuccess': 'Lưu thành công',
    'didError': 'Đã xảy ra lỗi',
    'success': 'Thành công',
    'updatePrescription': 'Cập nhật đơn thuốc',
    'inputPrescriptionToken': 'Nhập mã khóa đơn thuốc',
    'prescriptionToken': 'Mã khóa đơn thuốc',
    'errorNeedGrantCameraAccessPermission': 'Lỗi: Cần cấp quyền truy cập camera',
    'errorNoCameraOnThisDevice': 'Lỗi: Thiết bị này không có camera',
    'tokenExpired': 'Mã khóa đã hết hạn',
    'doctorManagement': 'Trang quản lý của bác sĩ',
    'pharmacistManagement': 'Trang quản lý của dược sĩ',
    'hospitalManagement': 'Trang quản lý của bệnh viện',
    'pharmacyManagement': 'Trang quản lý của hiệu thuốc',
    'doctorName': 'Họ tên bác sĩ',
    'doctorListOfHospital': 'Danh sách bác sĩ của bệnh viện',
    'doctorList': 'Danh sách bác sĩ',
    'createAccount': 'Tạo tài khoản',
    'hospital': 'Bệnh viện',
    'name': 'Họ và tên',
    'error': 'Lỗi',
    'phoneNumberAlreadyExist': 'Số điện thoại đã tồn tại',
    'avatar': 'Ảnh đại diện',
    'departmentHospital': 'Phòng khám',
    'patientInfoToken': 'Mã khóa thông tin bệnh nhân',
    'delete': 'Xóa',
    'doctorNote': 'Ghi chú bác sĩ',
    'pharmacistNote': 'Ghi chú dược sĩ',
    'prescriptionNote': 'Ghi chú đơn thuốc',
    'register': 'Đăng ký',
    'isActive': 'Kích hoạt?',
    'admin': 'Quản trị viên',
    'adminManagement': 'Trang quản trị',
    'hostpital': 'Bệnh viện',
    'drugstore': 'Hiệu thuốc',
    'hospitalList': 'Danh sách bệnh viện',
    'drugstoreList': 'Danh sách hiệu thuốc',
    'pharmacistList': 'Danh sách dược sĩ',
    'pharmacistName': 'Dược sĩ',
    'drugstoreManagement': 'Trang quản lý của nhà thuốc',
    'backgroundImage': 'Ảnh nền',
    'roleSelect': 'Chọn loại tài khoản',
    'email': 'Email',
    'emailMustValid': 'Email không hợp lệ',
}

Messages.install = function (Vue) {
    Vue.prototype.$t = (key) => {
        return Messages[key];
    }
};

export default Messages
