<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Illuminate\Http\Request;

class ShortLinksController extends Controller
{
    public function __invoke(string $shortURLKey)
    {
        $shortLink = ShortLink::where('short', $shortURLKey)->firstOrFail();
        return redirect($shortLink->url, 301);
    }
}
