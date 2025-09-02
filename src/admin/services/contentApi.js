// src/admin/services/contentApi.js
import adminApi from "./adminApi";

class ContentApiService {
  // Get all website content
  async getWebsiteContent() {
    return adminApi.request("/admin/content");
  }

  // Get specific content section
  async getContentSection(section) {
    return adminApi.request(`/admin/content/${section}`);
  }

  // Update text content
  async updateTextContent(contentData) {
    return adminApi.request("/admin/content/text", {
      method: "PUT",
      body: JSON.stringify(contentData),
    });
  }

  // Update specific text section
  async updateTextSection(section, content) {
    return adminApi.request(`/admin/content/text/${section}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    });
  }

  // Upload images
  async uploadImages(files, category = "general") {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    } else {
      formData.append("image", files);
    }

    formData.append("category", category);

    return adminApi.request("/admin/content/images", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
  }

  // Get all images
  async getImages(category = null) {
    const params = category ? `?category=${category}` : "";
    return adminApi.request(`/admin/content/images${params}`);
  }

  // Update image metadata
  async updateImageMetadata(imageId, metadata) {
    return adminApi.request(`/admin/content/images/${imageId}`, {
      method: "PUT",
      body: JSON.stringify(metadata),
    });
  }

  // Delete image
  async deleteImage(imageId) {
    return adminApi.request(`/admin/content/images/${imageId}`, {
      method: "DELETE",
    });
  }

  // Upload videos
  async uploadVideos(files) {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`videos[${index}]`, file);
      });
    } else {
      formData.append("video", files);
    }

    return adminApi.request("/admin/content/videos", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
  }

  // Get all videos
  async getVideos() {
    return adminApi.request("/admin/content/videos");
  }

  // Update video metadata
  async updateVideoMetadata(videoId, metadata) {
    return adminApi.request(`/admin/content/videos/${videoId}`, {
      method: "PUT",
      body: JSON.stringify(metadata),
    });
  }

  // Delete video
  async deleteVideo(videoId) {
    return adminApi.request(`/admin/content/videos/${videoId}`, {
      method: "DELETE",
    });
  }

  // Get gallery images
  async getGalleryImages() {
    return this.getImages("gallery");
  }

  // Update gallery
  async updateGallery(images) {
    return adminApi.request("/admin/content/gallery", {
      method: "PUT",
      body: JSON.stringify({ images }),
    });
  }

  // Get service content
  async getServicesContent() {
    return adminApi.request("/admin/content/services");
  }

  // Update service content
  async updateServicesContent(servicesData) {
    return adminApi.request("/admin/content/services", {
      method: "PUT",
      body: JSON.stringify(servicesData),
    });
  }

  // Add new service
  async addService(serviceData) {
    const errors = this.validateServiceData(serviceData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.request("/admin/content/services", {
      method: "POST",
      body: JSON.stringify(serviceData),
    });
  }

  // Update service
  async updateService(serviceId, serviceData) {
    const errors = this.validateServiceData(serviceData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.request(`/admin/content/services/${serviceId}`, {
      method: "PUT",
      body: JSON.stringify(serviceData),
    });
  }

  // Delete service
  async deleteService(serviceId) {
    return adminApi.request(`/admin/content/services/${serviceId}`, {
      method: "DELETE",
    });
  }

  // Get team content
  async getTeamContent() {
    return adminApi.request("/admin/content/team");
  }

  // Update team content
  async updateTeamContent(teamData) {
    return adminApi.request("/admin/content/team", {
      method: "PUT",
      body: JSON.stringify(teamData),
    });
  }

  // Add team member
  async addTeamMember(memberData) {
    return adminApi.request("/admin/content/team/members", {
      method: "POST",
      body: JSON.stringify(memberData),
    });
  }

  // Update team member
  async updateTeamMember(memberId, memberData) {
    return adminApi.request(`/admin/content/team/members/${memberId}`, {
      method: "PUT",
      body: JSON.stringify(memberData),
    });
  }

  // Delete team member
  async deleteTeamMember(memberId) {
    return adminApi.request(`/admin/content/team/members/${memberId}`, {
      method: "DELETE",
    });
  }

  // Get FAQ content
  async getFAQContent() {
    return adminApi.request("/admin/content/faq");
  }

  // Update FAQ content
  async updateFAQContent(faqData) {
    return adminApi.request("/admin/content/faq", {
      method: "PUT",
      body: JSON.stringify(faqData),
    });
  }

  // Add FAQ item
  async addFAQItem(faqItem) {
    return adminApi.request("/admin/content/faq/items", {
      method: "POST",
      body: JSON.stringify(faqItem),
    });
  }

  // Update FAQ item
  async updateFAQItem(itemId, faqItem) {
    return adminApi.request(`/admin/content/faq/items/${itemId}`, {
      method: "PUT",
      body: JSON.stringify(faqItem),
    });
  }

  // Delete FAQ item
  async deleteFAQItem(itemId) {
    return adminApi.request(`/admin/content/faq/items/${itemId}`, {
      method: "DELETE",
    });
  }

  // Get SEO settings
  async getSEOSettings() {
    return adminApi.request("/admin/content/seo");
  }

  // Update SEO settings
  async updateSEOSettings(seoData) {
    return adminApi.request("/admin/content/seo", {
      method: "PUT",
      body: JSON.stringify(seoData),
    });
  }

  // Backup website content
  async backupContent() {
    return adminApi.request("/admin/content/backup", {
      method: "POST",
    });
  }

  // Restore content from backup
  async restoreContent(backupId) {
    return adminApi.request("/admin/content/restore", {
      method: "POST",
      body: JSON.stringify({ backupId }),
    });
  }

  // Get content analytics
  async getContentAnalytics(period = "month") {
    return adminApi.request(`/admin/content/analytics?period=${period}`);
  }

  // Validate service data
  validateServiceData(data) {
    const errors = [];

    if (!data.title || data.title.trim().length < 3) {
      errors.push("Service title must be at least 3 characters long");
    }

    if (!data.description || data.description.trim().length < 10) {
      errors.push("Service description must be at least 10 characters long");
    }

    if (data.price && (isNaN(data.price) || data.price < 0)) {
      errors.push("Price must be a valid positive number");
    }

    if (data.duration && (isNaN(data.duration) || data.duration < 1)) {
      errors.push("Duration must be a valid positive number");
    }

    return errors;
  }

  // Validate file upload
  validateFileUpload(file, type = "image") {
    const errors = [];

    if (!file) {
      errors.push("File is required");
      return errors;
    }

    // Size limits
    const maxSizes = {
      image: 5 * 1024 * 1024, // 5MB
      video: 50 * 1024 * 1024, // 50MB
    };

    if (file.size > maxSizes[type]) {
      errors.push(
        `File size must be less than ${maxSizes[type] / (1024 * 1024)}MB`
      );
    }

    // File type validation
    const allowedTypes = {
      image: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ],
      video: ["video/mp4", "video/avi", "video/mov", "video/wmv"],
    };

    if (!allowedTypes[type].includes(file.type)) {
      errors.push(
        `Invalid file type. Allowed types: ${allowedTypes[type].join(", ")}`
      );
    }

    return errors;
  }

  // Generate image URL
  getImageUrl(imagePath) {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `${adminApi.baseURL}/uploads/images/${imagePath}`;
  }

  // Generate video URL
  getVideoUrl(videoPath) {
    if (!videoPath) return null;
    if (videoPath.startsWith("http")) return videoPath;
    return `${adminApi.baseURL}/uploads/videos/${videoPath}`;
  }
}

const contentApi = new ContentApiService();
export default contentApi;
