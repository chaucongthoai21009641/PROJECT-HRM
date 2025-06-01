<?php

namespace App\Http\Controllers;

use App\Models\NgayLe;
use Illuminate\Http\Request;

class NgayLeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return response()->json(NgayLe::all(), 200);
    }

    // Thêm ngày lễ mới
    public function store(Request $request) {
        $request->validate([
            'tieuDe' => 'required|string|max:255',
            'tgBatDau' => 'required|date',
            'tgKetThuc' => 'required|date|after_or_equal:tgBatDau',
            'mauSac' => 'required|string|max:50'
        ]);

        $ngayLe = NgayLe::create($request->all());
        return response()->json($ngayLe, 201);
    }

    // Lấy thông tin ngày lễ theo maNL
    public function show($maNL) {
        $ngayLe = NgayLe::find($maNL);
        if (!$ngayLe) {
            return response()->json(['message' => 'Không tìm thấy ngày lễ'], 404);
        }
        return response()->json($ngayLe, 200);
    }

    // Cập nhật ngày lễ
    public function update(Request $request, $maNL) {
        $ngayLe = NgayLe::find($maNL);
        if (!$ngayLe) {
            return response()->json(['message' => 'Không tìm thấy ngày lễ'], 404);
        }

        $request->validate([
            'tieuDe' => 'string|max:255',
            'tgBatDau' => 'date',
            'tgKetThuc' => 'date|after_or_equal:tgBatDau',
            'mauSac' => 'string|max:50'
        ]);

        $ngayLe->update($request->all());
        return response()->json($ngayLe, 200);
    }

    // Xóa ngày lễ
    public function destroy($maNL) {
        $ngayLe = NgayLe::find($maNL);
        if (!$ngayLe) {
            return response()->json(['message' => 'Không tìm thấy ngày lễ'], 404);
        }

        $ngayLe->delete();
        return response()->json(['message' => 'Xóa thành công'], 200);
    }
}
