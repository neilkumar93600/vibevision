'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { styled } from '@mui/material/styles';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Paper,
    Grid,
    Alert,
    Snackbar,
    Slider,
    FormControl,
    Select,
    MenuItem,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Card,
    CardContent,
    TextField,
    Tooltip,
    Chip,
    Rating,
    useMediaQuery,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tabs,
    Tab,
    Fade
} from '@mui/material';
import {
    Delete,
    Download,
    Share,
    CloudUpload,
    Facebook,
    Twitter,
    LinkedIn,
    WhatsApp,
    ExpandMore,
    Save,
    History,
    Favorite,
    EmojiEmotions,
    Speed,
    Settings,
    Lightbulb,
    VolumeUp,
    InsertEmoticon,
    ThumbUp,
    ThumbDown
} from '@mui/icons-material';
import { Layout } from "../../../components/layout/layout";

// Styled Components with Enhanced Aesthetics
const StyledBox = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(4),
    background: 'linear-gradient(0deg, #111827 0%, #581C8B 50%, #111827 100%)',
    fontFamily: "'Poppins', sans-serif",
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    background: 'rgba(88, 28, 135, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.spacing(2),
    color: '#fff',
    position: 'relative',
    overflow: 'visible',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: theme.spacing(2),
        border: '1px solid rgba(255, 255, 255, 0.1)',
        pointerEvents: 'none',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(3),
    textTransform: 'none',
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(45deg, #1fa2ff 0%, #12d8fa 50%, #a6ffcb 100%)',
    '&:click': {
        background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
    },
}));

const ThemeButton = styled(Button)(({ theme, active }) => ({
    borderRadius: '9999px',
    margin: theme.spacing(0.5),
    backgroundColor: active ? '#6366f1' : 'rgba(75, 85, 99, 0.8)',
    color: '#fff',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        backgroundColor: active ? '#4f46e5' : 'rgba(75, 85, 99, 0.9)',
        transform: 'scale(1.05)',
    },
}));

const StyledProgressBar = styled('div')(({ theme }) => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(75, 85, 99, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        background: 'linear-gradient(45deg, #6366f1, #818cf8)',
        animation: 'progress 2s ease-in-out infinite',
    },
    '@keyframes progress': {
        '0%': {
            width: '0%',
        },
        '100%': {
            width: '100%',
        },
    },
}));

// New Components
const EmotionChip = styled(Chip)(({ theme, emotion }) => ({
    margin: theme.spacing(0.5),
    background: getEmotionColor(emotion),
    color: '#fff',
    '&:hover': {
        background: getEmotionColor(emotion, true),
    },
}));

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconFilled': {
        color: '#6366f1',
    },
    '& .MuiRating-iconHover': {
        color: '#4f46e5',
    },
}));

// Helper Functions
const getEmotionColor = (emotion, hover = false) => {
    const colors = {
        happy: hover ? '#15803d' : '#22c55e',
        funny: hover ? '#c2410c' : '#f97316',
        sarcastic: hover ? '#7e22ce' : '#a855f7',
        witty: hover ? '#0369a1' : '#0ea5e9',
    };
    return colors[emotion] || '#6b7280';
};

const analyzeImage = async (base64Image) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Analyze this image and describe the key elements that could be used in a comedy routine.'
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: base64Image
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 300
            })
        });

        if (!response.ok) {
            throw new Error('Failed to analyze image');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error in image analysis:', error);
        throw new Error('Failed to analyze the additional image');
    }
};

