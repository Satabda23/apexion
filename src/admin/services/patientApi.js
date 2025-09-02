// src/admin/services/patientApi.js
import adminApi from "./adminApi";

class PatientApiService {
  // Get all patients with advanced filtering
  async getPatients(filters = {}) {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.gender) params.append("gender", filters.gender);
    if (filters.ageRange) {
      params.append("minAge", filters.ageRange.min);
      params.append("maxAge", filters.ageRange.max);
    }
    if (filters.hasAllergies !== undefined)
      params.append("hasAllergies", filters.hasAllergies);
    if (filters.lastVisitRange) {
      params.append("lastVisitFrom", filters.lastVisitRange.from);
      params.append("lastVisitTo", filters.lastVisitRange.to);
    }
    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    return adminApi.request(`/admin/patients?${params}`);
  }

  // Get patient by ID with full details
  async getPatientDetails(patientId) {
    return adminApi.request(`/admin/patients/${patientId}/details`);
  }

  // Create patient with validation
  async createPatient(patientData) {
    const errors = this.validatePatientData(patientData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.createPatient(patientData);
  }

  // Update patient
  async updatePatient(patientId, patientData) {
    const errors = this.validatePatientData(patientData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.updatePatient(patientId, patientData);
  }

  // Get patient medical history
  async getPatientHistory(patientId) {
    return adminApi.request(`/admin/patients/${patientId}/history`);
  }

  // Add medical history entry
  async addMedicalHistory(patientId, historyData) {
    return adminApi.request(`/admin/patients/${patientId}/history`, {
      method: "POST",
      body: JSON.stringify(historyData),
    });
  }

  // Update medical history entry
  async updateMedicalHistory(patientId, historyId, historyData) {
    return adminApi.request(
      `/admin/patients/${patientId}/history/${historyId}`,
      {
        method: "PUT",
        body: JSON.stringify(historyData),
      }
    );
  }

  // Get patient treatments
  async getPatientTreatments(patientId) {
    return adminApi.request(`/admin/patients/${patientId}/treatments`);
  }

  // Add treatment record
  async addTreatment(patientId, treatmentData) {
    return adminApi.request(`/admin/patients/${patientId}/treatments`, {
      method: "POST",
      body: JSON.stringify(treatmentData),
    });
  }

  // Get patient appointments
  async getPatientAppointments(patientId, filters = {}) {
    const params = new URLSearchParams(filters);
    return adminApi.request(
      `/admin/patients/${patientId}/appointments?${params}`
    );
  }

  // Search patients by various criteria
  async searchPatients(searchTerm, searchType = "all") {
    const params = new URLSearchParams({
      search: searchTerm,
      type: searchType,
    });
    return adminApi.request(`/admin/patients/search?${params}`);
  }

  // Get patients with upcoming appointments
  async getPatientsWithUpcomingAppointments() {
    return adminApi.request("/admin/patients/upcoming-appointments");
  }

  // Get patients with overdue checkups
  async getPatientsWithOverdueCheckups(months = 6) {
    return adminApi.request(
      `/admin/patients/overdue-checkups?months=${months}`
    );
  }

  // Get patient statistics
  async getPatientStatistics() {
    return adminApi.request("/admin/patients/statistics");
  }

  // Export patients data
  async exportPatients(filters = {}, format = "csv") {
    const params = new URLSearchParams({ ...filters, format });
    return adminApi.request(`/admin/patients/export?${params}`);
  }

  // Merge duplicate patients
  async mergePatients(primaryPatientId, duplicatePatientId) {
    return adminApi.request("/admin/patients/merge", {
      method: "POST",
      body: JSON.stringify({
        primaryPatientId,
        duplicatePatientId,
      }),
    });
  }

  // Archive patient (soft delete)
  async archivePatient(patientId, reason = "") {
    return adminApi.request(`/admin/patients/${patientId}/archive`, {
      method: "PUT",
      body: JSON.stringify({ reason }),
    });
  }

  // Restore archived patient
  async restorePatient(patientId) {
    return adminApi.request(`/admin/patients/${patientId}/restore`, {
      method: "PUT",
    });
  }

  // Get patient consent records
  async getPatientConsents(patientId) {
    return adminApi.request(`/admin/patients/${patientId}/consents`);
  }

  // Add consent record
  async addConsent(patientId, consentData) {
    return adminApi.request(`/admin/patients/${patientId}/consents`, {
      method: "POST",
      body: JSON.stringify(consentData),
    });
  }

  // Get patient insurance information
  async getPatientInsurance(patientId) {
    return adminApi.request(`/admin/patients/${patientId}/insurance`);
  }

  // Update patient insurance
  async updatePatientInsurance(patientId, insuranceData) {
    return adminApi.request(`/admin/patients/${patientId}/insurance`, {
      method: "PUT",
      body: JSON.stringify(insuranceData),
    });
  }

  // Validate patient data
  validatePatientData(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    if (!data.phone || !/^[0-9]{10}$/.test(data.phone)) {
      errors.push("Phone number must be exactly 10 digits");
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("Invalid email format");
    }

    if (data.age && (data.age < 0 || data.age > 150)) {
      errors.push("Age must be between 0 and 150");
    }

    if (data.gender && !["Male", "Female", "Other"].includes(data.gender)) {
      errors.push("Gender must be Male, Female, or Other");
    }

    return errors;
  }

  // Format patient data for display
  formatPatient(patient) {
    return {
      ...patient,
      fullName: patient.name,
      displayPhone: this.formatPhoneNumber(patient.phone),
      ageGroup: this.getAgeGroup(patient.age),
      hasActiveAppointment: !!patient.nextAppointment,
      daysSinceLastVisit: patient.lastVisit
        ? this.daysSince(patient.lastVisit)
        : null,
      riskLevel: this.calculateRiskLevel(patient),
    };
  }

  // Helper methods
  formatPhoneNumber(phone) {
    if (!phone || phone.length !== 10) return phone;
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  }

  getAgeGroup(age) {
    if (!age) return "Unknown";
    if (age < 18) return "Minor";
    if (age < 30) return "Young Adult";
    if (age < 50) return "Adult";
    if (age < 65) return "Middle Age";
    return "Senior";
  }

  daysSince(date) {
    const lastVisit = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - lastVisit);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateRiskLevel(patient) {
    let riskScore = 0;

    // Check medical history
    if (patient.medicalHistory && patient.medicalHistory.includes("Diabetes"))
      riskScore += 2;
    if (
      patient.medicalHistory &&
      patient.medicalHistory.includes("Heart Disease")
    )
      riskScore += 2;
    if (
      patient.medicalHistory &&
      patient.medicalHistory.includes("Hypertension")
    )
      riskScore += 1;

    // Check age
    if (patient.age > 65) riskScore += 2;
    if (patient.age > 80) riskScore += 1;

    // Check allergies
    if (patient.allergies && patient.allergies.length > 0) riskScore += 1;

    // Check last visit
    if (patient.lastVisit) {
      const daysSince = this.daysSince(patient.lastVisit);
      if (daysSince > 365) riskScore += 2;
      if (daysSince > 180) riskScore += 1;
    }

    if (riskScore >= 5) return "High";
    if (riskScore >= 3) return "Medium";
    return "Low";
  }
}

const patientApi = new PatientApiService();
export default patientApi;
