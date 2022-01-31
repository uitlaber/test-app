<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\ShortLink\ShortLinkCreatedRequest;
use App\Http\Resources\API\ShortLinkCreatedResource;
use App\Http\Resources\API\ShortLinkResource;
use App\Http\Resources\API\System\EntityDeletedSuccessfullyResource;
use App\Http\Resources\API\System\EntityNotFoundResource;
use App\Http\Resources\API\System\ServerErrorResource;
use App\Models\ShortLink;
use Exception;

class ShortLinksController extends Controller
{

    public function index()
    {
        $links = auth()
            ->user()
            ->links()
            ->get();

        return ShortLinkResource::collection($links);
    }

    public function store(ShortLinkCreatedRequest $request)
    {
        try {
            $short_link = ShortLink::generateShortUrl($request->post('url'), $request->user());
            return  new ShortLinkCreatedResource($short_link);
        } catch (Exception $e) {
            return new ServerErrorResource(null);
        }
    }

    public function destroy($id)
    {
        if (!auth()->user()->links()->find($id)) {
            return new EntityNotFoundResource(null);
        }

        ShortLink::destroy($id);

        return new EntityDeletedSuccessfullyResource(null);
    }
}
