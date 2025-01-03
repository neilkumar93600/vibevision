<<<<<<< HEAD
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow, Mousewheel, Keyboard } from 'swiper/modules';
import {
    Play, Pause, Heart, Star, Share2, Sparkles, Music,
    Mic, RefreshCw, TrendingUp, ChevronRight, Volume2,
    SkipBack, SkipForward, Shuffle, Repeat, User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Slider } from "../../../components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { Badge } from "../../../components/ui/badge";
import LyricsDisplay from '../../../components/media/lyrics-display';
import MusicPlayer from '../../../components/media/music-player';
import Playlist from '../../../components/media/playlist-component';
import { Layout } from "../../../components/layout/layout";
import { LampContainer } from "../../../components/ui/lamp";

// Enhanced features data with gradients and hover states
const features = [
    {
        title: 'Lofi Conversion',
        description: 'Transform any track into a chill lofi masterpiece with AI',
        icon: <Music className="w-8 h-8" />,
        gradient: 'from-purple-500 to-pink-500',
        path: '/lofi',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")"
    },
    {
        title: 'Song Creation',
        description: 'Create original songs with AI assistance and professional tools',
        icon: <Mic className="w-8 h-8" />,
        gradient: 'from-blue-500 to-teal-500',
        path: '/song-creation',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17l-7-7h14l-7 7z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"
    },
    {
        title: 'Custom Song',
        description: 'Personalize existing tracks with AI-powered remixing tools',
        icon: <Sparkles className="w-8 h-8" />,
        gradient: 'from-orange-500 to-red-500',
        path: '/custom-song-generator',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 0h16a2 2 0 012 2v16a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm0 2v16h16V2H2z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"
    },
    {
        title: 'Song Extension',
        description: 'Extend your favorite tracks with AI-generated content',
        icon: <RefreshCw className="w-8 h-8" />,
        gradient: 'from-green-500 to-emerald-500',
        path: '/create/extend',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L10 10zm10 10L20 20V0zM0 20h20L10 10z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"
    }
];

// Popular artists data
const popularArtists = [
    {
        id: 1,
        name: 'Sarah Brooks',
        avatar: '/artists/sarah.jpg',
        followers: '1.2M',
        bio: 'Electronic music producer known for ambient soundscapes',
        popularTrack: 'Neon Dreams'
    },
    {
        id: 2,
        name: 'The Neural Beats',
        avatar: '/artists/neural.jpg',
        followers: '892K',
        bio: 'AI-assisted music collective pushing boundaries',
        popularTrack: 'Digital Horizon'
    },
    // Add more artists...
];


