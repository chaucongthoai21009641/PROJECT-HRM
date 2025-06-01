<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NgayLe extends Model
{
    use HasFactory;

    protected $table = 'ngayle';
    protected $primaryKey = 'maNL';
    public $timestamps = true;

    protected $fillable = [
        'tieuDe',
        'tgBatDau',
        'tgKetThuc',
        'mauSac'
    ];
}
