var ndServices = new NguoiDungServices();
var validation = new Validation();

function layDSNN() {
    // then(): lấy data thành công
    // catch(): xử lý thất bại
    ndServices.layDS()
        .then(function (response) {
            // thành công
            console.log(response.data);
            hienThiTable(response.data);
        })
        .catch(function (error) {
            // thất bại
            console.log(error.data)
        });
}
layDSNN();


// hiển thiện trên bảng
function hienThiTable(mangND) {
    var content = "";
    mangND.map(function (item, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngonNgu}</td>
            <td>${item.loaiND}</td>
            <td class="row-2">
                <button class="btn btn-danger" onclick="xoa('${item.id}');">Xóa</button>
                <button class="btn btn-info" onclick="layChiTiet('${item.id}');" data-toggle="modal" data-target="#myModal">Xem</button>
            </td>
        </tr>
        `;
    });
    document.querySelector("#tblDanhSachNguoiDung").innerHTML = content;
}

// lấy dữ liệu 
function layDuLieu(currentDS) {
    var taiKhoan = document.querySelector("#TaiKhoan").value;
    var hoTen = document.querySelector("#HoTen").value;
    var matKhau = document.querySelector("#MatKhau").value;
    var email = document.querySelector("#Email").value;
    var hinhAnh = document.querySelector("#HinhAnh").value;
    var loaiND = document.querySelector("#loaiNguoiDung").value;
    var ngonNgu = document.querySelector("#loaiNgonNgu").value;
    var moTa = document.querySelector("#MoTa").value;

    // validation
    var isValid = true;
    if (document.querySelector("#TaiKhoan").disabled != true) {
        isValid &= validation.checkEmpty(taiKhoan, "tbTK", "Tài Khoản không được để trống!") && validation.checkID(taiKhoan, "tbTK", "Tài Khoản bị trùng!", currentDS);
    }

    //Kiểm tra tên   
    isValid &= validation.checkEmpty(hoTen, "tbHoTen", "Tên NV không được để trống!") && validation.checkName(hoTen, "tbHoTen", "Tên không chứa số và ký tự đặc biệt");

    //Kiểm tra email   
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống!") && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    //Kiểm tra pass  
    isValid &= validation.checkEmpty(matKhau, "tbMatKhau", "Mật khẩu không được để trống!") && validation.checkPass(matKhau, "tbMatKhau", "Mật khẩu chưa đúng định dạng");

    //Kiểm tra hình ảnh
    isValid &= validation.checkEmpty(hinhAnh, "tbHinhAnh", "Hình ảnh không được để trống!");

    //Kiểm tra loại người dùng
    isValid &= validation.checkDropdown("loaiNguoiDung", "tbLoaiND", "Bạn chưa chọn loại người dùng nào!");

    //Kiểm tra loại ngôn ngữ 
    isValid &= validation.checkDropdown("loaiNgonNgu", "tbNgonNgu", "Bạn chưa chọn loại ngôn ngữ nào!");

    // kiểm tra mô tả
    isValid &= validation.checkEmpty(moTa, "tbMoTa", "Mô tả không được để trống!") && validation.checkLength(moTa, "tbMoTa", "Mô tả không quá 60 kí tự");

    if (isValid) {
        var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
        return nd;
    } else {
        return 0;
    }
}



// thêm người dùng 
function themND() {
    ndServices.layDS()
        .then(function (response) {
            var nd = layDuLieu(response.data);
            if (nd != 0) {
                ndServices.them(nd)
                    .then(function (response) {
                        console.log(response.data);
                        layDSNN();
                        document.querySelector("#myModal .close").click();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
        .catch(function (error) {
            // thất bại
            console.log(error.data);
            return;
        });

}

document.querySelector("#btnThemNguoiDung").addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="themND();">Thêm</button>
    `;
});

// lấy chi tiết sản phẩm
function layChiTiet(id) {
    ndServices.layND(id)
        .then(function (response) {
            console.log(response.data);
            document.querySelector("#TaiKhoan").disabled = true;
            document.querySelector("#TaiKhoan").value = response.data.taiKhoan;
            document.querySelector("#HoTen").value = response.data.hoTen;
            document.querySelector("#MatKhau").value = response.data.matKhau;
            document.querySelector("#Email").value = response.data.email;
            document.querySelector("#HinhAnh").value = response.data.hinhAnh;
            document.querySelector("#loaiNguoiDung").value = response.data.loaiND;
            document.querySelector("#loaiNgonNgu").value = response.data.ngonNgu;
            document.querySelector("#MoTa").value = response.data.moTa;
            document.querySelector(".modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="capNhat('${response.data.id}');">Cập Nhật</button>
            `;
        })
        .catch(function () {
            console.log(error);
        });
}

// cập nhật người dùng 
function capNhat(id) {
    var nd = layDuLieu();
    ndServices.capNhat(nd,id)
    .then(function(response){
        console.log(response.data);
        layDSNN();
        document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    });

}

// xóa
function xoa(id) {
    ndServices.xoaND(id)
        .then(function (response) {
            console.log(response.data);
            layDSNN();
        })
        .catch(function (error) {
            console.log(error);
        });
}

