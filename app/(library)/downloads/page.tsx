<<<<<<< HEAD
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, Download } from "lucide-react";
import { useState, useEffect } from "react";

const DownloadsPage = () => {
  const [loading, setLoading] = useState(true);
  const [downloads, setDownloads] = useState<Video[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setDownloads([
        {
          id: "1",
          title: "Downloaded Video 1",
          thumbnail: "/api/placeholder/320/180",
          duration: "20:30",
          views: "980K"
        },
        // Add more videos
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-yellow-900 to-orange-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Downloads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[180px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : (
          downloads.map((video) => (
            <div key={video.id} className="group relative">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                  {video.duration}
                </span>
                <button className="absolute top-2 right-2 bg-black bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{video.title}</h3>
              <p className="text-gray-400">{video.views} views</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

=======
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, Download } from "lucide-react";
import { useState, useEffect } from "react";

const DownloadsPage = () => {
  const [loading, setLoading] = useState(true);
  const [downloads, setDownloads] = useState<Video[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setDownloads([
        {
          id: "1",
          title: "Downloaded Video 1",
          thumbnail: "/api/placeholder/320/180",
          duration: "20:30",
          views: "980K"
        },
        // Add more videos
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-yellow-900 to-orange-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Downloads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[180px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : (
          downloads.map((video) => (
            <div key={video.id} className="group relative">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                  {video.duration}
                </span>
                <button className="absolute top-2 right-2 bg-black bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{video.title}</h3>
              <p className="text-gray-400">{video.views} views</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

>>>>>>> 0c527ff82d31ad2f2bda4912cf7bb385822419f8
export default DownloadsPage;