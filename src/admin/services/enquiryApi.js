// src/admin/services/enquiryApi.js
import adminApi from "./adminApi";

class EnquiryApiService {
  async getAllEnquiries() {
    // wrapper should return parsed response e.g. { success, enquiries, total, latest }
    return adminApi.request("/admin/enquiries");
  }

  async getEnquiryCount() {
    const data = await this.getAllEnquiries();
    return data?.total || 0;
  }

  async getLatestEnquiry() {
    const data = await this.getAllEnquiries();
    return data?.latest || null;
  }

  // NOTE: adapt request payload key to your adminApi wrapper.
  async updateStatus(id, status) {
    // Try using adminApi.request with JSON body first:
    return adminApi.request("/admin/enquiries/update-status", {
      method: "POST",
      // many wrappers accept `data` or `body`. Try both if your wrapper differs.
      data: { id, status }, // axios-like wrappers
      body: { id, status }, // fetch-like wrappers
    });
  }

  formatEnquiry(enquiry) {
    return {
      id: enquiry.id,
      name: enquiry.name,
      email: enquiry.email,
      service: enquiry.service,
      otherService: enquiry.other_service,
      message: enquiry.message,
      status: enquiry.status || "new",
      // Prefer formatted_date from backend, else fallback to created_at JS formatting
      formattedDate:
        enquiry.formatted_date ||
        new Date(enquiry.created_at).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
    };
  }
}

const enquiryApi = new EnquiryApiService();
export default enquiryApi;
