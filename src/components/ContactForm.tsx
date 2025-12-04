import { useState, useRef } from 'react';
import type { ContactForm as ContactFormType } from '../types';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Send email first
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Elroy',
      };

      const emailResult = await emailjs.send(
        'service_x555gtm',
        'template_56322lo',
        templateParams,
        'U4MneRY62YpB4npQP'
      );

      if (emailResult.text === 'OK') {
        // Only store in Firebase if email was sent successfully
        try {
          const messageData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: serverTimestamp(),
            status: 'unread',
            createdAt: new Date().toISOString(), // Add a client-side timestamp
          };

          await addDoc(collection(db, 'messages'), messageData);

          setSubmitStatus({
            type: 'success',
            message: 'Message sent successfully! I will get back to you soon.',
          });
          setFormData({ name: '', email: '', message: '' });
        } catch (firebaseError: unknown) {
          console.error('Failed to store message:', firebaseError);
          // Still show success since email was sent
          setSubmitStatus({
            type: 'success',
            message: 'Message sent successfully! I will get back to you soon.',
          });
          setFormData({ name: '', email: '', message: '' });
        }
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error: unknown) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
      {submitStatus.type && (
        <div
          className={`p-4 rounded-xl ${
            submitStatus.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
          }`}
        >
          {submitStatus.message}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          name="from_name"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-shadow"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="from_email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-shadow"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-shadow resize-none"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-medium transition-all duration-200 ${
          isSubmitting
            ? 'opacity-70 cursor-not-allowed'
            : 'hover:scale-105'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
