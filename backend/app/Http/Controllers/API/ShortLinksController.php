<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\ShortLink\ShortLinkCreatedRequest;
use App\Http\Requests\ShortLink\API\ShortLinkUpdatedRequest;
use App\Http\Resources\API\ShortLinkCreatedResource;
use App\Http\Resources\API\ShortLinkResource;
use App\Http\Resources\API\ShortLinkUpdatedResource;
use App\Http\Resources\API\System\EntityDeletedSuccessfullyResource;
use App\Http\Resources\API\System\EntityNotFoundResource;
use App\Http\Resources\API\System\ServerErrorResource;
use App\Models\ShortLink;
use Exception;
use Illuminate\Http\Request;

class ShortLinksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index()
    {
        $links = auth()
            ->user()
            ->links()
            ->get();

        return ShortLinkResource::collection($links);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\API\Post\PostCreateRequest  $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(ShortLinkCreatedRequest $request)
    {

        $url = $request->post('url');

        try {
            $short_link = ShortLink::generateShortUrl($url, $request->user());
            return  new ShortLinkCreatedResource($short_link);
        } catch (Exception $e) {
            return new ServerErrorResource(null);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function destroy($id)
    {
        if (!auth()->user()->links()->find($id)) {
            return new EntityNotFoundResource(null);
        }

        ShortLink::destroy($id);

        return new EntityDeletedSuccessfullyResource(null);
    }
}
