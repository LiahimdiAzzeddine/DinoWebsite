// pages/Blogs.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { Plus, Minus, ChevronDown, Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import Block from "../components/ui/Block";
import { Canvas } from '@react-three/fiber';
import GradientSkybox from "../components/experience/SceneColor";
import { AnimationContext } from "../components/experience/AnimationContext";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Getting Started with Dinomite Tools",
    excerpt: "Learn how to set up and use our powerful development tools to accelerate your workflow and boost productivity.",
    content: "Complete guide covering installation, configuration, and first steps with Dinomite Tools...",
    author: "Abed Rahman",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["getting-started", "setup", "tools"],
    image: "/assets/blog/blog-1.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Advanced Debugging Techniques",
    excerpt: "Master advanced debugging strategies and troubleshooting methods to solve complex development challenges.",
    content: "Deep dive into debugging methodologies, tools, and best practices for efficient problem solving...",
    author: "Khalil",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Development",
    tags: ["debugging", "troubleshooting", "advanced"],
    image: "/assets/blog/blog-2.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Building Scalable Applications",
    excerpt: "Best practices for creating applications that can grow with your business needs and handle increased load.",
    content: "Comprehensive guide on scalability patterns, architecture decisions, and performance optimization...",
    author: "Fatima zouhra",
    date: "2024-01-05",
    readTime: "12 min read",
    category: "Architecture",
    tags: ["scalability", "architecture", "performance"],
    image: "/assets/blog/blog-3.jpg",
    featured: true
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    excerpt: "Essential design principles and user experience guidelines for creating intuitive and engaging interfaces.",
    content: "Explore modern design patterns, accessibility considerations, and user-centered design approaches...",
    author: "Azzeddine",
    date: "2023-12-28",
    readTime: "6 min read",
    category: "Design",
    tags: ["ui", "ux", "design", "principles"],
    image: "/assets/blog/blog-4.jpg",
    featured: false
  },
  {
    id: 5,
    title: "API Integration Best Practices",
    excerpt: "Learn how to effectively integrate third-party APIs and create robust, maintainable API connections.",
    content: "Detailed walkthrough of API integration patterns, error handling, and security considerations...",
    author: "Azzeddine",
    date: "2023-12-20",
    readTime: "10 min read",
    category: "Development",
    tags: ["api", "integration", "backend"],
    image: "/assets/blog/blog-5.jpg",
    featured: false
  }
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  const {
    progress, setProgress,
    fadeOut, setFadeOut,
    setIsLoading,
  } = useContext(AnimationContext);

  useEffect(() => {
    setProgress(0);
    setFadeOut(false);
    setIsLoading(false);
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs based on category and search
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <>
      <div className="h-screen w-full fixed top-0 z-10 pointer-events-none">
        <Canvas
          scale={0.5}
          camera={{ position: [0, 0, 1] }}
          style={{ background: 'transparent' }}
        >
          <GradientSkybox />
        </Canvas>
      </div>

      <Block
        title="Blog"
        subtitle="Insights, tutorials, and updates from our team"
        paragraphs={[]}
        links={[]}
        buttons={[]}
      >
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-white/40 transition-all duration-200 text-white placeholder-white/60"
            />
            <svg className="absolute left-3 top-3.5 h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                  selectedCategory === category
                    ? 'bg-blue-500/80 text-white shadow-md border border-blue-400/50'
                    : 'bg-white/15 text-white/80 hover:bg-white/25 border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-16">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12 text-white/70">
              <div className="text-lg mb-2">No articles found</div>
              <div className="text-sm opacity-70">Try adjusting your search or filter criteria</div>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className={`blog-card relative ${
                  blog.featured ? 'featured' : ''
                }`}
              >
                <div className="blog-content">
                  <div className="md:flex">
                    {/* Blog Image */}
                    <div className="md:w-1/3 relative">
                      <div className="h-48 md:h-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-white text-6xl font-bold opacity-40">
                          {blog.title.charAt(0)}
                        </div>
                      </div>
                      {blog.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                          <Tag className="w-3 h-3 mr-1" />
                          {blog.category}
                        </span>
                        <div className="flex items-center text-white/70 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(blog.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-white/70 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {blog.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-300 transition-colors duration-200">
                        {blog.title}
                      </h3>

                      <p className="text-white/80 mb-4 leading-relaxed">
                        {blog.excerpt}
                      </p>

                      {expandedBlog === blog.id && (
                        <div className="mb-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                          <p className="text-white/90 text-sm leading-relaxed">
                            {blog.content}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-white/60 mr-2" />
                          <span className="text-sm text-white/80 font-medium">
                            {blog.author}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleExpanded(blog.id)}
                            className="flex items-center text-sm text-white/70 hover:text-blue-300 transition-colors duration-200"
                          >
                            {expandedBlog === blog.id ? (
                              <>
                                <Minus className="w-4 h-4 mr-1" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-1" />
                                Preview
                              </>
                            )}
                          </button>
                          
                          <button
                          disabled
                            onClick={() => handleReadMore(blog.id)}
                            className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium backdrop-blur-sm border border-white/30"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {blog.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/15 text-white/80 rounded-md text-xs hover:bg-white/25 transition-colors duration-200 cursor-pointer backdrop-blur-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredBlogs.length > 0 && (
          <div className="text-center pt-8 text-white/60 text-sm">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </div>
        )}

        {/* CSS Styles pour l'effet glassmorphism */}
        <style jsx>{`
          .blog-card {
            position: relative;
            margin: 2rem;
            pointer-events: auto;
          }

          .blog-card::before {
            --offset: 20px;
            backdrop-filter: blur(40px) saturate(1.4);
            background-color: #6666664e;
            border-radius: 30px;
            box-shadow: 0 0 20px #5e5e5e38;
            content: "";
            height: calc(100% + var(--offset)*2);
            left: calc(var(--offset)*-1);
            outline: 1px solid #ffffff2b;
            position: absolute;
            top: calc(var(--offset)*-1);
            width: calc(100% + var(--offset)*2);
            z-index: -1;
          }

          .blog-card.featured::before {
            outline: 2px solid #3b82f680;
            box-shadow: 0 0 30px #3b82f630;
          }

          .blog-content {
            position: relative;
            z-index: 1;
            padding: 10px;
          }

          .blog-card:hover::before {
            backdrop-filter: blur(50px) saturate(1.6);
            background-color: #77777750;
          }
        `}</style>
      </Block>
    </>
  );
}