// src/admin/hooks/usePatients.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import adminApi from "../services/adminApi";

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch patients from API
  const fetchPatients = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await adminApi.getPatients(filters);
      setPatients(data.patients || []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  // Get single patient
  const getPatient = async (patientId) => {
    try {
      const patient = await adminApi.getPatient(patientId);
      return { success: true, patient };
    } catch (error) {
      toast.error("Failed to load patient details");
      return { success: false, error: error.message };
    }
  };

  // Create new patient
  const createPatient = async (patientData) => {
    try {
      const newPatient = await adminApi.createPatient(patientData);
      setPatients([newPatient, ...patients]);
      toast.success("Patient created successfully");
      return { success: true, patient: newPatient };
    } catch (error) {
      toast.error("Failed to create patient");
      return { success: false, error: error.message };
    }
  };

  // Update patient
  const updatePatient = async (patientId, patientData) => {
    try {
      const updatedPatient = await adminApi.updatePatient(
        patientId,
        patientData
      );
      setPatients(
        patients.map((patient) =>
          patient.id === patientId ? updatedPatient : patient
        )
      );
      toast.success("Patient updated successfully");
      return { success: true, patient: updatedPatient };
    } catch (error) {
      toast.error("Failed to update patient");
      return { success: false, error: error.message };
    }
  };

  // Delete patient
  const deletePatient = async (patientId) => {
    try {
      await adminApi.deletePatient(patientId);
      setPatients(patients.filter((patient) => patient.id !== patientId));
      toast.success("Patient deleted successfully");
      return { success: true };
    } catch (error) {
      toast.error("Failed to delete patient");
      return { success: false, error: error.message };
    }
  };

  // Get patient medical history
  const getPatientHistory = async (patientId) => {
    try {
      const history = await adminApi.getPatientHistory(patientId);
      return { success: true, history };
    } catch (error) {
      toast.error("Failed to load patient history");
      return { success: false, error: error.message };
    }
  };

  // Search patients
  const searchPatients = (searchTerm) => {
    if (!searchTerm.trim()) return patients;

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get patient statistics
  const getPatientStats = () => {
    const totalPatients = patients.length;
    const malePatients = patients.filter((p) => p.gender === "Male").length;
    const femalePatients = patients.filter((p) => p.gender === "Female").length;
    const patientsWithAllergies = patients.filter(
      (p) => p.allergies && p.allergies.length > 0
    ).length;
    const upcomingAppointments = patients.filter(
      (p) => p.nextAppointment
    ).length;

    return {
      total: totalPatients,
      male: malePatients,
      female: femalePatients,
      withAllergies: patientsWithAllergies,
      upcoming: upcomingAppointments,
    };
  };

  // Load patients on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientHistory,
    searchPatients,
    getPatientStats,
  };
};
