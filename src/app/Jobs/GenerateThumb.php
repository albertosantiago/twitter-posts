<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Model\Upload;

class GenerateThumb implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $upload;

    public function __construct(Upload $upload)
    {
        $this->upload = $upload;
    }


    public function handle()
    {
        $thumbNameParts = explode('.', $this->upload->src);
        $thumbSrc = $thumbNameParts[0]."_thumb_.jpg";
        $thumbPath = storage_path('app/'.$thumbSrc);

        $imagick = new \Imagick(storage_path('app/'.$this->upload->src));
        $imagick->setImageCompressionQuality(100);
        $imagick->thumbnailImage(0, 120);
        $imagick->setImageFormat ("jpeg");
        file_put_contents($thumbPath, $imagick);
        $this->upload->thumbSrc = $thumbSrc;
        return $this->upload->save();
    }
}
