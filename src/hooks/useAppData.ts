import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export const useAppData = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [features, setFeatures] = useState([]);
  const [softwareListings, setSoftwareListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [testimonialsData, featuresData, listingsData] = await Promise.all([
          api.getTestimonials(),
          api.getFeatures(),
          api.getSoftwareListings()
        ]);

        setTestimonials(testimonialsData);
        setFeatures(featuresData);
        setSoftwareListings(listingsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const searchSoftware = async (query: string) => {
    try {
      setLoading(true);
      const results = await api.searchSoftware(query);
      setSoftwareListings(results);
      setError(null);
    } catch (err) {
      setError('Failed to search software. Please try again.');
      console.error('Error searching software:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category: string) => {
    try {
      setLoading(true);
      const results = await api.getSoftwareByCategory(category);
      setSoftwareListings(results);
      setError(null);
    } catch (err) {
      setError('Failed to filter software. Please try again.');
      console.error('Error filtering software:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitContactForm = async (data: { name: string; email: string; message: string }) => {
    try {
      const response = await api.submitContactForm(data);
      return response;
    } catch (err) {
      console.error('Error submitting contact form:', err);
      throw new Error('Failed to submit contact form. Please try again.');
    }
  };

  const subscribeNewsletter = async (email: string) => {
    try {
      const response = await api.subscribeNewsletter(email);
      return response;
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      throw new Error('Failed to subscribe to newsletter. Please try again.');
    }
  };

  return {
    testimonials,
    features,
    softwareListings,
    loading,
    error,
    searchSoftware,
    filterByCategory,
    submitContactForm,
    subscribeNewsletter
  };
}; 