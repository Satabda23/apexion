// src/admin/pages/ContentManagement.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ContentEditor from '../components/ContentEditor';
import { Image, Video, FileText, Edit, Save } from 'lucide-react';

const ContentManagement = () => {
  const [activeEditor, setActiveEditor] = useState(null);
  const [websiteContent, setWebsiteContent] = useState({
    bannerText: 'Entrust Your Smile to Apexion\'s Experts',
    bannerSubtext: 'Your Smile, Our Priority Expert care with advanced technology — book your consultation today with Apexion Dental Clinic🦷✨',
    aboutDescription: 'With a team of highly qualified dental professionals and cutting-edge technology, we are dedicated to providing personalized, precise, and compassionate care—ensuring every patient receives the highest standard of treatment for lasting oral health and confidence.',
    contactPhone: '+91-8296229544',
    contactAddress: 'New Airport Road, Dharapur, Guwahati, Assam',
    servicesDescription: 'Clinical excellence for your complete oral wellness',
    doctorName: 'Dr. DEEPIKA MEDHI',
    doctorTitle: 'Dental Surgeon'
  });

  const [currentImages, setCurrentImages] = useState([
    { id: 1, category: 'Banner', name: 'banner-hero.jpg', url: '/assets/banner/1.png', size: '2.3 MB' },
    { id: 2, category: 'Services', name: 'services-bg.jpg', url: '/assets/service/1.png', size: '1.8 MB' },
    { id: 3, category: 'Team', name: 'team-photo.jpg', url: '/assets/about/team/1.png', size: '2.1 MB' },
    { id: 4, category: 'Gallery', name: 'clinic-interior.jpg', url: '/assets/clinic-1.jpg', size: '3.2 MB' }
  ]);

  const [currentVideos, setCurrentVideos] = useState([
    { id: 1, name: 'clinic-tour.mp4', size: '15.2 MB', duration: '2:30' },
    { id: 2, name: 'dental-procedures.mp4', size: '28.4 MB', duration: '5:45' }
  ]);

  const handleContentSave = async (formData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const contentType = formData.get('contentType');
      toast.success(`${contentType === 'image' ? 'Images' : contentType === 'video' ? 'Video' : 'Content'} updated successfully`);
      setActiveEditor(null);
    } catch (error) {
      toast.error('Failed to save content');
    }
  };

  const handleTextContentChange = (key, value) => {
    setWebsiteContent({ ...websiteContent, [key]: value });
  };

  const handleSaveAllText = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('All text content updated successfully');
    } catch (error) {
      toast.error('Failed to save text content');
    }
  };

  const handleRemoveImage = (imageId) => {
    if (window.confirm('Are you sure you want to remove this image?')) {
      setCurrentImages(currentImages.filter(img => img.id !== imageId));
      toast.success('Image removed successfully');
    }
  };

  const handleRemoveVideo = (videoId) => {
    if (window.confirm('Are you sure you want to remove this video?')) {
      setCurrentVideos(currentVideos.filter(vid => vid.id !== videoId));
      toast.success('Video removed successfully');
    }
  };

  return (
    <div className="content-management">
      <div className="page-header">
        <h1 className="page-title">Content Management</h1>
        <p className="page-description">Update website content, images, and videos</p>
      </div>

      {activeEditor ? (
        <ContentEditor
          contentType={activeEditor}
          onSave={handleContentSave}
          onCancel={() => setActiveEditor(null)}
        />
      ) : (
        <>
          {/* Quick Actions */}
          <div className="quick-actions">
            <button
              onClick={() => setActiveEditor('image')}
              className="action-card"
            >
              <Image className="action-icon image-icon" />
              <h3 className="action-title">Manage Images</h3>
              <p className="action-description">Upload and organize website images</p>
            </button>
            <button
              onClick={() => setActiveEditor('video')}
              className="action-card"
            >
              <Video className="action-icon video-icon" />
              <h3 className="action-title">Manage Videos</h3>
              <p className="action-description">Upload promotional videos</p>
            </button>
            <button
              onClick={() => setActiveEditor('text')}
              className="action-card"
            >
              <FileText className="action-icon text-icon" />
              <h3 className="action-title">Edit Text Content</h3>
              <p className="action-description">Update website text and descriptions</p>
            </button>
          </div>

          {/* Current Images */}
          <div className="content-section">
            <div className="section-header">
              <h3 className="section-title">Current Images</h3>
              <button
                onClick={() => setActiveEditor('image')}
                className="add-new-btn image-btn"
              >
                Add New
              </button>
            </div>
            <div className="images-grid">
              {currentImages.map(image => (
                <div key={image.id} className="image-item">
                  <div className="image-preview">
                    <Image className="preview-icon" />
                  </div>
                  <p className="image-name">{image.name}</p>
                  <p className="image-meta">{image.category} • {image.size}</p>
                  <div className="image-actions">
                    <button 
                      onClick={() => toast.info(`Editing ${image.name}`)}
                      className="edit-btn"
                    >
                      <Edit className="edit-icon" />
                    </button>
                    <button 
                      onClick={() => handleRemoveImage(image.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Videos */}
          <div className="content-section">
            <div className="section-header">
              <h3 className="section-title">Current Videos</h3>
              <button
                onClick={() => setActiveEditor('video')}
                className="add-new-btn video-btn"
              >
                Add New
              </button>
            </div>
            <div className="videos-grid">
              {currentVideos.map(video => (
                <div key={video.id} className="video-item">
                  <div className="video-preview">
                    <Video className="preview-icon" />
                  </div>
                  <p className="video-name">{video.name}</p>
                  <p className="video-meta">{video.duration} • {video.size}</p>
                  <div className="video-actions">
                    <button 
                      onClick={() => toast.info(`Playing ${video.name}`)}
                      className="preview-btn"
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => handleRemoveVideo(video.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="text-content-section">
            <div className="text-section-header">
              <h3 className="section-title">Website Text Content</h3>
              <button
                onClick={handleSaveAllText}
                className="save-all-btn"
              >
                <Save className="save-icon" />
                <span>Save All Changes</span>
              </button>
            </div>
            <div className="text-form">
              <div className="form-group">
                <label className="form-label">Homepage Banner Text</label>
                <textarea 
                  className="form-textarea small"
                  value={websiteContent.bannerText}
                  onChange={(e) => handleTextContentChange('bannerText', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Banner Subtitle</label>
                <textarea 
                  className="form-textarea small"
                  value={websiteContent.bannerSubtext}
                  onChange={(e) => handleTextContentChange('bannerSubtext', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">About Us Description</label>
                <textarea 
                  className="form-textarea medium"
                  value={websiteContent.aboutDescription}
                  onChange={(e) => handleTextContentChange('aboutDescription', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Services Description</label>
                <textarea 
                  className="form-textarea medium"
                  value={websiteContent.servicesDescription}
                  onChange={(e) => handleTextContentChange('servicesDescription', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={websiteContent.contactPhone}
                  onChange={(e) => handleTextContentChange('contactPhone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Address</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={websiteContent.contactAddress}
                  onChange={(e) => handleTextContentChange('contactAddress', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Doctor Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={websiteContent.doctorName}
                  onChange={(e) => handleTextContentChange('doctorName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Doctor Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={websiteContent.doctorTitle}
                  onChange={(e) => handleTextContentChange('doctorTitle', e.target.value)}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentManagement;