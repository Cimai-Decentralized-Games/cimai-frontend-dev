'use client';

import React, { useState, useEffect } from 'react';
import CodeBlock from "../codeblock/code-block";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Components } from 'react-markdown/lib/ast-to-react';

interface StoryData {
  title: string;
  content: string;
  date?: string;
  author?: string;
}

const RealStory: React.FC = () => {
  const [stories, setStories] = useState<StoryData[]>([]);
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of stories
    const fetchStories = async () => {
      try {
        // This is a placeholder - in a real app, you'd fetch from an API
        // For now, we'll hardcode the first story
        const storyList: StoryData[] = [
          {
            title: "How The Ghost Dance Went Digital",
            content: await fetchStoryContent('/stories/real-story.txt'),
            date: "September 17, 2024",
            author: "Reno's Logs"
          },
          {
            title: "The Rise of Cimai",
            content: "Coming soon...",
            date: "October 1, 2024",
            author: "Reno TrashPrince"
          }
        ];
        
        setStories(storyList);
        setSelectedStory(storyList[0]); // Select the first story by default
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Function to fetch story content
  const fetchStoryContent = async (path: string): Promise<string> => {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to fetch story: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error("Error fetching story content:", error);
      return "Failed to load story content.";
    }
  };

  // Function to handle story selection
  const handleStorySelect = (story: StoryData) => {
    setSelectedStory(story);
    // Scroll to top when selecting a new story
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Define markdown components in a way compatible with react-markdown
  const markdownComponents: Components = {
    code: ({className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      
      if (!className) {
        // This is an inline code block (no language specified)
        return <code className="bg-base-300 px-1 rounded" {...props}>{children}</code>;
      }
      
      // This is a code block with language specification
      return <CodeBlock code={String(children)} language={match ? match[1] : 'bash'} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar with story list */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-base-200 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-primary">Stories</h2>
            <ul className="space-y-2">
              {stories.map((story, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleStorySelect(story)}
                    className={`w-full text-left p-2 rounded transition-colors ${
                      selectedStory?.title === story.title
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-300'
                    }`}
                  >
                    {story.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:col-span-3">
          {selectedStory ? (
            <article className="bg-base-200 rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold mb-2 text-primary">{selectedStory.title}</h1>
              
              {selectedStory.author && selectedStory.date && (
                <div className="text-sm text-base-content/70 mb-6">
                  By {selectedStory.author} • {selectedStory.date}
                </div>
              )}
              
              <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary">
                {/* Use a special terminal style for the specific story */}
                {selectedStory.title === "How The Ghost Dance Went Digital" ? (
                  <div className="font-mono text-base leading-relaxed bg-black text-green-400 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                    {selectedStory.content}
                  </div>
                ) : selectedStory.content.includes('#') || selectedStory.content.includes('*') ? (
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={markdownComponents}
                  >
                    {selectedStory.content}
                  </Markdown>
                ) : (
                  // Otherwise, render as pre-formatted text with line breaks preserved
                  <pre className="whitespace-pre-wrap font-sans text-base-content">
                    {selectedStory.content}
                  </pre>
                )}
              </div>
            </article>
          ) : (
            <div className="bg-base-200 rounded-lg shadow-lg p-6 text-center">
              <p>Select a story to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealStory;