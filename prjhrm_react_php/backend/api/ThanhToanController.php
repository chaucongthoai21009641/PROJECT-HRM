<?php

namespace App\Http\Controllers;

use App\Models\ThanhToan;
use Illuminate\Http\Request;

class ThanhToanController extends Controller
{
    /**
     * Lấy danh sách tất cả phương thức thanh toán.
     */
    public function index()
    {
        return response()->json(ThanhToan::all(), 200);
    }

    /**
     * Thêm mới phương thức thanh toán.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tenDVhoacNH' => 'required|string|max:255',
            'soDThoacSTK' => 'required|string|max:50',
            'tenChuTaiKhoan' => 'required|string|max:255',
            'hinhAnh' => 'nullable|string',
        ]);

        $thanhtoan = ThanhToan::create($request->all());

        return response()->json(['message' => 'Thêm phương thức thanh toán thành công!', 'data' => $thanhtoan], 201);
    }

    /**
     * Hiển thị thông tin chi tiết của một phương thức thanh toán.
     */
    public function show($id)
    {
        $thanhtoan = ThanhToan::find($id);

        if (!$thanhtoan) {
            return response()->json(['message' => 'Không tìm thấy phương thức thanh toán!'], 404);
        }

        return response()->json($thanhtoan, 200);
    }

    /**
     * Cập nhật thông tin phương thức thanh toán.
     */
    public function update(Request $request, $id)
    {
        $thanhtoan = ThanhToan::find($id);

        if (!$thanhtoan) {
            return response()->json(['message' => 'Không tìm thấy phương thức thanh toán!'], 404);
        }

        $request->validate([
            'tenDVhoacNH' => 'sometimes|required|string|max:255',
            'soDThoacSTK' => 'sometimes|required|string|max:50',
            'tenChuTaiKhoan' => 'sometimes|required|string|max:255',
            'hinhAnh' => 'nullable|string',
        ]);

        $thanhtoan->update($request->all());

        return response()->json(['message' => 'Cập nhật thành công!', 'data' => $thanhtoan], 200);
    }

    /**
     * Xóa phương thức thanh toán.
     */
    public function destroy($id)
    {
        $thanhtoan = ThanhToan::find($id);

        if (!$thanhtoan) {
            return response()->json(['message' => 'Không tìm thấy phương thức thanh toán!'], 404);
        }

        $thanhtoan->delete();

        return response()->json(['message' => 'Xóa thành công!'], 200);
    }
}
