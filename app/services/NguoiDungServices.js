function NguoiDungServices() {
    // lấy danh sách sản phẩm
    this.layDS = function () {
        return axios({
            method: 'get',
            url: 'https://6136bee38700c50017ef562f.mockapi.io/Products'
        });
    }

    // Thêm
    this.them = function (nd) {
        return axios({
            method: 'post',
            url: 'https://6136bee38700c50017ef562f.mockapi.io/Products',
            data: nd
        });
    }

    // lấy người dùng
    this.layND = function(id){
        return axios({
            method: 'get',
            url: `https://6136bee38700c50017ef562f.mockapi.io/Products/${id}`
        });
    }
    // cập nhật sản phẩm
    this.capNhat = function(nd,id){
        return axios({
            method: 'put',
            url: `https://6136bee38700c50017ef562f.mockapi.io/Products/${id}`,
            data:nd
        });
    }
    // cập nhật sản phẩm
    this.xoaND = function(id){
        return axios({
            method: 'delete',
            url: `https://6136bee38700c50017ef562f.mockapi.io/Products/${id}`
        });
    }


}