const HomePage = () => {
    const router = useRouter();
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [followers, setFollowers] = useState({});
    const [audioRef, setAudioRef] = useState(null);

    // Enhanced trending songs data with more metadata
    useEffect(() => {
        setTrendingSongs([
            {
                id: 1,
                title: 'Midnight Dreams',
                artist: 'The Cosmic Band',
                genre: 'Electronic',
                views: '1.2M',
                likes: '45K',
                duration: 237,
                releaseDate: '2024-03-15',
                coverArt: '/api/placeholder/400/400',
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                waveformData: Array.from({ length: 100 }, () => Math.random()),
                bpm: 128,
                key: 'Am',
                tags: ['electronic', 'ambient', 'chill']
            },
            // Add more songs with similar detailed metadata
        ]);
    }, []);

    // Audio playback controls
    const handlePlayPause = (track) => {
        if (currentTrack?.id === track.id) {
            setIsPlaying(!isPlaying);
            isPlaying ? audioRef?.pause() : audioRef?.play();
        } else {
            setCurrentTrack(track);
            setIsPlaying(true);
            // Initialize new audio
            if (audioRef) {
                audioRef.pause();
            }
            const newAudio = new Audio(track.audioUrl);
            newAudio.volume = volume;
            setAudioRef(newAudio);
            newAudio.play();
        }
    };

    // Follow/Unfollow functionality
    const handleFollowClick = (artistId) => {
        setFollowers(prev => ({
            ...prev,
            [artistId]: !prev[artistId]
        }));
    };

    // Enhanced Hero Section with dynamic waveform
    const HeroSection = () => (
        <LampContainer>
            <section className="container mx-auto py-20 text-center">
                <motion.h1
                    className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent mt-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    AI-Powered Music Creation
                </motion.h1>
                <motion.p
                    className="text-xl text-muted-foreground max-w-2xl mt-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Create, collaborate, and explore professional music-making tools powered by AI
                </motion.p>

            </section>
        </LampContainer>
    );

    // Interactive Features Grid with enhanced animations
    const FeaturesGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {features.map((feature, index) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    }}
                    className="cursor-pointer"
                    onClick={() => router.push(feature.path)}
                >
                    <Card
                        className={`relative overflow-hidden h-[300px] bg-gradient-to-br ${feature.gradient}`}
                    >
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: feature.bgPattern }}
                        />
                        <CardContent className="p-6 flex flex-col items-center justify-center h-full text-white relative z-10">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 p-4 bg-white/10 rounded-full"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-sm text-center text-white/90 mb-4">{feature.description}</p>
                            <div className="absolute bottom-4 left-4">
                                <Badge variant="secondary" className="bg-white/20">
                                    AI-Powered
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );

    // Enhanced Trending Section with preview functionality
    const TrendingSection = () => (
        <Card className="p-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Trending Now</CardTitle>
                    <div className="flex items-center space-x-4">
                        <Tabs defaultValue="all" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="electronic">Electronic</TabsTrigger>
                                <TabsTrigger value="pop">Pop</TabsTrigger>
                                <TabsTrigger value="rock">Rock</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/trending')}
                        >
                            View All <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={true}
                    keyboard={{ enabled: true, }}
                    pagination={{ clickable: true }}
                >
                    {trendingSongs.map((song) => (
                        <SwiperSlide key={song.id}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative group rounded-lg overflow-hidden"
                            >
                                <img
                                    src={song.coverArt}
                                    alt={song.title}
                                    className="w-full aspect-square object-cover"
                                />
                                <motion.div
                                    className="absolute inset-0 bg-black/50"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        className="w-12 h-12"
                                                        onClick={() => handlePlayPause(song)}
                                                    >
                                                        {currentTrack?.id === song.id && isPlaying ? (
                                                            <Pause className="w-6 h-6" />
                                                        ) : (
                                                            <Play className="w-6 h-6" />
                                                        )}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{currentTrack?.id === song.id && isPlaying ? 'Pause' : 'Preview Track'}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <div className="flex items-center space-x-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button
                                                            variant="secondary"
                                                            size="icon"
                                                            className="w-8 h-8"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Implement like functionality
                                                            }}
                                                        >
                                                            <Heart className="w-4 h-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Add to Favorites</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button
                                                            variant="secondary"
                                                            size="icon"
                                                            className="w-8 h-8"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Implement share functionality
                                                            }}
                                                        >
                                                            <Share2 className="w-4 h-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Share Track</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </motion.div>
                                <div className="p-4">
                                    <h3 className="font-medium truncate">{song.title}</h3>
                                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center">
                                                <Play className="w-4 h-4 mr-1" />
                                                {song.views}
                                            </div>
                                            <div className="flex items-center">
                                                <Heart className="w-4 h-4 mr-1" />
                                                {song.likes}
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {song.genre}
                                        </Badge>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </CardContent>
        </Card>
    );

    // Enhanced Artists Section with dynamic follow functionality
    const ArtistsSection = () => {
        const [hoveredArtist, setHoveredArtist] = useState(null);
        const [followedArtists, setFollowedArtists] = useState(new Set());

        const handleFollow = (artistId) => {
            setFollowedArtists(prev => {
                const newSet = new Set(prev);
                if (newSet.has(artistId)) {
                    newSet.delete(artistId);
                } else {
                    newSet.add(artistId);
                }
                return newSet;
            });
        };

        return (
            <Card className="p-6">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Creators You May Like</CardTitle>
                        <Button variant="ghost" onClick={() => router.push('/artists')}>
                            View All Artists
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={5}
                        navigation
                    >
                        {popularArtists.map((artist) => (
                            <SwiperSlide key={artist.id}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative text-center space-y-4"
                                    onHoverStart={() => setHoveredArtist(artist.id)}
                                    onHoverEnd={() => setHoveredArtist(null)}
                                >
                                    <div className="relative">
                                        <Avatar className="w-32 h-32 mx-auto">
                                            <AvatarImage src={artist.avatar} alt={artist.name} />
                                            <AvatarFallback>{artist.name[0]}</AvatarFallback>
                                        </Avatar>
                                        {hoveredArtist === artist.id && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
                                            >
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handlePlayPause(artist.popularTrack)}
                                                >
                                                    Play Track
                                                </Button>
                                            </motion.div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg">{artist.name}</h3>
                                        <p className="text-sm text-gray-400">{artist.followers} followers</p>
                                        <p className="text-xs text-gray-400 mt-1">Popular: {artist.popularTrack}</p>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant={followedArtists.has(artist.id) ? "secondary" : "outline"}
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleFollow(artist.id)}
                                        >
                                            {followedArtists.has(artist.id) ? 'Following' : 'Follow'}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </CardContent>
            </Card>
        );
    };

    // Weekly Challenge Section
    const WeeklyChallenge = () => (
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardHeader>
                <CardTitle>Weekly Music Challenge</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">This Week&apos;s Theme:</h3>
                        <p className="text-lg mb-4">Create a summer-inspired lofi track</p>
                        <div className="space-y-2">
                            <p className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                256 Participants
                            </p>
                            <p className="flex items-center">
                                <Star className="w-4 h-4 mr-2" />
                                Top Prize: $500
                            </p>
                        </div>
                        <Button className="mt-4 bg-white text-purple-600 hover:bg-white/90">
                            Join Challenge
                        </Button>
                    </div>
                    <div className="relative">
                        <img
                            src="/challenge-banner.jpg"
                            alt="Challenge Banner"
                            className="rounded-lg"
                        />
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                            <Button size="sm" variant="secondary">
                                View Submissions
                            </Button>
                            <Button size="sm" variant="secondary">
                                Rules
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Collaborative Playlists Section
    const CollaborativePlaylists = () => (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Collaborative Playlists</CardTitle>
                    <Button variant="outline">Create New Playlist</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((playlist) => (
                        <Card key={playlist} className="hover:bg-accent transition-colors">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="grid grid-cols-2 gap-1 w-16 h-16">
                                        {[1, 2, 3, 4].map((img) => (
                                            <div key={img} className="bg-gray-200 rounded" />
                                        ))}
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Weekend Vibes</h4>
                                        <p className="text-sm text-gray-400">12 collaborators</p>
                                        <p className="text-sm text-gray-400">32 tracks</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Utility function to format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
                <HeroSection />

                <div className="container mx-auto space-y-12 py-12">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Create with AI</h2>
                        <FeaturesGrid />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Trending Music</h2>
                        <TrendingSection />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Weekly Challenge</h2>
                        <WeeklyChallenge />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Discover Artists</h2>
                        <ArtistsSection />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Collaborative Playlists</h2>
                        <CollaborativePlaylists />
                    </section>
                </div>
                {currentTrack && <MusicPlayer />}
            </div>
        </Layout>
    );
};

=======
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow, Mousewheel, Keyboard } from 'swiper/modules';
import {
    Play, Pause, Heart, Star, Share2, Sparkles, Music,
    Mic, RefreshCw, TrendingUp, ChevronRight, Volume2,
    SkipBack, SkipForward, Shuffle, Repeat, User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Slider } from "../../../components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { Badge } from "../../../components/ui/badge";
import LyricsDisplay from '../../../components/media/lyrics-display';
import MusicPlayer from '../../../components/media/music-player';
import Playlist from '../../../components/media/playlist-component';
import { Layout } from "../../../components/layout/layout";
import { LampContainer } from "../../../components/ui/lamp";

// Enhanced features data with gradients and hover states
const features = [
    {
        title: 'Lofi Conversion',
        description: 'Transform any track into a chill lofi masterpiece with AI',
        icon: <Music className="w-8 h-8" />,
        gradient: 'from-purple-500 to-pink-500',
        path: '/lofi',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")"
    },
    {
        title: 'Song Creation',
        description: 'Create original songs with AI assistance and professional tools',
        icon: <Mic className="w-8 h-8" />,
        gradient: 'from-blue-500 to-teal-500',
        path: '/song-creation',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17l-7-7h14l-7 7z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"
    },
    {
        title: 'Custom Song',
        description: 'Personalize existing tracks with AI-powered remixing tools',
        icon: <Sparkles className="w-8 h-8" />,
        gradient: 'from-orange-500 to-red-500',
        path: '/custom-song-generator',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 0h16a2 2 0 012 2v16a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm0 2v16h16V2H2z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"
    },
    {
        title: 'Song Extension',
        description: 'Extend your favorite tracks with AI-generated content',
        icon: <RefreshCw className="w-8 h-8" />,
        gradient: 'from-green-500 to-emerald-500',
        path: '/create/extend',
        bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L10 10zm10 10L20 20V0zM0 20h20L10 10z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"
    }
];

// Popular artists data
const popularArtists = [
    {
        id: 1,
        name: 'Sarah Brooks',
        avatar: '/artists/sarah.jpg',
        followers: '1.2M',
        bio: 'Electronic music producer known for ambient soundscapes',
        popularTrack: 'Neon Dreams'
    },
    {
        id: 2,
        name: 'The Neural Beats',
        avatar: '/artists/neural.jpg',
        followers: '892K',
        bio: 'AI-assisted music collective pushing boundaries',
        popularTrack: 'Digital Horizon'
    },
    // Add more artists...
];


const HomePage = () => {
    const router = useRouter();
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [followers, setFollowers] = useState({});
    const [audioRef, setAudioRef] = useState(null);

    // Enhanced trending songs data with more metadata
    useEffect(() => {
        setTrendingSongs([
            {
                id: 1,
                title: 'Midnight Dreams',
                artist: 'The Cosmic Band',
                genre: 'Electronic',
                views: '1.2M',
                likes: '45K',
                duration: 237,
                releaseDate: '2024-03-15',
                coverArt: '/api/placeholder/400/400',
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                waveformData: Array.from({ length: 100 }, () => Math.random()),
                bpm: 128,
                key: 'Am',
                tags: ['electronic', 'ambient', 'chill']
            },
            // Add more songs with similar detailed metadata
        ]);
    }, []);

    // Audio playback controls
    const handlePlayPause = (track) => {
        if (currentTrack?.id === track.id) {
            setIsPlaying(!isPlaying);
            isPlaying ? audioRef?.pause() : audioRef?.play();
        } else {
            setCurrentTrack(track);
            setIsPlaying(true);
            // Initialize new audio
            if (audioRef) {
                audioRef.pause();
            }
            const newAudio = new Audio(track.audioUrl);
            newAudio.volume = volume;
            setAudioRef(newAudio);
            newAudio.play();
        }
    };

    // Follow/Unfollow functionality
    const handleFollowClick = (artistId) => {
        setFollowers(prev => ({
            ...prev,
            [artistId]: !prev[artistId]
        }));
    };

    // Enhanced Hero Section with dynamic waveform
    const HeroSection = () => (
        <LampContainer>
            <section className="container mx-auto py-20 text-center">
                <motion.h1
                    className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent mt-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    AI-Powered Music Creation
                </motion.h1>
                <motion.p
                    className="text-xl text-muted-foreground max-w-2xl mt-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Create, collaborate, and explore professional music-making tools powered by AI
                </motion.p>

            </section>
        </LampContainer>
    );

    // Interactive Features Grid with enhanced animations
    const FeaturesGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {features.map((feature, index) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    }}
                    className="cursor-pointer"
                    onClick={() => router.push(feature.path)}
                >
                    <Card
                        className={`relative overflow-hidden h-[300px] bg-gradient-to-br ${feature.gradient}`}
                    >
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: feature.bgPattern }}
                        />
                        <CardContent className="p-6 flex flex-col items-center justify-center h-full text-white relative z-10">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 p-4 bg-white/10 rounded-full"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-sm text-center text-white/90 mb-4">{feature.description}</p>
                            <div className="absolute bottom-4 left-4">
                                <Badge variant="secondary" className="bg-white/20">
                                    AI-Powered
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );

    // Enhanced Trending Section with preview functionality
    const TrendingSection = () => (
        <Card className="p-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Trending Now</CardTitle>
                    <div className="flex items-center space-x-4">
                        <Tabs defaultValue="all" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="electronic">Electronic</TabsTrigger>
                                <TabsTrigger value="pop">Pop</TabsTrigger>
                                <TabsTrigger value="rock">Rock</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/trending')}
                        >
                            View All <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={true}
                    keyboard={{ enabled: true, }}
                    pagination={{ clickable: true }}
                >
                    {trendingSongs.map((song) => (
                        <SwiperSlide key={song.id}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative group rounded-lg overflow-hidden"
                            >
                                <img
                                    src={song.coverArt}
                                    alt={song.title}
                                    className="w-full aspect-square object-cover"
                                />
                                <motion.div
                                    className="absolute inset-0 bg-black/50"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        className="w-12 h-12"
                                                        onClick={() => handlePlayPause(song)}
                                                    >
                                                        {currentTrack?.id === song.id && isPlaying ? (
                                                            <Pause className="w-6 h-6" />
                                                        ) : (
                                                            <Play className="w-6 h-6" />
                                                        )}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{currentTrack?.id === song.id && isPlaying ? 'Pause' : 'Preview Track'}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <div className="flex items-center space-x-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button
                                                            variant="secondary"
                                                            size="icon"
                                                            className="w-8 h-8"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Implement like functionality
                                                            }}
                                                        >
                                                            <Heart className="w-4 h-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Add to Favorites</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button
                                                            variant="secondary"
                                                            size="icon"
                                                            className="w-8 h-8"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Implement share functionality
                                                            }}
                                                        >
                                                            <Share2 className="w-4 h-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Share Track</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </motion.div>
                                <div className="p-4">
                                    <h3 className="font-medium truncate">{song.title}</h3>
                                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center">
                                                <Play className="w-4 h-4 mr-1" />
                                                {song.views}
                                            </div>
                                            <div className="flex items-center">
                                                <Heart className="w-4 h-4 mr-1" />
                                                {song.likes}
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {song.genre}
                                        </Badge>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </CardContent>
        </Card>
    );

    // Enhanced Artists Section with dynamic follow functionality
    const ArtistsSection = () => {
        const [hoveredArtist, setHoveredArtist] = useState(null);
        const [followedArtists, setFollowedArtists] = useState(new Set());

        const handleFollow = (artistId) => {
            setFollowedArtists(prev => {
                const newSet = new Set(prev);
                if (newSet.has(artistId)) {
                    newSet.delete(artistId);
                } else {
                    newSet.add(artistId);
                }
                return newSet;
            });
        };

        return (
            <Card className="p-6">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Creators You May Like</CardTitle>
                        <Button variant="ghost" onClick={() => router.push('/artists')}>
                            View All Artists
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={5}
                        navigation
                    >
                        {popularArtists.map((artist) => (
                            <SwiperSlide key={artist.id}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative text-center space-y-4"
                                    onHoverStart={() => setHoveredArtist(artist.id)}
                                    onHoverEnd={() => setHoveredArtist(null)}
                                >
                                    <div className="relative">
                                        <Avatar className="w-32 h-32 mx-auto">
                                            <AvatarImage src={artist.avatar} alt={artist.name} />
                                            <AvatarFallback>{artist.name[0]}</AvatarFallback>
                                        </Avatar>
                                        {hoveredArtist === artist.id && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
                                            >
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handlePlayPause(artist.popularTrack)}
                                                >
                                                    Play Track
                                                </Button>
                                            </motion.div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg">{artist.name}</h3>
                                        <p className="text-sm text-gray-400">{artist.followers} followers</p>
                                        <p className="text-xs text-gray-400 mt-1">Popular: {artist.popularTrack}</p>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant={followedArtists.has(artist.id) ? "secondary" : "outline"}
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleFollow(artist.id)}
                                        >
                                            {followedArtists.has(artist.id) ? 'Following' : 'Follow'}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </CardContent>
            </Card>
        );
    };

    // Weekly Challenge Section
    const WeeklyChallenge = () => (
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardHeader>
                <CardTitle>Weekly Music Challenge</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">This Week&apos;s Theme:</h3>
                        <p className="text-lg mb-4">Create a summer-inspired lofi track</p>
                        <div className="space-y-2">
                            <p className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                256 Participants
                            </p>
                            <p className="flex items-center">
                                <Star className="w-4 h-4 mr-2" />
                                Top Prize: $500
                            </p>
                        </div>
                        <Button className="mt-4 bg-white text-purple-600 hover:bg-white/90">
                            Join Challenge
                        </Button>
                    </div>
                    <div className="relative">
                        <img
                            src="/challenge-banner.jpg"
                            alt="Challenge Banner"
                            className="rounded-lg"
                        />
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                            <Button size="sm" variant="secondary">
                                View Submissions
                            </Button>
                            <Button size="sm" variant="secondary">
                                Rules
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Collaborative Playlists Section
    const CollaborativePlaylists = () => (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Collaborative Playlists</CardTitle>
                    <Button variant="outline">Create New Playlist</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((playlist) => (
                        <Card key={playlist} className="hover:bg-accent transition-colors">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="grid grid-cols-2 gap-1 w-16 h-16">
                                        {[1, 2, 3, 4].map((img) => (
                                            <div key={img} className="bg-gray-200 rounded" />
                                        ))}
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Weekend Vibes</h4>
                                        <p className="text-sm text-gray-400">12 collaborators</p>
                                        <p className="text-sm text-gray-400">32 tracks</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Utility function to format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
                <HeroSection />

                <div className="container mx-auto space-y-12 py-12">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Create with AI</h2>
                        <FeaturesGrid />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Trending Music</h2>
                        <TrendingSection />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Weekly Challenge</h2>
                        <WeeklyChallenge />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Discover Artists</h2>
                        <ArtistsSection />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Collaborative Playlists</h2>
                        <CollaborativePlaylists />
                    </section>
                </div>
                {currentTrack && <MusicPlayer />}
            </div>
        </Layout>
    );
};

>>>>>>> 0c527ff82d31ad2f2bda4912cf7bb385822419f8
export default HomePage;