const generateVideo = async (script) => {
    const createTalkUrl = 'https://api.d-id.com/talks';
    const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Basic ${process.env.REACT_APP_D_ID_API_KEY}`,
    };

    try {
        const createTalkResponse = await fetch(createTalkUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                source_url: 'https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg',
                script: {
                    type: 'text',
                    subtitles: 'true',
                    provider: {
                        type: 'microsoft',
                        voice_id: 'Sara',
                        voice_config: { style: 'Cheerful' },
                    },
                    input: script,
                },
                config: { fluent: 'true', pad_audio: '0.0' },
            }),
        });

        if (!createTalkResponse.ok) {
            const errorData = await createTalkResponse.json();
            throw new Error(errorData.message || 'Failed to create video');
        }

        const createTalkData = await createTalkResponse.json();
        if (!createTalkData.id) {
            throw new Error('Failed to create talk: No ID received');
        }

        const talkId = createTalkData.id;
        let resultUrl = null;
        let attempts = 0;
        const maxAttempts = 12;

        while (!resultUrl && attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            attempts++;

            const getTalkResponse = await fetch(`${createTalkUrl}/${talkId}`, {
                method: 'GET',
                headers: headers,
            });

            if (!getTalkResponse.ok) {
                throw new Error('Failed to check video status');
            }

            const getTalkData = await getTalkResponse.json();

            if (getTalkData.status === 'done' && getTalkData.result_url) {
                resultUrl = getTalkData.result_url;
            } else if (getTalkData.status === 'error') {
                throw new Error(getTalkData.error?.message || 'Video generation failed');
            }
        }

        if (!resultUrl) {
            throw new Error('Video generation timed out');
        }

        return resultUrl;
    } catch (error) {
        console.error('Error generating video:', error);
        throw new Error(`Video generation failed: ${error.message}`);
    }
};

const generateComedyScript = async (prompt, comedyType, audience, duration, imageAnalysis = '') => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional comedy writer specializing in ${comedyType} comedy. 
                      Create content that is appropriate for a ${audience} audience and runs for ${duration}.
                      Include stage directions and timing markers.`
                    },
                    {
                        role: 'user',
                        content: `Write a comedy routine with the following context:
                      ${prompt}
                      ${imageAnalysis ? `\nIncorporate these visual elements: ${imageAnalysis}` : ''}
                      
                      Format the output with:
                      - Clear section headers with timestamps
                      - Stage directions in [brackets]
                      - Audience interaction cues
                      - Proper pacing for ${duration} duration
                      - Appropriate humor level for ${audience} audience`
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate script');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating script:', error);
        throw new Error('Failed to generate comedy script');
    }
};

