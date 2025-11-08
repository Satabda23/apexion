// src/admin/components/ContentEditor.jsx
import React, { useState } from 'react';
import { Image, Video, FileText, Save, X } from 'lucide-react';

const ContentEditor = ({ contentType, initialContent, onSave, onCancel }) => {
  const [content, setContent] = useState(initialContent || '');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('contentType', contentType);
      
      selectedFiles.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      await onSave(formData);
      setContent('');
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTextEditor = () => (
    <div className="editor-form">
      <div className="form-group">
        <label className="form-label">Content Text</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea small"
          placeholder="Enter your content here..."
        />
      </div>
    </div>
  );

  const renderImageEditor = () => (
    <div className="editor-form">
      <div className="form-group">
        <label className="form-label">Upload Images</label>
        <div className="upload-zone">
          <Image className="upload-icon" />
          <p className="upload-text">Click to upload or drag and drop</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="upload-input"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="upload-button image-upload"
          >
            Choose Images
          </label>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="file-list">
          <h4 className="file-list-title">Selected Files:</h4>
          <div className="file-items">
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="remove-file-btn"
                >
                  <X className="remove-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Alt Text / Description</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea medium"
          placeholder="Enter description for accessibility..."
        />
      </div>
    </div>
  );

  const renderVideoEditor = () => (
    <div className="editor-form">
      <div className="form-group">
        <label className="form-label">Upload Video</label>
        <div className="upload-zone">
          <Video className="upload-icon" />
          <p className="upload-text">Upload promotional videos</p>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="upload-input"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="upload-button video-upload"
          >
            Choose Video
          </label>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="file-list">
          <h4 className="file-list-title">Selected Video:</h4>
          <div className="single-file">
            <span className="file-name">{selectedFiles[0].name}</span>
          </div>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Video Title / Description</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea medium"
          placeholder="Enter video title and description..."
        />
      </div>
    </div>
  );

  const renderEditor = () => {
    switch (contentType) {
      case 'image':
        return renderImageEditor();
      case 'video':
        return renderVideoEditor();
      default:
        return renderTextEditor();
    }
  };

  return (
    <div className="content-editor">
      <div className="editor-header">
        <h3 className="editor-title">
          {contentType === 'image' && <Image className="title-icon" />}
          {contentType === 'video' && <Video className="title-icon" />}
          {contentType === 'text' && <FileText className="title-icon" />}
          {contentType === 'image' ? 'Image' : contentType === 'video' ? 'Video' : 'Text'} Editor
        </h3>
        <button
          onClick={onCancel}
          className="close-btn"
        >
          <X className="close-icon" />
        </button>
      </div>

      <div className="editor-content">
        {renderEditor()}
      </div>

      <div className="editor-actions">
        <button
          onClick={onCancel}
          className="action-btn cancel-btn"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading || (!content && selectedFiles.length === 0)}
          className="action-btn save-btn"
        >
          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <Save className="save-icon" />
          )}
          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;