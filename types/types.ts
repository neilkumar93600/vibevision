<<<<<<< HEAD
type Genre = {
    value: string;
    icon: string;
    theme: string;
    description: string;
  };
  
  type StorySettings = {
    tone: string;
    style: string;
    pacing: string;
    complexity: string;
  };
  
  type GeneratedStory = {
    id: string;
    title: string;
    content: string;
    genre: string;
    prompt: string;
    settings: StorySettings;
    createdAt: string;
    likes: number;
  };
  
  interface StoryHistoryItem extends GeneratedStory {
    summary: string;
    characters: string[];
=======
type Genre = {
    value: string;
    icon: string;
    theme: string;
    description: string;
  };
  
  type StorySettings = {
    tone: string;
    style: string;
    pacing: string;
    complexity: string;
  };
  
  type GeneratedStory = {
    id: string;
    title: string;
    content: string;
    genre: string;
    prompt: string;
    settings: StorySettings;
    createdAt: string;
    likes: number;
  };
  
  interface StoryHistoryItem extends GeneratedStory {
    summary: string;
    characters: string[];
>>>>>>> 0c527ff82d31ad2f2bda4912cf7bb385822419f8
  }