const ComedyShow = () => {
    // Enhanced State Management
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [comedyType, setComedyType] = useState('Standup');
    const [audience, setAudience] = useState('Everyone');
    const [duration, setDuration] = useState('15 seconds');
    const [prompt, setPrompt] = useState('');
    const [additionalImage, setAdditionalImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState(null);
    const [generatedScript, setGeneratedScript] = useState('');
    const [shareDialog, setShareDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [currentTab, setCurrentTab] = useState(0);
    const [savedScripts, setSavedScripts] = useState([]);
    const [settings, setSettings] = useState({
        tone: 'balanced',
        complexity: 'medium',
        useAI: true,
        language: 'english',
    });
    const [emotions, setEmotions] = useState([]);
    const [feedback, setFeedback] = useState({ likes: 0, dislikes: 0 });
    const [history, setHistory] = useState([]);
    const [voiceSettings, setVoiceSettings] = useState({
        pitch: 1,
        speed: 1,
        volume: 1,
    });

    // Load saved data on mount
    useEffect(() => {
        const loadSavedData = () => {
            const saved = localStorage.getItem('comedyScripts');
            if (saved) {
                setSavedScripts(JSON.parse(saved));
            }
            const savedHistory = localStorage.getItem('comedyHistory');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        };
        loadSavedData();
    }, []);

    // Save script to local storage
    const handleSaveScript = useCallback(() => {
        const newScript = {
            id: Date.now(),
            type: comedyType,
            audience,
            duration,
            script: generatedScript,
            emotions,
            timestamp: new Date().toISOString(),
        };
        setSavedScripts(prev => {
            const updated = [...prev, newScript];
            localStorage.setItem('comedyScripts', JSON.stringify(updated));
            return updated;
        });
        setSnackbar({
            open: true,
            message: 'Script saved successfully!',
            severity: 'success',
        });
    }, [comedyType, audience, duration, generatedScript, emotions]);

    // Enhanced Image Upload with Preview
    const handleImageUpload = useCallback(async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            // Enhanced validation
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new Error('Image size should be less than 4MB');
            }

            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                throw new Error('Please upload a valid image file (JPEG, PNG, WebP)');
            }

            setLoading(true);
            setError(null);
            setStatusMessage('Processing image...');

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64Image = reader.result;
                    setAdditionalImage(base64Image);

                    // Analyze image and update prompt
                    const analysis = await analyzeImage(base64Image);
                    setPrompt(prev => {
                        const newPrompt = `${prev}\n\nImage Analysis:\n${analysis}`.trim();
                        return newPrompt;
                    });

                    setSnackbar({
                        open: true,
                        message: 'Image processed successfully!',
                        severity: 'success',
                    });
                } catch (error) {
                    throw new Error(`Image processing failed: ${error.message}`);
                }
            };

            reader.readAsDataURL(file);
        } catch (error) {
            setError(error.message);
            setSnackbar({
                open: true,
                message: error.message,
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // Enhanced Form Submit with Advanced Options
    const handleFormSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            setProgress(0);
            setStatusMessage('Initializing generation process...');

            // Validation
            if (!comedyType || !audience || !duration) {
                throw new Error('Please fill in all required fields');
            }

            // Progress simulation
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 1, 90));
            }, 500);

            setStatusMessage('Generating comedy script...');

            // Generate script using GPT-4
            const generatedText = await generateComedyScript(
                prompt,
                comedyType,
                audience,
                duration,
                additionalImage ? await analyzeImage(additionalImage) : ''
            );

            setGeneratedScript(generatedText);

            // Generate video
            setStatusMessage('Generating video presentation...');
            const videoResult = await generateVideo(generatedText);
            setVideoUrl(videoResult);

            // Complete progress
            clearInterval(progressInterval);
            setProgress(100);
            setStatusMessage('Generation complete!');

            // Analyze emotions and update history
            const detectedEmotions = ['funny', 'witty', 'sarcastic']; // You could use GPT-4 to analyze the script for emotions
            setEmotions(detectedEmotions);

            // Update history
            const historyEntry = {
                id: Date.now(),
                type: comedyType,
                audience,
                timestamp: new Date().toISOString(),
            };
            setHistory(prev => {
                const updated = [...prev, historyEntry];
                localStorage.setItem('comedyHistory', JSON.stringify(updated));
                return updated;
            });

            setSnackbar({
                open: true,
                message: 'Comedy content generated successfully!',
                severity: 'success',
            });

        } catch (error) {
            console.error('Error in form submission:', error);
            setError(error.message || 'Failed to generate comedy content');
            setSnackbar({
                open: true,
                message: error.message || 'Failed to generate comedy content',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    // Enhanced Download with Options
    const handleDownload = async (format = 'video') => {
        try {
            setLoading(true);

            if (!videoUrl && format === 'video') {
                throw new Error('No video available to download');
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            let fileName, content, type;

            switch (format) {
                case 'video':
                    fileName = `comedy-show-${comedyType.toLowerCase()}-${timestamp}.mp4`;
                    const response = await fetch(videoUrl);
                    content = await response.blob();
                    type = 'video/mp4';
                    break;
                case 'script':
                    const doc = new jsPDF();
                    doc.text(generatedScript, 10, 10); // Adjust text position as needed
                    const fileName = `comedy-script-${timestamp}.pdf`;
                    const content = doc.output('blob'); // Generate PDF as Blob
                    const type = 'application/pdf'; // Set the MIME type

                    // Create a download link
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = fileName;
                    link.type = type; // This line is optional; it's primarily for semantic clarity
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    break;

                default:
                    throw new Error('Invalid download format');
            }

            const downloadUrl = window.URL.createObjectURL(content);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

            setSnackbar({
                open: true,
                message: `${format.charAt(0).toUpperCase() + format.slice(1)} downloaded successfully!`,
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: `Download failed: ${error.message}`,
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    // Enhanced Share Functionality
    const handleShare = async (platform) => {
        try {
            setLoading(true);
            const shareText = `Check out my ${comedyType} comedy show generated with AI!`;
            const shareUrl = videoUrl || window.location.href;

            // Platform-specific sharing logic
            const shareData = {
                Facebook: {
                    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
                    width: 600,
                    height: 400,
                },
                Twitter: {
                    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
                    width: 550,
                    height: 420,
                },
                LinkedIn: {
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
                    width: 600,
                    height: 600,
                },
                WhatsApp: {
                    url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
                    width: 550,
                    height: 400,
                },
            };

            const { url, width, height } = shareData[platform];
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            window.open(
                url,
                `Share on ${platform}`,
                `width=${width},height=${height},left=${left},top=${top}`
            );

            setSnackbar({
                open: true,
                message: `Shared successfully to ${platform}!`,
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: `Share failed: ${error.message}`,
                severity: 'error',
            });
        } finally {
            setLoading(false);
            setShareDialog(false);
        }
    };

    // Render Component
    return (
        <Layout>
            <StyledBox sx={{ pt: 15, pl:14 }}>
                <Grid container spacing={4}>
                    {/* Header Section */}
                    <Grid item xs={12}>
                        <Typography variant="h3" align="center" sx={{
                            color: '#fff',
                            marginBottom: 4,
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            AI Comedy Generator
                        </Typography>
                    </Grid>

                    {/* Main Content */}
                    <Grid item xs={12} lg={6}>
                        <StyledCard elevation={8}>
                            <CardContent>
                                {/* Tabs Navigation */}
                                <Tabs
                                    value={currentTab}
                                    onChange={(_, newValue) => setCurrentTab(newValue)}
                                    variant="fullWidth"
                                    sx={{ marginBottom: 3 }}
                                >
                                    <Tab
                                        icon={<InsertEmoticon />}
                                        label="Create"
                                        sx={{ color: '#fff' }}
                                    />
                                    <Tab
                                        icon={<History />}
                                        label="History"
                                        sx={{ color: '#fff' }}
                                    />
                                    <Tab
                                        icon={<Settings />}
                                        label="Settings"
                                        sx={{ color: '#fff' }}
                                    />
                                </Tabs>

                                {/* Create Tab */}
                                <Box hidden={currentTab !== 0}>
                                    {/* Comedy Type Selection */}
                                    <Box sx={{ marginBottom: 4 }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                            Type of Comedy
                                        </Typography>
                                        <Stack direction="row" flexWrap="wrap" gap={1}>
                                            {['Standup', 'Sketch', 'Roast', 'Musical', 'Improv', 'Sitcom'].map((type) => (
                                                <ThemeButton
                                                    key={type}
                                                    active={comedyType === type}
                                                    onClick={() => setComedyType(type)}
                                                    startIcon={<EmojiEmotions />}
                                                >
                                                    {type}
                                                </ThemeButton>
                                            ))}
                                        </Stack>
                                    </Box>

                                    {/* Target Audience */}
                                    <FormControl fullWidth sx={{ marginBottom: 4 }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                            Target Audience
                                        </Typography>
                                        <Select
                                            value={audience}
                                            onChange={(e) => setAudience(e.target.value)}
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                color: '#fff',
                                                '& .MuiSelect-icon': { color: '#fff' },
                                            }}
                                        >
                                            {[
                                                'Everyone',
                                                'Kids',
                                                'Teens',
                                                'Adults',
                                                'Seniors',
                                                'Corporate',
                                                'Family',
                                            ].map((item) => (
                                                <MenuItem key={item} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* Duration Slider */}
                                    <Box sx={{ marginBottom: 4 }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                            Duration
                                        </Typography>
                                        <Slider
                                            value={['15 seconds', '30 seconds', '1 minute', '3 minutes', '5 minutes'].indexOf(duration)}
                                            onChange={(_, value) => setDuration(['15 seconds', '30 seconds', '1 minute', '3 minutes', '5 minutes'][value])}
                                            marks
                                            min={0}
                                            max={4}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => ['15 seconds', '30 seconds', '1 minute', '3 minutes', '5 minutes'][value]}
                                            sx={{
                                                color: '#6366f1',
                                                '& .MuiSlider-thumb': {
                                                    backgroundColor: '#fff',
                                                },
                                                '& .MuiSlider-track': {
                                                    background: 'linear-gradient(45deg, #6366f1, #818cf8)',
                                                }
                                            }}
                                        />
                                    </Box>

                                    {/* Context Input */}
                                    <Box sx={{ marginBottom: 4 }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                            Additional Context
                                        </Typography>
                                        <Paper
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                position: 'relative'
                                            }}
                                        >
                                            <TextField
                                                multiline
                                                rows={4}
                                                fullWidth
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                placeholder="Enter context, topics, or specific requirements..."
                                                sx={{
                                                    '& .MuiInputBase-input': {
                                                        color: '#fff',
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                                        },
                                                    },
                                                }}
                                            />
                                            <Tooltip title="Upload Image for Analysis">
                                                <IconButton
                                                    component="label"
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        color: '#fff'
                                                    }}
                                                >
                                                    <CloudUpload />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </Paper>
                                    </Box>

                                    {/* Image Preview */}
                                    {additionalImage && (
                                        <Box sx={{ position: 'relative', marginBottom: 4 }}>
                                            <img
                                                src={additionalImage}
                                                alt="Preview"
                                                style={{
                                                    maxWidth: '100%',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <IconButton
                                                onClick={() => setAdditionalImage(null)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: -8,
                                                    right: -8,
                                                    backgroundColor: '#ef4444',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#dc2626'
                                                    }
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    )}

                                    {/* Generate Button */}
                                    <StyledButton
                                        fullWidth
                                        onClick={handleFormSubmit}
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Lightbulb />}
                                        sx={{ marginBottom: 2 }}
                                    >
                                        {loading ? 'Generating...' : 'Generate Comedy Content'}
                                    </StyledButton>

                                    {/* Progress Indicator */}
                                    {loading && (
                                        <Fade in={loading}>
                                            <Box sx={{ marginTop: 2 }}>
                                                <StyledProgressBar />
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        display: 'block',
                                                        textAlign: 'center',
                                                        marginTop: 1,
                                                        color: '#fff'
                                                    }}
                                                >
                                                    {statusMessage}
                                                </Typography>
                                            </Box>
                                        </Fade>
                                    )}
                                </Box>

                                {/* History Tab */}
                                <Box hidden={currentTab !== 1}>
                                    {history.length > 0 ? (
                                        history.map((entry) => (
                                            <Card
                                                key={entry.id}
                                                sx={{
                                                    marginBottom: 2,
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    color: '#fff'
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography variant="h6">{entry.type}</Typography>
                                                    <Typography variant="body2">
                                                        Audience: {entry.audience}
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        {new Date(entry.timestamp).toLocaleDateString()}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
                                            No generation history yet
                                        </Typography>
                                    )}
                                </Box>

                                {/* Settings Tab */}
                                <Box hidden={currentTab !== 2}>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                        Generation Settings
                                    </Typography>

                                    {/* Tone Setting */}
                                    <FormControl fullWidth sx={{ marginBottom: 3 }}>
                                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                                            Comedy Tone
                                        </Typography>
                                        <Select
                                            value={settings.tone}
                                            onChange={(e) => setSettings({ ...settings, tone: e.target.value })}
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                color: '#fff'
                                            }}
                                        >
                                            {['balanced', 'edgy', 'clean', 'absurd'].map((tone) => (
                                                <MenuItem key={tone} value={tone}>
                                                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* Voice Settings */}
                                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                                        Voice Settings
                                    </Typography>
                                    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ color: '#fff' }}>
                                                Speed
                                            </Typography>
                                            <Slider
                                                value={voiceSettings.speed}
                                                onChange={(_, value) => setVoiceSettings({ ...voiceSettings, speed: value })}
                                                min={0.5}
                                                max={2}
                                                step={0.1}
                                                marks
                                                sx={{ color: '#6366f1' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ color: '#fff' }}>
                                                Pitch
                                            </Typography>
                                            <Slider
                                                value={voiceSettings.pitch}
                                                onChange={(_, value) => setVoiceSettings({ ...voiceSettings, pitch: value })}
                                                min={0.5}
                                                max={2}
                                                step={0.1}
                                                marks
                                                sx={{ color: '#6366f1' }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Language Setting */}
                                    <FormControl fullWidth sx={{ marginBottom: 3 }}>
                                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                                            Language
                                        </Typography>
                                        <Select
                                            value={settings.language}
                                            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                color: '#fff'
                                            }}
                                        >
                                            {['english', 'spanish', 'french', 'german', 'italian'].map((lang) => (
                                                <MenuItem key={lang} value={lang}>
                                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>

                    {/* Output Section */}
                    <Grid item xs={12} lg={6}>
                        <StyledCard elevation={8}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                                    Generated Content
                                </Typography>

                                {/* Script Display */}
                                {generatedScript && (
                                    <Accordion
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: '#fff',
                                            marginBottom: 2
                                        }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#fff' }} />}>
                                            <Typography variant="h6">Comedy Script</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <pre style={{
                                                whiteSpace: 'pre-wrap',
                                                fontFamily: 'monospace',
                                                marginBottom: 2
                                            }}>
                                                {generatedScript}
                                            </pre>
                                            <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                                                <StyledButton
                                                    startIcon={<Save />}
                                                    onClick={handleSaveScript}
                                                    size="small"
                                                >
                                                    Save Script
                                                </StyledButton>
                                                <StyledButton
                                                    startIcon={<Download />}
                                                    onClick={() => handleDownload('script')}
                                                    size="small"
                                                >
                                                    Download
                                                </StyledButton>
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                )}

                                {/* Video Display */}
                                {videoUrl && (
                                    <Box sx={{ marginBottom: 3 }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                            Video Preview
                                        </Typography>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                paddingTop: '56.25%', // 16:9 aspect ratio
                                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <video
                                                controls
                                                src={videoUrl}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </Box>
                                        <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                                            <StyledButton
                                                startIcon={<Download />}
                                                onClick={() => handleDownload('video')}
                                                size="small"
                                            >
                                                Download Video
                                            </StyledButton>
                                            <StyledButton
                                                startIcon={<Share />}
                                                onClick={() => setShareDialog(true)}
                                                size="small"
                                            >
                                                Share
                                            </StyledButton>
                                        </Stack>
                                    </Box>
                                )}

                                {/* Emotions and Feedback */}
                                {emotions.length > 0 && (
                                    <Box sx={{ marginBottom: 3 }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                            Detected Emotions
                                        </Typography>
                                        <Stack direction="row" flexWrap="wrap" gap={1}>
                                            {emotions.map((emotion) => (
                                                <EmotionChip
                                                    key={emotion}
                                                    label={emotion}
                                                    emotion={emotion}
                                                    icon={<EmojiEmotions />}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>
                                )}

                                {/* User Feedback */}
                                <Box sx={{ marginBottom: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                                        Rate This Generation
                                    </Typography>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <StyledRating
                                            value={feedback.rating}
                                            onChange={(_, newValue) => setFeedback({ ...feedback, rating: newValue })}
                                        />
                                        <IconButton
                                            onClick={() => setFeedback(prev => ({ ...prev, likes: prev.likes + 1 }))}
                                            sx={{ color: '#fff' }}
                                        >
                                            <ThumbUp />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ color: '#fff' }}>
                                            {feedback.likes}
                                        </Typography>
                                        <IconButton
                                            onClick={() => setFeedback(prev => ({ ...prev, dislikes: prev.dislikes + 1 }))}
                                            sx={{ color: '#fff' }}
                                        >
                                            <ThumbDown />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ color: '#fff' }}>
                                            {feedback.dislikes}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                </Grid>

                {/* Share Dialog */}
                <Dialog
                    open={shareDialog}
                    onClose={() => setShareDialog(false)}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'rgba(26, 32, 53, 0.95)',
                            backdropFilter: 'blur(10px)',
                            color: '#fff',
                        }
                    }}
                >
                    <DialogTitle>Share Your Comedy Content</DialogTitle>
                    <DialogContent>
                        <Stack direction="row" spacing={2} sx={{ padding: 2 }}>
                            {[
                                { icon: <Facebook />, platform: 'Facebook' },
                                { icon: <Twitter />, platform: 'Twitter' },
                                { icon: <LinkedIn />, platform: 'LinkedIn' },
                                { icon: <WhatsApp />, platform: 'WhatsApp' },
                            ].map(({ icon, platform }) => (
                                <IconButton
                                    key={platform}
                                    onClick={() => handleShare(platform)}
                                    sx={{
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        }
                                    }}
                                >
                                    {icon}
                                </IconButton>
                            ))}
                        </Stack>
                    </DialogContent>
                </Dialog>

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </StyledBox>
        </Layout>
    );
};

export default ComedyShow;