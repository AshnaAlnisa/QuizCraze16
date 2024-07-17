// src/components/Admin/ContentManagement.js

import React, { useState } from 'react';
import '../../styles/contentManagement.css';

const ContentManagement = () => {
  const [content, setContent] = useState({
    pages: [],
    announcements: [],
    news: [],
  });

  const [newPage, setNewPage] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newNews, setNewNews] = useState('');

  const handleAddPage = () => {
    setContent({
      ...content,
      pages: [...content.pages, newPage],
    });
    setNewPage('');
  };

  const handleAddAnnouncement = () => {
    setContent({
      ...content,
      announcements: [...content.announcements, newAnnouncement],
    });
    setNewAnnouncement('');
  };

  const handleAddNews = () => {
    setContent({
      ...content,
      news: [...content.news, newNews],
    });
    setNewNews('');
  };

  const handleDelete = (type, index) => {
    setContent({
      ...content,
      [type]: content[type].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="content-management-container">
      <h2>Content Management</h2>

      <section>
        <h3>Manage Pages</h3>
        <input
          type="text"
          value={newPage}
          onChange={(e) => setNewPage(e.target.value)}
          placeholder="New Page Title"
        />
        <button onClick={handleAddPage}>Add Page</button>
        <ul>
          {content.pages.map((page, index) => (
            <li key={index}>
              {page} <button onClick={() => handleDelete('pages', index)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Manage Announcements</h3>
        <input
          type="text"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          placeholder="New Announcement"
        />
        <button onClick={handleAddAnnouncement}>Add Announcement</button>
        <ul>
          {content.announcements.map((announcement, index) => (
            <li key={index}>
              {announcement} <button onClick={() => handleDelete('announcements', index)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Manage News</h3>
        <input
          type="text"
          value={newNews}
          onChange={(e) => setNewNews(e.target.value)}
          placeholder="New News Item"
        />
        <button onClick={handleAddNews}>Add News</button>
        <ul>
          {content.news.map((newsItem, index) => (
            <li key={index}>
              {newsItem} <button onClick={() => handleDelete('news', index)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ContentManagement;
