<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\API\ShortLinkResource;

class ShortLinkCreatedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'result' =>[
                'url' => $this->url,
                'short_url' => url($this->short),
            ],
            'links' =>  ShortLinkResource::collection($this->user->links)
        ];
    }

    public function withResponse($request, $response)
    {
        $response->setStatusCode(200);
    }
}
