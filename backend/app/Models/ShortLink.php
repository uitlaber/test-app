<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;

class ShortLink extends Model
{
    use HasFactory;


    protected $fillable = [
        'url',
        'short',
        'user_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Сгенерировать сокращенный URL
     * @return String
     */
    public static function generateShortUrl(String $toUrl, $user): ShortLink
    {
        $urlKey = self::getUniqueKey();

        $result = self::create([
            'url' => $toUrl,
            'short' => $urlKey,
            'user_id' => $user->id
        ]);

        return $result;
    }

    /**
     * Сгенерировать рандомный уникальный ключь
     *
     * @return String
     */
    protected static function getUniqueKey(): String {
        $randomKey = Str::random(config('short_url.length'));
        while(self::where('short', $randomKey)->exists()) {
            $randomKey = Str::random(config('short_url.length'));
        }

        return $randomKey;
    }
}
